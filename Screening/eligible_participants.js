'##allowempty##';
// Eligible conditions for everyone
// BMI < 40
var bmi = 0;
if ({self_bmi} < 40) {
    bmi = 1;
}

// Calccageaid = No
var cageaid = 0;
if ({calccageaid} == 0) {
    cageaid = 1;
}

// PHQ 2 = 0
var phq2 = 0;
// phq score of 4 or lower, or antidepressant and score of 2 or lower
if (({phq_2_score} <= 4 && {meds01} != 10) || ({phq_2_score} <= 2 && {meds01} == 10)) { 
    phq2 = 1;
}

// GMH Diagnosis
var gmh_dia = 1; // default is inclusion, unless
var splitted = "{gmh_diagnosis02}".split(';');

if (splitted.indexOf("1") > -1) { // graves
    gmh_dia = 0;
}
else if (splitted.indexOf("2") > -1 ) { // cancer
    if ({Cancer} == 1 ) {
        gmh_dia = 0;
    }
    else if ({Cancer2} == 0) {
        gmh_dia = 0;
    }
}
else if (splitted.indexOf("3") > -1) { // diabetes
    gmh_dia = 0;
}
else if (splitted.indexOf("4") > -1 && {Kidney} == 1) { // kidney disease
    gmh_dia = 0;
}
else if (splitted.indexOf("5") > -1) { // cardiovascular
    gmh_dia = 0;
}
else if (splitted.indexOf("6") > -1) { // stroke, TIA
    gmh_dia = 0;
}
else if (splitted.indexOf("7") > -1 && {Other_breathing} == 1) { // other resp. condition
    gmh_dia = 0;
}
else if (splitted.indexOf("8") > -1) { // neurological condition
    gmh_dia = 0;
}
else if (splitted.indexOf("9") > -1) { // psychological condition
    gmh_dia = 0;
}
else if (splitted.indexOf("10") > -1) { // CNS infection
    gmh_dia = 0;
}
else if (splitted.indexOf("12") > -1) { // chronic inflamation
    gmh_dia = 0;
}
else if (splitted.indexOf("13") > -1) { // chronic infection
    gmh_dia = 0;
}
else if (splitted.indexOf("15") > -1) { // leukemia
    gmh_dia = 0;
}
else if (splitted.indexOf("16") > -1) { // anemia
    gmh_dia = 0;
}
else if (splitted.indexOf("17") > -1 && {astma_bronchitis} == 1) { // astma
    gmh_dia = 0;
}

// Medication, except for antiviral, antibiotics, opiod and vaccinations. 
// These are added to a separate calculation, "eligible_later.js".
var medi = 1; // default is inclusion, unless
var splitted_meds = "{meds01}".split(';');

if (splitted_meds.indexOf("3") > -1 && {Antiviral_stop} == 0) { // antiviral and medication (to) stop(ped)?		
	medi = 0;
}
else if (splitted_meds.indexOf("5") > -1 && {Opioids_stop} == 0) { // opioid and medication (to) stop(ped)?		
    medi = 0;
}
else if (splitted_meds.indexOf("10") > -1 && {antidepressant_tricyclic} == 1) { // antidepressant and tricyclic?		        
   medi = 0;
}
else if (splitted_meds.indexOf("13") > -1 && {Antipsychotics_stop} == 0) { // antipsychotics and medication (to) stop(ped)?	
	medi = 0;
}

// Is participant eligible? 
var eligible_participation = 0;
if (bmi + cageaid + phq2 + gmh_dia + medi == 5) {
    eligible_participation = 1;
}

eligible_participation;
