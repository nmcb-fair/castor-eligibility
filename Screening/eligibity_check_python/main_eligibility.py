import pandas as pd
from datetime import datetime
from eligibility_config import eligibility_configs
from determine_eligibility import determine_eligibility

# determine the location of input files
cohort_files = {
    "lyme": "input/NMCB_Screening_LDOT__Lyme_Screener_export_20250731.csv",
    "me_cfs": "input/NMCB_Screening_LDOT__ME_CFS_Screener_export_20250731.csv",
    "post_covid": "input/NMCB_Screening_LDOT__Post-COVID_Screener_export_20250731.csv",
}

# Columns used in eligibility logic, these will be exported later on
common_diag_fields = [
    "Actieve ziekte van Graves (overactieve schildklier)",
    "Kanker of kankerbehandeling in de afgelopen 5 jaar",
    "Diabetes mellitus (suikerziekte)",
    "Nierziekte",
    'Andere hart- en vaatziekten (zoals hartaanval, hartfalen of "etalagebenen"',
    "Beroerte, bloeding in de hersenen of bloedstolsel in de hersenen (zoals TIA, CVA, cerebrale veneuze trombose)",
    "Andere longziekten (zoals COPD of emfyseem)",
    "Neurologische aandoening (zoals dementie, ziekte van Parkinson, Alzheimer, amyotrofische laterale sclerose (ALS), epilepsie, de ziekte van Huntington)",
    "Momenteel een ernstige psychische aandoening (zoals depressie stoornis, bipolaire stoornis, angststoornis, dwangstoornis,  psychose, eetstoornis of schizofrenie)",
    "Chronische ontstekingsziekte of auto-immuunziekte (zoals Reuma, Lupus, Crohn, Colitus Ulcerosa, ziekte van Wegener, Hashimoto, Sjögren)",
    "Chronische infecties (zoals Hepatitis B, Hepatitis C,  Tuberculose, HIV)",
    "Ernstige bloedarmoede, waarvoor u behandeld moet worden",
    "Astma en/of chronische bronchitis",
    "Ziekte van Cushing of ziekte van Addison",
    "kidney",
    "astma_bronchitis",
    "astma_bronchitis_time",
]

common_med_fields = [
    "Bloedverdunners",
    "Antibiotica (zoals Penicilline, Amoxicilline, Doxycycline)",
    "Anti-depressiva (stemming verhogende medicatie",
    "Anti-psychotica (medicijnen om psychische stoornissen te onderdrukken)",
    'Antivirus-medicijnen (vaak eindigend op "-vir"',
    'Medicijnen om het immuunsysteem te onderdrukken (zogenaamde immunosuppressiva, vaak eindigend op "-mab")',
    "Sterke pijnstillers (die tot de morfine groep behoren, zoals Oxicodon, Morfine, Fentanyl, Tramadol)",
    "Steroïd-hormonen (zoals Prednison, Cortisol, Testosteron)",
    "Vaccinaties (zoals de griepprik, reizigersvaccinatie of COVID)",
    "bloodthinners_reason",
    "Anders",
    "antibiotics_stop",
    "antiviral_stop",
    "blood_thinners_reason",
    "painkiller_stop",
    "steroid_stop",
    "other_stop",
    "antidepressant_tricyclic",
    "antidepressants",
    "immunosuppressive_stop",
    "antipsychotics",
    "antipsychotics_stop",
]


# main loop to determine eligibility for each "cohort", Lyme, ME/CFS and Post-COVID
datetime_now = datetime.now().strftime("%d_%m_%Y_%H%M%S")
for cohort, path in cohort_files.items():
    config = eligibility_configs[cohort]
    df = pd.read_csv(path, sep=";", encoding="utf-8")

    # Compute eligibility
    df[["eligibility_status", "eligibility_reason", "diagnosis_reason", "medication_reason"]] = df.apply(
        lambda row: pd.Series(determine_eligibility(row, config)), axis=1
    )

    # Compose all relevant columns
    suffix = config["suffixes"]
    extra_cols = ["Survey Instance Id", "Castor Participant ID", "eligibility_status"]

    # Add suffix-based variables (bmi, preg, covid, phq_score, calccageaid)
    extra_cols += [
        col
        for key, col in suffix.items()
        if key
        in [
            "bmi",
            "preg",
            "covid",
            "phq_score",
            "calccageaid",
            "kidney",
            "astma_bronchitis",
            "astma_bronchitis_time",
            "antipsychotics_stop",
            "antipsychotics",
            "immunosuppressive_stop",
            "antidepressants",
            "antidepressant_tricyclic",
            "other_stop",
            "steroid_stop",
            "painkiller_stop",
            "antiviral_stop",
            "antibiotics_stop",
            "blood_thinners_reason",
        ]
    ]

    # Diagnosis-prefixed columns
    diag_prefix = config["prefix_diag"]
    diag_cols = [f"{diag_prefix}{label}" for label in common_diag_fields]
    extra_cols += diag_cols

    # Medication-prefixed columns
    meds_prefix = config["prefix_meds"]
    meds_cols = [
        f"{meds_prefix}{label}"
        for label in common_med_fields
        if label != "bloodthinners_reason"
    ]
    meds_cols.append("bloodthinners_reason")  # unprefixed
    extra_cols += meds_cols

    # Select columns to export
    first_cols = ["Survey Instance Id", "Castor Participant ID", "eligibility_status"]
    reason_cols = ["eligibility_reason", "diagnosis_reason", "medication_reason"]

    # Filter extra columns that are present
    extra_present = [col for col in extra_cols if col in df.columns]

    # Combine in desired order
    existing_cols = first_cols + reason_cols + extra_present

    # Export to CSV
    df[existing_cols].to_csv(
        f"output/eligibility_overview_{cohort}_{datetime_now}.csv", index=False
    )
