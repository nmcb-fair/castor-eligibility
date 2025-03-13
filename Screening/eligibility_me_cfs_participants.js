'##allowempty##';
// Eligible conditions for everyone

// default variables
var eligible = 0;
var eligible_later = 0;
var eligible_fu = 0;
var ineligible = 0;
var splitted_meds = "{meds01}".split(';');
var splitted_diag = "{gmh_diagnosis02}".split(';');

// BMI
if ({ self_bmi } >= 40) {
    ineligible = 1;
}
else {
    eligible = 1;
}

// Calccageaid
if ({ calccageaid } == 1) {
    ineligible = 1;
}
else {
    eligible = 1;
}

// PHQ 2 
// phq score of 3 or lower, or antidepressant and score of 2 or lower
if ({ phq_2_score } <= 3 || ({ phq_2_score } <= 2 && splitted_meds.includes("10"))) {
    eligible = 1;
}
else {
    ineligible = 1;
}


// Pregnancy and/or breast feeding
if ({ pregbrstfeed } == 1) {
    eligible_later = 1;
}
else {
    eligible = 1;
}

// Current COVID
if ({ gmh_currcovid } == 1) {
    eligible_later = 1;
}
else {
    eligible = 1;
}

// GMH Diagnosis
if (splitted_diag.length > 0) {
    if (splitted_diag.indexOf("1") > -1) { // graves
        ineligible = 1;
    }
    if (splitted_diag.indexOf("2") > -1) { // cancer
        if ({ Cancer } == 1) {
            ineligible = 1;
        }
        else if ({ Cancer2 } == 0) {
            ineligible = 1;
        }
    }
    if (splitted_diag.indexOf("3") > -1) { // diabetes
        ineligible = 1;
    }
    if (splitted_diag.indexOf("4") > -1 && { Kidney } == 1) { // kidney disease
        ineligible = 1;
    }
    if (splitted_diag.indexOf("5") > -1) { // cardiovascular
        ineligible = 1;
    }
    if (splitted_diag.indexOf("6") > -1) { // stroke, TIA
        ineligible = 1;
    }
    if (splitted_diag.indexOf("7") > -1 && { Other_breathing } == 1) { // other resp. condition
        ineligible = 1;
    }
    if (splitted_diag.indexOf("8") > -1) { // neurological condition
        ineligible = 1;
    }
    if (splitted_diag.indexOf("9") > -1) { // psychological condition
        ineligible = 1;
    }
    if (splitted_diag.indexOf("10") > -1) { // CNS infection
        ineligible = 1;
    }
    if (splitted_diag.indexOf("12") > -1) { // chronic inflamation
        ineligible = 1;
    }
    if (splitted_diag.indexOf("13") > -1) { // chronic infection
        ineligible = 1;
    }
    if (splitted_diag.indexOf("15") > -1) { // leukemia
        ineligible = 1;
    }
    if (splitted_diag.indexOf("16") > -1) { // anemia
        ineligible = 1;
    }
    if (splitted_diag.indexOf("17") > -1 && { astma_bronchitis } == 1) { // astma
        ineligible = 1;
    }
}
else {
    eligible = 1;
}

// Medication
if (splitted_meds.length > 0) {
    if (splitted_meds.indexOf("2") > -1) { // antibiotics	
        if ({ Antibiotics_stop } == 1) { // medication (to) stop(ped)?	
            eligible_later = 1;
        }
        else if ({ Antibiotics_stop } == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("3") > -1) { // antiviral 	
        if ({ Antiviral_stop } == 1) { // medication (to) stop(ped)?	
            eligible_later = 1;
        }
        else if ({ Antiviral_stop } == 0) {
            ineligible = 1;
        }
    }
    if (splitted_meds.indexOf("4") > -1) { // vaccines 			
        eligible_later = 1;
    }
    if (splitted_meds.indexOf("5") > -1) { // opioid 	
         if ({ Opioids_stop } == 1) { // medication (to) stop(ped)?				
            eligible_later = 1;
        }
        else if ({ Opioids_stop } == 0) {
            ineligible = 1;
        }
    }
    if (splitted_meds.indexOf("8") > -1) { // therapeutic steriods 	
        if ({ Therapeuticsteriods_stop } == 1) { // medication (to) stop(ped)?		
            eligible_later = 1;
        }
        else if ({ Therapeuticsteriods_stop } == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("9") > -1) { // other medication	
        if ({ Other_stop } == 1) { // medication (to) stop(ped)?		
            eligible_later = 1;
        }
        else if ({ Other_stop } == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("10") > -1) { // antidepressants
        // tricyclic antidepressants are ineligible
        if ({ antidepressant_tricyclic } == 1) {
            ineligible = 1;
        }
        else {
            eligible = 1; // if it's another type of antidepressant
        }
    }
    if (splitted_meds.indexOf("12") > -1) { // immunosupresiva
        if ({ Immunosupresiva_stop } == 1) { // medication (to) stop(ped)?		       
            eligible_later = 1;
        }
        else if ({ Immunosupresiva_stop } == 0) {
            ineligible = 1;
        }
    }
    if (splitted_meds.indexOf("13") > -1) { // antipsychotics	
        if ({ Antipsychotics_stop } == 1) { // medication (to) stop(ped)?			
            eligible_later = 1;
        }
        else if ({ Antipsychotics_stop } == 0) {
            ineligible = 1;
        }
    }
}
else {
    eligible = 1;
}

// status codes: 
// 0 = Ineligible, excluded
// 1 = Eligible
// 2 = Eligible later
// 3 = Eligibility needs follow up

// If ineligible is set anywhere, status is 0
if (eligible == 1) {
    eligibility_status = 1;
}
if (eligible_later == 1) {
    eligibility_status = 2;
}
if (eligible_fu == 1) {
    eligibility_status = 3;
}
if (ineligible == 1) {
    eligibility_status = 0;
}

eligibility_status;
