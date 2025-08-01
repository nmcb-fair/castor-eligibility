import numpy as np


def diagnosis_eligibility(eligible, ineligible, eligible_fu, **kwargs):
    reasons = []

    if kwargs.get("diagnosis_graves", 0) == 1:
        ineligible = 1
        reasons.append("Actieve ziekte van Graves")
    if kwargs.get("diagnosis_cancer", 0) == 1:
        eligible_fu = 1
        reasons.append("Kanker of kankerbehandeling afgelopen 5 jaar")
    if kwargs.get("diagnosis_diabetes", 0) == 1:
        ineligible = 1
        reasons.append("Diabetes mellitus")
    if kwargs.get("diagnosis_kidney", 0) == 1:
        if kwargs.get("kidney", 0) == 1:  # less than 50% functional
            ineligible = 1
            reasons.append("Less than 50% functional kidneys")
        elif kwargs.get("kidney", 0) == 2:  # unsure about functionality
            eligible_fu = 1
            reasons.append("Unsure about kidneys functionality")
    if kwargs.get("diagnosis_other_cardio", 0) == 1:
        ineligible = 1
        reasons.append("Andere hart- en vaatziekten")
    if kwargs.get("diagnosis_stroke", 0) == 1:
        eligible_fu = 1
        reasons.append("Beroerte, bloeding in de hersenen")
    if kwargs.get("diagnosis_other_resp", 0) == 1:
        ineligible = 1
        reasons.append("Andere longziekten")
    if kwargs.get("diagnosis_neuro", 0) == 1:
        ineligible = 1
        reasons.append("Neurologische aandoening")
    if kwargs.get("diagnosis_psycho", 0) == 1:
        ineligible = 1
        reasons.append("Ernstige psychische aandoening")
    if kwargs.get("diagnosis_chr_infl", 0) == 1:
        eligible_fu = 1
        reasons.append("Chronische ontstekingsziekte")
    if kwargs.get("diagnosis_chr_infc", 0) == 1:
        eligible_fu = 1
        reasons.append("Chronische infectieziekte")
    if kwargs.get("diagnosis_anemia", 0) == 1:
        eligible_fu = 1
        reasons.append("Ernstige bloedarmoede")
    if kwargs.get("diagnosis_astma", 0) == 1:
        if kwargs.get("astma_bronchitis", 0) == 1:  # more than 2 sorts of puffs
            ineligible = 1
            reasons.append("Meer dan 2 soorten inhalaties")
        elif kwargs.get("astma_bronchitis", 0) == 0:
            if (
                kwargs.get("astma_bronchitis_time", 0) == 1
            ):  # last event more than one month ago
                eligible = 1
            elif kwargs.get("astma_bronchitis_time", 0) == 0:
                eligible_fu = 1
                reasons.append("Laatste astma aanval binnen maand geleden")
    if kwargs.get("diagnosis_cushing", 0) == 1:
        ineligible = 1
        reasons.append("Ziekte van Cushing of Addison")

    return eligible, ineligible, eligible_fu, reasons


def medication_eligibility(eligible, ineligible, eligible_fu, eligible_later, **kwargs):
    reasons = []

    if kwargs.get("meds_bloodthinners", 0) == 1:
        if kwargs.get("blood_thinners_reason", 0) in [
            2,
            3,
            4,
            6,
            7,
        ]:  # pulmonary embolism, thrombosis leg, varicose veins, atrial fibrillation or artificial valve in the heart
            eligible = 1
        elif kwargs.get("blood_thinners_reason", 0) in [
            1,
            5,
        ]:  # heart infarct or stroke
            ineligible = 1
            reasons.append("Bloodthinner for heart infarct or stroke")
        else:
            eligible_fu = 1
            reasons.append("Other reason bloodthinners")
    if kwargs.get("meds_antibiotics", 0) == 1:
        if kwargs.get("antibiotics_stop", 0) == 1:  # medication stopped?
            eligible_later = 1
            reasons.append("Antibiotics stopped")
        elif kwargs.get("antibiotics_stop", 0) == 0:
            eligible_fu = 1
            reasons.append("Antibiotics not stopped")
    if kwargs.get("meds_antivir", 0) == 1:
        if kwargs.get("antiviral_stop", 0) == 1:  # medication stopped?
            eligible_later = 1
            reasons.append("Antivirals stopped")
        elif kwargs.get("antiviral_stop", 0) == 0:
            ineligible = 1
            reasons.append("Antivirals not stopped")
    if kwargs.get("meds_vaccines", 0) == 1:
        eligible_later = 1
        reasons.append("Vaccines")
    if kwargs.get("meds_painkiller", 0) == 1:
        if kwargs.get("painkiller_stop", 0) == 1:  # medication (to be) stopped?
            eligible_later = 1
            reasons.append("Opioids stopped")
        elif kwargs.get("painkiller_stop", 0) == 0:  # medication (to be) stopped?
            ineligible = 1
            reasons.append("Opioids not stopped")
    if kwargs.get("meds_steroids", 0) == 1:
        if kwargs.get("steroid_stop", 0) == 1:  # medication (to be) stopped?
            eligible_later = 1
            reasons.append("Steroids stopped")
        elif kwargs.get("steroid_stop", 0) == 0:  # medication (to be) stopped?
            eligible_fu = 1
            reasons.append("Steroids not stopped")
    if kwargs.get("meds_other", 0) == 1:
        if kwargs.get("other_stop", 0) == 1:
            eligible_later = 1
            reasons.append("Other meds stopped")
        elif kwargs.get("other_stop", 0) == 0:
            eligible_fu = 1
            reasons.append("Other meds not stopped")
    if kwargs.get("meds_antidepres", 0) == 1:
        if not np.isnan(
            kwargs.get("antidepressant_tricyclic", 0)
        ):  # tricyclic antidepressants are ineligible
            ineligible = 1
            reasons.append("Antidepressant tricyclic")
        elif not np.isnan(
            kwargs.get("antidepressants", 0)
        ):  # if it's another type of antidepressant
            eligible = 1
    if kwargs.get("meds_imune", 0) == 1:
        if (
            kwargs.get("immunosuppressive_stop_1", 0) == 1
        ):  # medication (to be) stopped?
            eligible_later = 1
            reasons.append("Immunosuppressive stopped")
        elif (
            kwargs.get("immunosuppressive_stop_1", 0) == 0
        ):  # medication (to be) stopped?
            ineligible = 1
            reasons.append("Immunosuppressive not stopped")
    if kwargs.get("meds_antipsy", 0) == 1:
        if (
            not np.isnan(kwargs.get("antipsychotics", 0))
            and kwargs.get("antipsychotics", 0) != 8
        ):
            ineligible = 1
            reasons.append("Any antipsychotics other than 'other'")
        elif kwargs.get("antipsychotics", 0) == 8:
            eligible_fu = 1
            reasons.append("Other antipsychotic")

        # medication (to be) stopped?
        if kwargs.get("antipsychotics_stop", 0) == 1:
            eligible_later = 1
            reasons.append("Antipsychotics stopped")
        elif kwargs.get("antipsychotics_stop", 0) == 0:
            ineligible = 1
            reasons.append("Antipsychotics not stopped")

    return eligible, ineligible, eligible_fu, eligible_later, reasons
