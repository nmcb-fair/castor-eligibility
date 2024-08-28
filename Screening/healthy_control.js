// Eligible conditions for everyone
// CDC = no & CCC = no & iom = no
var healthy_case = 0;
if({dsqsf_cdc_v2} + {dsqsf_ccc_v1} + {dsqsf_iom_v1} == 0){
    healthy_case += 1;
}
else{
    healthy_case += 0
};

// gmh_diagnosis01 = none
var healthy_gmd_pifs = 0;
if ('{gmh_diagnosis01}' == 0){
    healthy_gmd_pifs += 1;
}
else{
    healthy_gmd_pifs += 0
};


var healthy_control_subject = 0;

if(healthy_case + healthy_gmd_pifs + {included} == 3){
    healthy_control_subject += 1;
}
else{
    healthy_control_subject += 0;
};

healthy_control_subject;


