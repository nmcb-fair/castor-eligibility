'##allowempty##';
// Eligible conditions for everyone based on GP Survey
// Q5 Your patient has ever been diagnosed with one of the following = 0 = Geen
var gp_diag_ex = 0;
if ('{gp_diagnosis_exclusion}' == 0){
    gp_diag_ex += 1;
}
else{
    gp_diag_ex += 0
};

// Q6 Are there any other diseases that you think we should be aware of? = 0 = Nee
var gp_diag_ex_other = 0;
if ('{gp_diagnosis_exclusion_other}' == 0){
    gp_diag_ex_other += 1;
}
else{
    gp_diag_ex_other += 0
};

// Q7 Has your patient used any of the following medications in the past 3 months? = 0 = Geen
var gp_med_history = 0;
if ('{gp_meds01}' == 0){
    gp_med_history += 1;
}
else{
    gp_med_history += 0
};

// Eligible participants based on GP survey
var eligible_participation_gp = 0;

if(gp_diag_ex + gp_diag_ex_other + gp_med_history == 3){
    eligible_participation_gp = 1;
}
else{
    eligible_participation_gp = 0;
};

eligible_participation_gp;
