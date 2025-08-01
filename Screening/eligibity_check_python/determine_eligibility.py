from helper_extractors import extract_diagnosis_variables, extract_medication_variables
from diagnosis_medication_rules import diagnosis_eligibility, medication_eligibility


def determine_eligibility(row, config):
    reasons = []
    eligible = 0
    eligible_later = 0
    eligible_fu = 0
    ineligible = 0
    get = row.get
    suffix = config["suffixes"]

    # # PLACEHOLDER TO DEBUG SPECIFIC PARTICIPANTS
    # if get("Castor Participant ID") in ["SANDBOX.0000027"]:
    #     print("hold here")

    # BMI (not required for POST-COVID)
    bmi_col = suffix.get("bmi")
    if bmi_col and get(bmi_col, 0) >= 40:
        ineligible = 1
        reasons.append("BMI above 40")
    else:
        eligible = 1

    # Calccageaid (not required for Lyme)
    if "calccageaid" in suffix and get(suffix["calccageaid"], 0) == 1:
        ineligible = 1
        reasons.append("Alcohol-/drugscreen positief (CAGE-AID)")

    # Pregnancy/Breastfeeding
    if get(suffix["preg"], 0) == 1:
        eligible_later = 1
        reasons.append("Pregnant or breastfeeding")

    # Current COVID
    if get(suffix["covid"], 0) == 1:
        eligible_later = 1
        reasons.append("Active COVID-19 infection")

    # PHQ Score (for ME/CFS)
    if "phq_score" in suffix:
        score = get(suffix["phq_score"], 0)
        if score > 4:
            ineligible = 1
            reasons.append(f"PHQ score > 4 ({score})")

    # retrieve column values based on prefixes for diagnosis and medication fields
    diag_vars = extract_diagnosis_variables(row, config["prefix_diag"], suffix)
    meds_vars = extract_medication_variables(row, config["prefix_meds"], suffix)

    # determine eligibility based on diagnosis and medication
    eligible, ineligible, eligible_fu, diag_reasons = diagnosis_eligibility(
        eligible, ineligible, eligible_fu, **diag_vars
    )
    eligible, ineligible, eligible_fu, eligible_later, meds_reasons = medication_eligibility(
        eligible, ineligible, eligible_fu, eligible_later, **meds_vars
    )

    # Status codes:
    # 1 = eligible,
    # 2 = later,
    # 3 = ineligible or needs followup,
    # 999 = unknown
    def format_reasons(*reason_lists):
        return ["; ".join(r) if r else None for r in reason_lists]

    status = 999
    reason_summary, diag_summary, meds_summary = format_reasons(reasons, diag_reasons, meds_reasons)

    if eligible == 1:
        status = 1, reason_summary, diag_summary, meds_summary
    if eligible_later == 1:
        status = 2, reason_summary, diag_summary, meds_summary
    if eligible_fu == 1 or ineligible == 1:
        status = 3, reason_summary, diag_summary, meds_summary

    return status
