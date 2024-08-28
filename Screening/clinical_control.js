// Eligible conditions for everyone
// CDC = no & CCC = no & iom = no
var clinical_control = 0;
if({dsqsf_cdc_v2} + {dsqsf_ccc_v1} + {dsqsf_iom_v1} == 0){
    clinical_control += 1;
}
else{
    clinical_control += 0
};

// gmh_diagnosis01 = (Q-koorts | Lyme | Long COVID) & not ME/CVS
var clinical_control_pif = 0;
var splitted = "{gmh_diagnosis01}".split(';');
if ((splitted.indexOf("3") > -1||splitted.indexOf("4") > -1||splitted.indexOf("5") > -1) && splitted.indexOf("1") <= -1) {
 clinical_control_pif = 1;
} else {
 clinical_control_pif = 0;
}


var clinical_control_subject = 0;
if(clinical_control + clinical_control_pif + {included} == 3){
    clinical_control_subject += 1;
}
else{
    clinical_control_subject += 0;
};

clinical_control_subject;