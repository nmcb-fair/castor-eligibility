// Eligible conditions for everyone
// CDC = yes | CCC = yes | IOM = yes
var case_definition = 0;
if({dsqsf_cdc_v2} + {dsqsf_ccc_v1} + {dsqsf_iom_v1} == 3){
    case_definition += 1;
}
else{
    case_definition += 0
};

// gmh_diagnosis01 = ME/CVS | Q-koorts | Lyme | Long COVID
var splitted = "{gmh_diagnosis01}".split(';');
if (splitted.indexOf("1") > -1||splitted.indexOf("3") > -1||splitted.indexOf("4") > -1||splitted.indexOf("5") > -1) {
 gmd_pifs = 1;
} else {
 gmd_pifs = 0;
}


// If ME CFS patients
var me_cfs_subject = 0;
if(case_definition + gmd_pifs + {included} == 3){
    me_cfs_subject += 1;
}
else{
    me_cfs_subject += 0;
};

me_cfs_subject;


