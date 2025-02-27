'##allowempty##';

// eligible later based on medication conditions
var eligible_later = 0;
var splitted = "{meds01}".split(';');

if (splitted.indexOf("2") == 1) { // antibiotics	
	eligible_later = 1;
}
else if (splitted.indexOf("3") == 1) { // antiviral
	eligible_later = 1;
}
else if (splitted.indexOf("4") == 1) { // vaccines
	eligible_later = 1;
}
else if (splitted.indexOf("5") == 1) { // opioid
	// medication (to) stop(ped)?
	if ({Opioids_stop} == 1) {		
		eligible_later = 1;
	}
}
else if (splitted.indexOf("8") == 1) { // therapeutic steroids
	eligible_later = 1;
}
else if (splitted.indexOf("9") == 1) { // other medication
	// medication (to) stop(ped)?
	if ({Other_stop} == 1) {		
		eligible_later = 1;
	}
}
else if (splitted.indexOf("13") == 1) { // antipsychotics
	// medication (to) stop(ped)?
	if ({Antipsychotics_stop} == 1) {		
		eligible_later = 1;
	}
}

// if pregnant or breast feeding
if ({pregbrstfeed} == 1) {
	eligible_later = 1;
}

// Post/Long COVID
var splitted = "{gmh_diagnosis01}".split(';');
if (splitted.indexOf("5") == 1) {
	eligible_later = 1;
}

eligible_later;