'##allowempty##';
// 1.9 Eligible Participants on GP Survey = 1
var eligible_everyone = 0;
if ('{eligible_parti_gp_survey}' == 1){
    eligible_everyone = 1;
} else {
    eligible_everyone = 0;
}

// 1.3 not 0 & not 1
var gp_clinical_control_pif = 0;
var splitted = "{gp_diagnosis_inclusion}".split(';');
if ((splitted.indexOf("2") > -1||splitted.indexOf("3") > -1||splitted.indexOf("4") > -1 ||splitted.indexOf("5") > -1) && splitted.indexOf("1") <= -1) {
 gp_clinical_control_pif = 1;
} else {
 gp_clinical_control_pif = 0;
}

// Clinical control based on GP survey
var gp_clinical_control = 0;

if(eligible_everyone + gp_clinical_control_pif == 2){
    gp_clinical_control = 1;
}
else{
    gp_clinical_control = 0;
};

gp_clinical_control;

