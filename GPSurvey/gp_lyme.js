'##allowempty##';
// 1.9 Eligible Participants on GP Survey = 1
var eligible_everyone = 0;
if ('{gp_clinical_control}' == 1){
    eligible_everyone = 1;
} else {
    eligible_everyone = 0;
}

// GP diagnosis inclusion with lyme checked
var gp_diag_lyme = 0;
var splitted = "{gp_diagnosis_inclusion}".split(';');
if (splitted.indexOf("4") > -1) {
 gp_diag_lyme = 1;
} else {
 gp_diag_lyme = 0;
}

// Lyme control based on GP survey
var gp_lyme = 0;

if(eligible_everyone + gp_diag_lyme == 2){
    gp_lyme = 1;
}
else{
    gp_lyme = 0;
};

gp_lyme;


