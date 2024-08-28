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

/*
At least one symptom (frequency and severity ratings >=2)
from all of the following domains:
 */
var symptoms_all = 0;
if(fatigue + pem + sleep >= 3){
    symptoms_all+=1;
}
else{
    symptoms_all+=0};


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


// Q10: Feeling unsteady on your feet, like you might fall
// or "Orthostatic Intolerance"
var feel_unsteady = 0;
if({dsq_unsteady_freq}>=2 && {dsq_unsteady_sev}>=2){
    feel_unsteady+=1;
}
else{
    feel_unsteady+=0};


var symptoms_one = 0;
if(cog + feel_unsteady >= 1){
    symptoms_one+=1;
}
else{
    symptoms_one+=0};

var iom = 0;
if(symptoms_all + symptoms_one === 2){
    iom+=1;
}
else{
    iom+=0};
iom;