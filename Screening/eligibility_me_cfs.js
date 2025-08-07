'##allowempty##';

// Default flags
var eligible = 0;
var eligible_later = 0;
var eligible_fu = 0;
var ineligible = 0;

// Helpers: safely split semicolon lists
function safeSplit(value) {
    if (value === null || value === undefined) return [];

    // Coerce to string and remove leading/trailing quotes
    const str = ('' + value).trim().replace(/^'+|'+$/g, '');

    // Check if it's some form of "NA"
    if (!str || str.toUpperCase() === 'NA') return [];

    return str.split(';');
}


// Safe splits
var splitted_meds = safeSplit("'{meds01}'");
var splitted_diag = safeSplit("'{gmh_diagnosis02}'");
var splitted_thinner = safeSplit("'{bloodthinners_reason_1}'");
var splitted_antidep = safeSplit("'{antidepressants}'");
var splitted_tricycl = safeSplit("'{antidepressant_tricyclic}'");
var splitted_antipsy = safeSplit("'{Antipsychotics_name}'");

// -----------------
// BMI
var bmi = {self_bmi};
if (bmi !== 'NA' && parseFloat(bmi) >= 40) {
    ineligible = 1;
} else {
    eligible = 1;
}

// -----------------
// calccageaid
var cage = {calccageaid};
if (cage !== 'NA' && parseInt(cage) == 1) {
    ineligible = 1;
} else {
    eligible = 1;
}

// -----------------
// pregbrstfeed
var preg = {pregbrstfeed};
if (preg !== 'NA' && parseInt(preg) == 1) {
    eligible_later = 1;
} else {
    eligible = 1;
}

// -----------------
// current COVID
var covid = {gmh_currcovid};
if (covid !== 'NA' && parseInt(covid) == 1) {
    eligible_later = 1;
} else {
    eligible = 1;
}

// -----------------
// PHQ-2
var phq = {phq_2_score};
if (phq !== 'NA') {
    if (parseInt(phq) > 4) {
        ineligible = 1;
    } else {
        eligible = 1;
    }
} else {
    eligible = 1;
}

// -----------------
// GMH diagnosis
if (splitted_diag.length > 0) {
    if (splitted_diag.indexOf("1") > -1) ineligible = 1; // graves
    if (splitted_diag.indexOf("2") > -1) eligible_fu = 1; // cancer
    if (splitted_diag.indexOf("3") > -1) ineligible = 1; // diabetes
    if (splitted_diag.indexOf("4") > -1) {
        var kidney = {Kidney};
        if (kidney !== 'NA') {
            if (kidney == 1) ineligible = 1;
            if (kidney == 2) eligible_fu = 1;
        }
    }
    if (splitted_diag.indexOf("5") > -1) ineligible = 1; // cardiovascular
    if (splitted_diag.indexOf("6") > -1) eligible_fu = 1; // stroke, TIA
    if (splitted_diag.indexOf("7") > -1) ineligible = 1; // other resp. condition
    if (splitted_diag.indexOf("8") > -1) ineligible = 1; // neuro
    if (splitted_diag.indexOf("9") > -1) ineligible = 1; // psych
    if (splitted_diag.indexOf("12") > -1) eligible_fu = 1; // chronic inflammation
    if (splitted_diag.indexOf("13") > -1) eligible_fu = 1; // chronic infection
    if (splitted_diag.indexOf("16") > -1) eligible_fu = 1; // anemia
    if (splitted_diag.indexOf("17") > -1) { // asthma
        var ab = {astma_bronchitis};
        var ab4 = {astma_bronchitis_4};
        if (ab !== 'NA') {
            if (ab == 1) {
                ineligible = 1;
            } else if (ab == 0 && ab4 !== 'NA') {
                if (ab4 == 1) eligible = 1;
                else if (ab4 == 0) eligible_fu = 1;
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
        var abx = {Antibiotics_stop};
        if (abx == 1) eligible_later = 1;
        else if (abx == 0) eligible_fu = 1;
    }
    if (splitted_meds.indexOf("3") > -1) {
        var antiviral = {Antiviral_stop};
        if (antiviral == 1) eligible_later = 1;
        else if (antiviral == 0) ineligible = 1;
    }
    if (splitted_meds.indexOf("4") > -1) eligible_later = 1;

    if (splitted_meds.indexOf("5") > -1) {
        var opioids = {Opioids_stop};
        if (opioids == 0) ineligible = 1;
        else if (opioids == 1) eligible_later = 1;
    }
    if (splitted_meds.indexOf("8") > -1) {
        var steroid = {Therapeuticsteriods_stop};
        if (steroid == 1) eligible_later = 1;
        else if (steroid == 0) eligible_fu = 1;
    }
    if (splitted_meds.indexOf("9") > -1) {
        var other = {Other_stop};
        if (other == 1) eligible_later = 1;
        else if (other == 0) eligible_fu = 1;
    }
    if (splitted_meds.indexOf("10") > -1) {
        if ({antidepressant_tricyclic} !== 'NA') ineligible = 1;
        else if ({antidepressants} !== 'NA') eligible = 1;
    }
    if (splitted_meds.indexOf("12") > -1) {
        var immuno = {Immunosupresiva_stop};
        if (immuno == 1) eligible_later = 1;
        else if (immuno == 0) ineligible = 1;
    }
    if (splitted_meds.indexOf("13") > -1) {
        if (splitted_antipsy.indexOf("8") == 0 && splitted_antipsy.length > 1) {
            ineligible = 1;
        } else if (splitted_antipsy.indexOf("8") > -1) {
            eligible_fu = 1;
        }
        var aps = {Antipsychotics_stop};
        if (aps == 1) eligible_later = 1;
        else if (aps == 0) ineligible = 1;
    }
} else {
    eligible = 1;
}

// -----------------
// Final eligibility assignment
var eligibility_status = 999; // fallback

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
