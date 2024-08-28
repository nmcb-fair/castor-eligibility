'##allowempty##';
// Eligible conditions for everyone
var eligible_everyone = 0;
if ('{eligible_parti_gp_survey}' == 1){
    eligible_everyone = 1;
} else {
    eligible_everyone = 0;
}

// 1.4 = 1 = A04.01: chronisch vermoeidheidssyndroom (ME/CVS)
var gp_diag_me_cvs = 0;
var splitted = '{gp_diagnosis_inclusion}'.split(';');
if (splitted.indexOf("1") > -1) {
    gp_diag_me_cvs = 1;
} else {
    gp_diag_me_cvs = 0;
}

// ME/CVS participants based on GP survey
var me_cvs_participant_gp = 0;

if(gp_diag_me_cvs + eligible_everyone == 2){
    me_cvs_participant_gp = 1;
}
else{
    me_cvs_participant_gp = 0;
};

me_cvs_participant_gp;

