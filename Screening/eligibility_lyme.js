'##allowempty##';

// Default flags
var eligible = 0;
var eligible_later = 0;
var eligible_fu = 0;
var ineligible = 0;

// Helpers: safely split semicolon lists
function safeSplit(value) {
    if (value === null || value === undefined) return [];
    const str = ('' + value).trim().replace(/^'+|'+$/g, '');
    if (!str || str.toUpperCase() === 'NA') return [];
    return str.split(';');
}

// Safe splits
var splitted_meds = safeSplit("'{meds01_1}'");
var splitted_diag = safeSplit("'{gmh_diagnosis02_1}'");
var splitted_thinner = safeSplit("'{bloodthinners_reason_2}'");
var splitted_antipsy = safeSplit("'{Antipsychotics_name_1}'");

// -----------------
// BMI
var bmi = {self_bmi_1};
if (bmi !== 'NA' && parseFloat(bmi) >= 40) {
    ineligible = 1;
} else {
    eligible = 1;
}

// -----------------
// Pregnancy and/or breast feeding
var preg = {pregbrstfeed_1};
if (preg !== 'NA' && parseInt(preg) == 1) {
    eligible_later = 1;
} else {
    eligible = 1;
}

// -----------------
// Current COVID
var covid = {gmh_currcovid_1};
if (covid !== 'NA' && parseInt(covid) == 1) {
    eligible_later = 1;
} else {
    eligible = 1;
}

// -----------------
// GMH Diagnosis
if (splitted_diag.length > 0) {
    if (splitted_diag.indexOf("1") > -1) ineligible = 1; // graves
    if (splitted_diag.indexOf("2") > -1) eligible_fu = 1; // cancer
    if (splitted_diag.indexOf("3") > -1) ineligible = 1; // diabetes
    if (splitted_diag.indexOf("4") > -1) {
        var kidney = {Kidney_1};
        if (kidney !== 'NA') {
            if (kidney == 1) ineligible = 1;
            if (kidney == 2) eligible_fu = 1;
        }
    }
    if (splitted_diag.indexOf("5") > -1) ineligible = 1; // cardiovascular
    if (splitted_diag.indexOf("6") > -1) eligible_fu = 1; // stroke, TIA
    if (splitted_diag.indexOf("7") > -1) ineligible = 1; // other resp. condition
    if (splitted_diag.indexOf("8") > -1) ineligible = 1; // neurological condition
    if (splitted_diag.indexOf("9") > -1) ineligible = 1; // psychological condition
    if (splitted_diag.indexOf("12") > -1) eligible_fu = 1; // chronic inflammation
    if (splitted_diag.indexOf("13") > -1) eligible_fu = 1; // chronic infection
    if (splitted_diag.indexOf("16") > -1) eligible_fu = 1; // anemia
    if (splitted_diag.indexOf("17") > -1) {
        var ab = {astma_bronchitis_1};
        var ab5 = {astma_bronchitis_5};
        if (ab !== 'NA') {
            if (ab == 1) {
                ineligible = 1;
            } else if (ab == 0 && ab5 !== 'NA') {
                if (ab5 == 1) eligible = 1;
                else if (ab5 == 0) eligible_fu = 1;
            }
        }
    }
    if (splitted_diag.indexOf("18") > -1) ineligible = 1; // Cushing/Addison
} else {
    eligible = 1;
}

// -----------------
// Medications
if (splitted_meds.length > 0) {
    if (splitted_meds.indexOf("1") > -1) {
        if (splitted_thinner.some(code => ["2", "3", "4", "6", "7"].includes(code))) {
            eligible = 1;
        } else if (splitted_thinner.some(code => ["1", "5"].includes(code))) {
            ineligible = 1;
        } else {
            eligible_fu = 1;
        }
    }

    if (splitted_meds.indexOf("2") > -1) {
        var abx = {Antibiotics_stop_1};
        if (abx == 1) eligible_later = 1;
        else if (abx == 0) eligible_fu = 1;
    }

    if (splitted_meds.indexOf("3") > -1) {
        var antiviral = {Antiviral_stop_1};
        if (antiviral == 1) eligible_later = 1;
        else if (antiviral == 0) ineligible = 1;
    }

    if (splitted_meds.indexOf("4") > -1) eligible_later = 1;

    if (splitted_meds.indexOf("5") > -1) {
        var opioids = {Opioids_stop_1};
        if (opioids == 0) ineligible = 1;
        else if (opioids == 1) eligible_later = 1;
    }

    if (splitted_meds.indexOf("8") > -1) {
        var steroid = {Therapeuticsteriods_stop_1};
        if (steroid == 1) eligible_later = 1;
        else if (steroid == 0) eligible_fu = 1;
    }

    if (splitted_meds.indexOf("9") > -1) {
        var other = {Other_stop_1};
        if (other == 1) eligible_later = 1;
        else if (other == 0) eligible_fu = 1;
    }

    if (splitted_meds.indexOf("10") > -1) {
        if ({antidepressant_tricyclic_1} !== 'NA') ineligible = 1;
        else if ({antidepressants_1} !== 'NA') eligible = 1;
    }

    if (splitted_meds.indexOf("12") > -1) {
        var immuno = {Immunosupresiva_stop_1};
        if (immuno == 1) eligible_later = 1;
        else if (immuno == 0) ineligible = 1;
    }

    if (splitted_meds.indexOf("13") > -1) {
        if (splitted_antipsy.indexOf("8") == 0 && splitted_antipsy.length > 1) {
            ineligible = 1;
        } else if (splitted_antipsy.indexOf("8") > -1) {
            eligible_fu = 1;
        }
        var aps = {Antipsychotics_stop_1};
        if (aps == 1) eligible_later = 1;
        else if (aps == 0) ineligible = 1;
    }

} else {
    eligible = 1;
}

// -----------------
// Final eligibility assignment
var eligibility_status = 999;

if (ineligible == 1) {
    eligibility_status = 3;
} else if (eligible_later == 1) {
    eligibility_status = 2;
} else if (eligible_fu == 1) {
    eligibility_status = 3;
} else if (eligible == 1) {
    eligibility_status = 1;
}

eligibility_status;
