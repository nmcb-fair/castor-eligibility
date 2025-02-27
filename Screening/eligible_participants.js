'##allowempty##';
// Eligible conditions for everyone
// BMI < 40
var bmi = 0;
if ({self_bmi} < 40) {
    bmi = 1;
}

// Pregnant and breastfeeding is none
var preg_or_brstf = 1;
if ({sex} != 0 && {pregbrstfeed} == 1) {
    preg_or_brstf = 0;
}

// Calccageaid = No
var cageaid = 0;
if ({calccageaid} == 0) {
    cageaid = 1;
}

// PHQ 2 = 0
var phq2 = 0;
// phq score of 4 or lower, or antidepressant and score of 2 or lower
if ({phq_2_score} <= 4 || ({phq_2_score} <= 2 && {meds01} == 10)) { 
    phq2 = 1;
}

// GMH Diagnosis
var gmh_dia = 1; // default is inclusion, unless
var splitted = "{gmh_diagnosis02}".split(';');

if (splitted.indexOf("1") == 1) { // graves
    gmh_dia = 0;
}
else if (splitted.indexOf("2") == 1 ) { // cancer
    if ({Cancer} == 1 ) {
        gmh_dia = 0;
    }
    else if ({Cancer2} == 0) {
        gmh_dia = 0;
    }
}
else if (splitted.indexOf("3") == 1) { // diabetes
    gmh_dia = 0;
}
else if (splitted.indexOf("4") == 1 && {Kidney} == 1) { // kidney disease
    gmh_dia = 0;
}
else if (splitted.indexOf("5") == 1) { // cardiovascular
    gmh_dia = 0;
}
else if (splitted.indexOf("6") == 1) { // stroke, TIA
    gmh_dia = 0;
}
else if (splitted.indexOf("7") == 1 && {Other_breathing} == 1) { // other resp. condition
    gmh_dia = 0;
}
else if (splitted.indexOf("8") == 1) { // neurological condition
    gmh_dia = 0;
}
else if (splitted.indexOf("9") == 1) { // psychological condition
    gmh_dia = 0;
}
else if (splitted.indexOf("10") == 1) { // CNS infection
    gmh_dia = 0;
}
else if (splitted.indexOf("12") == 1) { // chronic inflamation
    gmh_dia = 0;
}
else if (splitted.indexOf("13") == 1) { // chronic infection
    gmh_dia = 0;
}
else if (splitted.indexOf("15") == 1) { // leukemia
    gmh_dia = 0;
}
else if (splitted.indexOf("16") == 1) { // anemia
    gmh_dia = 0;
}
else if (splitted.indexOf("17") == 1 && {astma_bronchitis} == 1) { // astma
    gmh_dia = 0;
}

// Medication, except for antiviral, antibiotics, opiod and vaccinations. 
// These are added to a separate calculation, "eligible_later.js".
var medi = 1; // default is inclusion, unless
var splitted = "{meds01}".split(';');
var splitted_ad = "{Antidepressant_name}".split(';');
var min_value = Math.min.apply(null, splitted_ad);
var max_value = Math.max.apply(null, splitted_ad);

if (splitted.indexOf("3") == 1) { // antiviral
    // medication (to) stop(ped)?
    if ({Antiviral_stop} == 0) {		
        medi = 0;
    }
}
else if (splitted.indexOf("5") == 1) { // opioid
    // medication (to) stop(ped)?
    if ({Opioids_stop} == 0) {		
        medi = 0;
    }
}
else if (splitted.indexOf("10") == 1) { // antidepressant            
    // Amitriptyline to Tranylcypromine (option group value 11 to 23)
    if (min_value >= 11 && max_value <= 23) {
        medi = 0;
    }
}

// To be determined:
// - immunosupresiva
// - anti-psychotica
// - andere pijnmedicatie
// - therapeutic steriods

// Is participant eligible? 
var eligible_participation = 0;
if (bmi + preg_or_brstf + cageaid + phq2 + gmh_dia + medi == 6) {
    eligible_participation = 1;
}

eligible_participation;
