'##allowempty##';
var fatigue = 0;

// 'Fatigue' (Q1)
if({dsq_fatigue_freq}>=1 && {dsq_fatigue_sev}>=1){
fatigue+=1;
}
else{
fatigue+=0};

// 'Soreness' (Q2)
var sore = 0;
if({dsq_soreness_freq}>=1 && {dsq_soreness_sev}>=1){
sore+=1;}
else{
sore+=0};

// 'Exercise intolerance' (Q3)
var excs = 0;
if({dsq_minexercise_freq}>=1 && {dsq_minexercise_sev}>=1){
excs+=1;
}
else{
excs+=0};

// Post-Exertional Malaise (Q2 or Q3)
var pem = 0;
if(sore + excs >=1){
pem+=1;
}
else{
pem+=0};

// Q4: Unrefreshing Sleep
var sleep = 0;
if({dsq_unrefreshed_freq}>=1 && {dsq_unrefreshed_sev}>=1){
sleep+=1;
}
else{
sleep+=0};

// Q7:  Problems remembering things
var memory = 0;
if({dsq_memory_freq}>=1 && {dsq_memory_sev}>=1){
memory+=1;
}
else{
memory+=0};

// Q8: Difficulty paying attention for a long period of time
var atten = 0;
if({dsq_attention_freq}>=1 && {dsq_attention_sev}>=1){
atten+=1;
}
else{
atten+=0};

// Memory / Concentration (Question 7 or 8)
var cog = 0;
if(memory + atten >= 1){
cog+=1;
}
else{
cog+=0};


// Q5: Pain or aching in your muscles
var pain = 0;
if({dsq_pain_freq}>=1 && {dsq_pain_sev}>=1){
pain+=1;
}
else{
pain+=0};

// Q13:  Flu-like symptoms
var immun = 0;
if({dsq_flu_freq}>=1 && {dsq_flu_freq}>=1){
immun+=1;
}
else{
immun+=0};

/*
At least 1 symptom (frequency and severity ratings >=1)
 from at least 4 symptom domains:
 */
var symptoms = 0;
if(pem + sleep + cog + pain + immun>=4){
symptoms+=1;
}
else{
symptoms+=0};

var cdc = 0;
if(fatigue + symptoms==2){
cdc+=1;
}
else{
cdc+=0};
cdc;