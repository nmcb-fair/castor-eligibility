'##allowempty##';
// Eligible conditions for everyone

// default is eligible
var eligible = 0;
var eligible_later = 0;
var eligible_fu = 0;
var ineligible = 0;
var splitted_meds = "{meds01_1}".split(';');
var splitted_diag = "{gmh_diagnosis02_1}".split(';');
var splitted_thinner = "{bloodthinners_reason_2}".split(';');
var splitted_antidep = "{antidepressants_1}".split(';');
var splitted_tricycl = "{antidepressant_tricyclic_1}".split(';');
var splitted_antipsy = "{Antipsychotics_name_1}".split(';');

// BMI
if ({self_bmi_1} >= 40) {
    ineligible = 1;
}
else {
    eligible = 1;
}

// Pregnancy and/or breast feeding
if ({pregbrstfeed_1} == 1) {
    eligible_later = 1;
}
else {
    eligible = 1;
}

// Current COVID
if ({gmh_currcovid_1} == 1) {
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
        eligible_fu = 1;
    }
    if (splitted_diag.indexOf("3") > -1) { // diabetes
        ineligible = 1;
    }
    if (splitted_diag.indexOf("4") > -1) { // kidney disease
		if ({Kidney_1} == 1) { // less than 50% functional
			ineligible = 1;
		}
		if ({Kidney_1} == 2) { // unsure about functionality
			eligible_fu = 1;
		}
    }
    if (splitted_diag.indexOf("5") > -1) { // cardiovascular
        ineligible = 1;
    }
    if (splitted_diag.indexOf("6") > -1) { // stroke, TIA
        eligible_fu = 1;
    }
    if (splitted_diag.indexOf("7") > -1) { // other resp. condition
        ineligible = 1;
    }
    if (splitted_diag.indexOf("8") > -1) { // neurological condition
        ineligible = 1;
    }
    if (splitted_diag.indexOf("9") > -1) { // psychological condition
        ineligible = 1;
    }    
    if (splitted_diag.indexOf("12") > -1) { // chronic inflamation
        eligible_fu = 1;
    }
    if (splitted_diag.indexOf("13") > -1) { // chronic infection
        eligible_fu = 1;
    }    
    if (splitted_diag.indexOf("16") > -1) { // anemia
        eligible_fu = 1;
    }
    if (splitted_diag.indexOf("17") > -1) { // astma        
		if ({astma_bronchitis_1} == 1) { //  more than 2 sorts of pufs
			ineligible = 1;
		}
		else if ({astma_bronchitis_1} == 0) {
			if ({astma_bronchitis_5} == 1) { // last event more than one month ago
				eligible = 1;
			}
			else if ({astma_bronchitis_5} == 0) {
				eligible_fu = 1;
			}
		}
    }
	if (splitted_diag.indexOf("18") > -1) { // Cushing or Addison
        ineligible = 1;
	}

}
else {
    eligible = 1;
}

// Medication
if (splitted_meds.length > 0) {
	if (splitted_meds.indexOf("1") > -1) { // bloodthinner	
		if (splitted_thinner.indexOf("4") > -1 || splitted_thinner.indexOf("7") > -1 || splitted_thinner.indexOf("6") > -1 || splitted_thinner.indexOf("2") > -1 || splitted_thinner.indexOf("3") > -1) {
			// pulmonary embolism, thrombosis leg, varicose veins, atrial fibrillation or artificial valve in the heart
			eligible = 1;
		}
		else if (splitted_thinner.indexOf("5") > -1 || splitted_thinner.indexOf("1") > -1) { // heart infarct or stroke
			ineligible = 1;
		}
		else {
			eligible_fu = 1;
		}	
	}
    if (splitted_meds.indexOf("2") > -1) { // antibiotics	
        if ({Antibiotics_stop_1} == 1) { // medication (to) stop(ped)?	
            eligible_later = 1;
        }
        else if ({Antibiotics_stop_1} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("3") > -1) { // antiviral 	
        if ({Antiviral_stop_1} == 1) { // medication (to) stop(ped)?	
            eligible_later = 1;
        }
        else if ({Antiviral_stop_1} == 0) {
            ineligible = 1;
        }
    }
    if (splitted_meds.indexOf("4") > -1) { // vaccines 			
        eligible_later = 1;
    }
    if (splitted_meds.indexOf("5") > -1) { // opioid 	
        if ({Opioids_stop_1} == 0) { // medication (to) stop(ped)?		
            ineligible = 1;
        }
        else if ({Opioids_stop_1} == 1) { // 		
            eligible_later = 1;
        }
    }
    if (splitted_meds.indexOf("8") > -1) { // therapeutic steriods 	
        if ({Therapeuticsteriods_stop_1} == 1) { // medication (to) stop(ped)?		
            eligible_later = 1;
        }
        else if ({Therapeuticsteriods_stop_1} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("9") > -1) { // other medication	
        if ({Other_stop_1} == 1) { // medication (to) stop(ped)?		
            eligible_later = 1;
        }
        else if ({Other_stop_1} == 0) {
            eligible_fu = 1;
        }
    }
    if (splitted_meds.indexOf("10") > -1) {
        // tricyclic antidepressants are ineligible
        if (splitted_tricycl.length > 0) {
            ineligible = 1;
        }
        else if (splitted_antidep.length > 0){
            eligible = 1; // if it's another type of antidepressant
        }
    }
    if (splitted_meds.indexOf("12") > -1) {
        if ({Immunosupresiva_stop_1} == 1) { // medication (to) stop(ped)?		       
            eligible_later = 1;
        }
        else if ({Immunosupresiva_stop_1} == 0) {
            ineligible = 1;
        }
    }
    if (splitted_meds.indexOf("13") > -1) { // antipsychotics	
		if (splitted_antipsy.indexOf("8") == 0 && splitted_antipsy.length > 1) { // any antipsychotics other than "other"
			ineligible = 1;
		}		
		else if (splitted_antipsy.indexOf("8") > -1) { // "other"
			eligible_fu = 1;
		}
        if ({Antipsychotics_stop_1} == 1) { // medication (to) stop(ped)?			
            eligible_later = 1;
        }
        else if ({Antipsychotics_stop_1} == 0) {
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
