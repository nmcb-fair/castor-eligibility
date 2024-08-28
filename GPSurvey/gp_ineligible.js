'##allowempty##';
// Q5 Your patient has ever been diagnosed with one of the following > 0
var gp_diag_ex = 0;
if ('{gp_diagnosis_exclusion}' > 0){
    gp_diag_ex += 1;
}
else{
    gp_diag_ex += 0
};

// Q7 Has your patient used any of the following medications in the past 3 months != 0 and != 10
var gp_med_history = 0;
var splitted = "{gp_meds01}".split(';');
if (splitted.indexOf("10") <= -1 || splitted.indexOf("0") <= -1) {
 gp_med_history = 1;
} else {
 gp_med_history = 0;
}

// Excluded participants
var excluded_participation_gp = 0;

if(gp_diag_ex + gp_med_history >= 1){
    excluded_participation_gp = 1;
}
else{
    excluded_participation_gp = 0;
};

excluded_participation_gp;