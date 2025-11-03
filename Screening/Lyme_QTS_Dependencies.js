//--------------------------------
// Dependency 1 (Lyme question)
'##allowempty##';
var splitted_diag = "{gmh_diagnosis01}".split(';'); // more than one value can be checked
var lyme_question = 0;

// Lyme question. If "1", then the participant has answered the lyme question and the lyme symptoms question.
if (splitted_diag.indexOf("4") > -1 && {lyme_symptoms} > 0) {
	lyme_question = 1;
}

lyme_question;
//--------------------------------
// Dependency 2 (Antibiotics)
'##allowempty##';
var lyme_dependency_2 = 0;

// Lyme question. If "1", then the participant has answered the lyme question and the lyme symptoms question.
if ({lyme_dependency_1} == 1 && {lyme_antibiotics} == 1) {
	lyme_dependency_2 = 1;
}

lyme_dependency_2;

//--------------------------------
// Dependency 3 (Antibiotics duration)
if({gmh_diagnosis01}==4 && {lyme_symptoms}!=0 && {lyme_antibiotics}==1 && {lyme_antibiotics_duration}!=0) {
    1; 
  } else {
    0;
  };

'##allowempty##';
var lyme_dependency_3 = 0;

// Lyme question. If "1", then the participant has answered the lyme question and the lyme symptoms question.
if ({lyme_dependency_2} == 1 && {lyme_antibiotics_duration} > 0) {
	lyme_dependency_3 = 1;
}

lyme_dependency_3;
//--------------------------------
// Dependency 4 (PTLDs)
if({gmh_diagnosis01}==4 && {lyme_symptoms}!=0 && {lyme_antibiotics}==1 && {lyme_ptlds_duration}!=5) {
    1; 
  } else {
    0;
  };

  '##allowempty##';
var lyme_dependency_4 = 0;

// Lyme question. If "1", then the participant has answered the lyme question and the lyme symptoms question.
if ({lyme_dependency_2} == 1 && {lyme_antibiotics_duration} > 0) {
	lyme_dependency_4 = 1;
}

lyme_dependency_4;