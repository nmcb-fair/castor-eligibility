'##allowempty##';
// 1.9 Eligible Participants on GP Survey = 1
var eligible_everyone = 0;
if ('{eligible_parti_gp_survey}' == 1){
    eligible_everyone = 1;
} else {
    eligible_everyone = 0;
}

// Q4 Your patient has ever been diagnosed with one of the following = 0 = None
var gp_diag_none = 0;
if ('{gp_diagnosis_inclusion}' == 0){
    gp_diag_none = 1;
} else {
    gp_diag_none = 0;
}

// Healthy control based on GP survey
var gp_healthy_control = 0;

if(gp_diag_none + eligible_everyone == 2){
    gp_healthy_control = 1;
}
else{
    gp_healthy_control = 0;
};

gp_healthy_control;

