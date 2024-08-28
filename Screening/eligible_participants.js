'##allowempty##';
// Eligible conditions for everyone
// BMI <40
var bmi = 0;
if({self_bmi} < 40){
    bmi += 1;
}
else{
    bmi += 0
};

// Pregnant and breastfeeding is none
var preg_or_brstf = 0;
if ({sex} != 0 && {pregbrstfeed} == 1){
 preg_or_brstf = 0;
}
else {
preg_or_brstf = 1;
};

// Calccageaid = No
var cageaid = 0;
if ({calccageaid} == 0){
    cageaid += 1;
}
else{
    cageaid += 0
};

// PHQ 2 = 0
var phd2 = 0;
if ({Calcphq} == 0){
    phd2 += 1;
}
else{
    phd2 += 0
};

// GMH Diagnosis
var gmh_dia = 0;
if ('{gmh_diagnosis02}' == 0){
    gmh_dia += 1;
}
else{
    gmh_dia += 0
};

// Medication
var medi = 0;
if ('{meds01}' == 0){
    medi += 1;
}
else{
    medi += 0
};

// GMH Current COVID
var gmh_covid = 0;
if ({gmh_currcovid} == 0){
    gmh_covid += 1;
}
else{
    gmh_covid += 0
};


var eligible_participation = 0;

if(bmi + preg_or_brstf + cageaid + phd2 + gmh_dia + medi + gmh_covid == 7){
    eligible_participation += 1;
}
else{
    eligible_participation += 0;
};

eligible_participation;