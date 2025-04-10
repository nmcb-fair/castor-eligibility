'##allowempty##';
// Eligible conditions for everyone

// default is eligible
var eligible = 0;
var eligible_later = 0;
var eligible_fu = 0;
var ineligible = 0;
var splitted_meds = "{meds01_2}".split(';');
var splitted_diag = "{gmh_diagnosis02_2}".split(';');

// Calccageaid
if ({calccageaid_1} == 1) {
    ineligible = 1;
}
else {
    eligible = 1;
}

// Pregnancy and/or breast feeding
if ({pregbrstfeed_2} == 1) {
    eligible_later = 1;
}
else {
    eligible = 1;
}

// Current COVID
if ({gmh_currcovid_2} == 1) {
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
       eligible_later = 1;
    }
    if (splitted_diag.indexOf("3") > -1) { // diabetes
        ineligible = 1;
    }
    if (splitted_diag.indexOf("4") > -1 && {Kidney_2} == 1) { // kidney disease
        ineligible = 1;
    }
    if (splitted_diag.indexOf("5") > -1) { // cardiovascular
        ineligible = 1;
    }
    if (splitted_diag.indexOf("6") > -1) { // stroke, TIA
        ineligible = 1;
    }
    if (splitted_diag.indexOf("7") > -1 && {Other_breathing_2} == 1) { // other resp. condition
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
    if (splitted_diag.indexOf("17") > -1 && {astma_bronchitis_2} == 1) { // astma
        ineligible = 1;
    }
}
else {
    eligible = 1;
}

// Medication
if (splitted_meds.length > 0) {
    if (splitted_meds.indexOf("2") > -1) { // antibiotics	
        if ({Antibiotics_stop_2} == 1) { // medication (to) stop(ped)?	
            eligible_later = 1;
        }
        else if ({Antibiotics_stop_2} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("3") > -1) { // antiviral 	
        if ({Antiviral_stop_2} == 1) { // medication (to) stop(ped)?	
            eligible_later = 1;
        }
        else if ({Antiviral_stop_2} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("4") > -1) { // vaccines 			
        eligible_later = 1;
    }
    if (splitted_meds.indexOf("5") > -1) { // opioid 	
        if ({Opioids_stop_2} == 0) { // medication (to) stop(ped)?		
            ineligible = 1;
        }
        else if ({Opioids_stop_2} == 1) { // 		
            eligible_later = 1;
        }
    }
    if (splitted_meds.indexOf("8") > -1) { // therapeutic steriods 	
        if ({Therapeuticsteriods_stop_2} == 1) { // medication (to) stop(ped)?		
            eligible_later = 1;
        }
        else if ({Therapeuticsteriods_stop_2} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("9") > -1) { // other medication	
        if ({Other_stop_2} == 1) { // medication (to) stop(ped)?		
            eligible_later = 1;
        }
        else if ({Other_stop_2} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("10") > -1) {
        // tricyclic antidepressants are ineligible
        if ({antidepressant_tricyclic_2} == 1) {
            ineligible = 1;
        }
        else {
            eligible = 1; // if it's another type of antidepressant
        }
    }
    if (splitted_meds.indexOf("12") > -1) {
        if ({Immunosupresiva_stop_2} == 1) { // medication (to) stop(ped)?		       
            eligible_later = 1;
        }
        else if ({Immunosupresiva_stop_2} == 0) {
            ineligible = 1;
        }
    }
    if (splitted_meds.indexOf("13") > -1) { // antipsychotics	
        if ({Antipsychotics_stop_3} == 1) { // medication (to) stop(ped)?			
            eligible_later = 1;
        }
        else if ({Antipsychotics_stop_3} == 0) {
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
