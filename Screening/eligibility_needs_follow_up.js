'##allowempty##';

// eligible later based on medication conditions
var eligibility_fu = 0;
var splitted = "{meds01}".split(';');

if (splitted.indexOf("9") == 1) { // other medication
	// medication (to) stop(ped)?
	if ({Other_stop} == 0) {		
		eligibility_fu = 1;
	}
}

eligibility_fu;
