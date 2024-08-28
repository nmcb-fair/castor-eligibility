'##allowempty##';
// 1.5 = 1 = Ja
var gp_diag_ex_other = 0;
if ('{gp_diagnosis_exclusion_other}' == 1){
    gp_diag_ex_other += 1;
}
else{
    gp_diag_ex_other += 0
};

// Q7 Medication = Anders
var gp_med_history = 0;
var splitted = "{gp_meds01}".split(';');
if (splitted.indexOf("10") > -1) {
 gp_med_history = 1;
} else {
 gp_med_history = 0;
}

// Eligible participants based on GP survey
var onsite_review_gp = 0;

if( gp_diag_ex_other + gp_med_history >= 1){
    onsite_review_gp = 1;
}
else{
    onsite_review_gp = 0;
};

onsite_review_gp;
