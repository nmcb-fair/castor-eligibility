'##allowempty##';
var fatigue = 0;

// Fatigue (Question 1)
if({dsq_fatigue_freq}>=2 && {dsq_fatigue_sev}>=2){
    fatigue+=1;}
else{
    fatigue+=0};

// Soreness (Question 2)
var sore = 0;
if({dsq_soreness_freq}>=2 && {dsq_soreness_sev}>=2){
    sore+=1;}
else{
    sore+=0};

//Exercise intolerance (Question 3)
var excs = 0;
if({dsq_minexercise_freq}>=2 && {dsq_minexercise_sev}>=2){
    excs+=1;
}
else{
    excs+=0};

// Post-Extertional Malaise (PEM) (Question 2 or 3)
var pem = 0;
if(sore + excs >=1){
    pem+=1;
}
else{
    pem+=0};

// Sleep problems (Question 4)
var sleep = 0;
if({dsq_unrefreshed_freq}>=2 && {dsq_unrefreshed_sev}>=2){
    sleep+=1;
}
else{
    sleep+=0};

// Problem remembering things (Question 7)
var memory = 0;
if({dsq_memory_freq}>=2 && {dsq_memory_sev}>=2){
    memory+=1;
}
else{
    memory+=0};

// Difficulty paying attention for a long period of time (Question 8)
var atten = 0
if({dsq_attention_freq}>=2 && {dsq_attention_sev}>=2){
    atten+=1;
}
else{
    atten+=0};

// Neurological / Cognitive Problems (Question 7 or 8)
var cog = 0;
if(memory + atten >= 1){
    cog+=1;
}
else{
    cog+=0};

/*
At least one symptom (frequency and severity ratings >=2)
from all of the following domains:
 */
var symptoms_all = 0;
if(fatigue + pem + sleep + cog >= 4){
    symptoms_all+=1;
}
else{
    symptoms_all+=0};

// Q5: Pain or aching in your muscles
var muscle_pain = 0;
if({dsq_pain_freq}>=2 && {dsq_pain_sev}>=2){
    muscle_pain+=1;
}
else{
    muscle_pain+=0};

// Q6: Bloating
var bloating = 0;
if({dsq_bloating_freq}>=2 && {dsq_bloating_sev}>=2){
    bloating+=1;
}
else{
    bloating+=0};

// Pain (Q5 & Q6)
var pain = 0;
if(muscle_pain + bloating >= 1){
    pain+=1;
}
else{
    pain+=0};

// Q9: Irritable bowel problems
var irr_bowel_prob = 0;
if({dsq_ibs_freq}>=2 && {dsq_ibs_sev}>=2){
    irr_bowel_prob+=1;
}
else{
    irr_bowel_prob+=0};

// Q10: Feeling unsteady on your feet, like you might fall
var feel_unsteady = 0;
if({dsq_unsteady_freq}>=2 && {dsq_unsteady_sev}>=2){
    feel_unsteady+=1;
}
else{
    feel_unsteady+=0};

// Autonomic (Question 9 or 10)
var autonomic = 0
if(irr_bowel_prob + feel_unsteady >= 1){
    autonomic+=1;
}
else{
    autonomic+=0};

// Q11:  Cold limbs (e.g. arms, legs, hands)
var cold_limbs = 0;
if({dsq_coldlimbs_freq}>=2 && {dsq_coldlimbs_sev}>=2){
    cold_limbs+=1;
}
else{
    cold_limbs+=0};

// Q12: . Feeling hot or cold for no reason
var hot_cold_no_reason = 0;
if({dsq_hotcold_freq}>=2 && {dsq_hotcold_sev}>=2){
    hot_cold_no_reason+=1;
}
else{
    hot_cold_no_reason+=0};

// Neuroendocrine (Question 11 or 12)
var neu_endocrine = 0
if(cold_limbs + hot_cold_no_reason >= 1){
    neu_endocrine+=1;
}
else{
    neu_endocrine+=0};

// Q13: Flu-like symptoms
var flu = 0;
if({dsq_flu_freq}>=2 && {dsq_flu_sev}>=2){
    flu+=1;
}
else{
    flu+=0};
// Q14: Some smells, foods, medications, or chemicals make you feel sick
var sensitivity = 0;
if({dsq_sensitivities_freq}>=2 && {dsq_sensitivities_sev}>=2){
    sensitivity+=1;
}
else{
    sensitivity+=0};

// Immune (Question 13 or 14)
var immun = 0
if(flu + sensitivity >= 1){
    immun+=1;
}
else{
    immun+=0};

var symptoms_one = 0;
if(pain + autonomic + neu_endocrine + immun>=1){
    symptoms_one+=1;
}
else{
    symptoms_one+=0};

var ccc = 0;
if(symptoms_all + symptoms_one==2){
    ccc+=1;
}
else{
    ccc+=0};
ccc;