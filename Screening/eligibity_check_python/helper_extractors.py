def extract_diagnosis_variables(row, prefix, suffix):
    return {
        "diagnosis_graves": row.get(
            f"{prefix}Actieve ziekte van Graves (overactieve schildklier)", 0
        ),
        "diagnosis_cancer": row.get(
            f"{prefix}Kanker of kankerbehandeling in de afgelopen 5 jaar", 0
        ),
        "diagnosis_diabetes": row.get(f"{prefix}Diabetes mellitus (suikerziekte)", 0),
        "diagnosis_kidney": row.get(f"{prefix}Nierziekte", 0),
        "diagnosis_other_cardio": row.get(
            f'{prefix}Andere hart- en vaatziekten (zoals hartaanval, hartfalen of "etalagebenen"',
            0,
        ),
        "diagnosis_stroke": row.get(
            f"{prefix}Beroerte, bloeding in de hersenen of bloedstolsel in de hersenen (zoals TIA, CVA, cerebrale veneuze trombose)",
            0,
        ),
        "diagnosis_other_resp": row.get(
            f"{prefix}Andere longziekten (zoals COPD of emfyseem)", 0
        ),
        "diagnosis_neuro": row.get(
            f"{prefix}Neurologische aandoening (zoals dementie, ziekte van Parkinson, Alzheimer, amyotrofische laterale sclerose (ALS), epilepsie, de ziekte van Huntington)",
            0,
        ),
        "diagnosis_psycho": row.get(
            f"{prefix}Momenteel een ernstige psychische aandoening (zoals depressie stoornis, bipolaire stoornis, angststoornis, dwangstoornis,  psychose, eetstoornis of schizofrenie)",
            0,
        ),
        "diagnosis_chr_infl": row.get(
            f"{prefix}Chronische ontstekingsziekte of auto-immuunziekte (zoals Reuma, Lupus, Crohn, Colitus Ulcerosa, ziekte van Wegener, Hashimoto, Sjögren)",
            0,
        ),
        "diagnosis_chr_infc": row.get(
            f"{prefix}Chronische infecties (zoals Hepatitis B, Hepatitis C,  Tuberculose, HIV)",
            0,
        ),
        "diagnosis_anemia": row.get(
            f"{prefix}Ernstige bloedarmoede, waarvoor u behandeld moet worden", 0
        ),
        "diagnosis_astma": row.get(f"{prefix}Astma en/of chronische bronchitis", 0),
        "diagnosis_cushing": row.get(
            f"{prefix}Ziekte van Cushing of ziekte van Addison", 0
        ),
        "kidney": row.get(suffix["kidney"], 0),
        "astma_bronchitis": row.get(suffix["astma_bronchitis"], 0),
        "astma_bronchitis_time": row.get(suffix["astma_bronchitis_time"], 0),
    }


def extract_medication_variables(row, prefix, suffix):
    return {
        "meds_bloodthinners": row.get(f"{prefix}Bloedverdunners", 0),
        "meds_antibiotics": row.get(
            f"{prefix}Antibiotica (zoals Penicilline, Amoxicilline, Doxycycline)", 0
        ),
        "meds_antidepres": row.get(
            f"{prefix}Anti-depressiva (stemming verhogende medicatie", 0
        ),
        "meds_antipsy": row.get(
            f"{prefix}Anti-psychotica (medicijnen om psychische stoornissen te onderdrukken)",
            0,
        ),
        "meds_antivir": row.get(
            f'{prefix}Antivirus-medicijnen (vaak eindigend op "-vir"', 0
        ),
        "meds_imune": row.get(
            f'{prefix}Medicijnen om het immuunsysteem te onderdrukken (zogenaamde immunosuppressiva, vaak eindigend op "-mab")',
            0,
        ),
        "meds_painkiller": row.get(
            f"{prefix}Sterke pijnstillers (die tot de morfine groep behoren, zoals Oxicodon, Morfine, Fentanyl, Tramadol)",
            0,
        ),
        "meds_steroids": row.get(
            f"{prefix}Steroïd-hormonen (zoals Prednison, Cortisol, Testosteron)", 0
        ),
        "meds_vaccines": row.get(
            f"{prefix}Vaccinaties (zoals de griepprik, reizigersvaccinatie of COVID)", 0
        ),
        "meds_other": row.get(f"{prefix}Anders", 0),
        "antibiotics_stop": row.get(suffix["antibiotics_stop"], 0),
        "antiviral_stop": row.get(suffix["antiviral_stop"], 0),
        "blood_thinners_reason": row.get("blood_thinners_reason", 0),
        "painkiller_stop": row.get(suffix["painkiller_stop"], 0),
        "steroid_stop": row.get(suffix["steroid_stop"], 0),
        "other_stop": row.get(suffix["other_stop"], 0),
        "antidepressant_tricyclic": row.get(suffix["antidepressant_tricyclic"], 0),
        "antidepressants": row.get(suffix["antidepressants"], 0),
        "immunosuppressive_stop": row.get(suffix["immunosuppressive_stop"], 0),
        "antipsychotics": row.get(suffix["antipsychotics"], 0),
        "antipsychotics_stop": row.get(suffix["antipsychotics_stop"], 0),
    }
