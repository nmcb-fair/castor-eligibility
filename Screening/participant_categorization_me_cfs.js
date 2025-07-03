'##allowempty##';

var category = 0;
var splitted_diag = "{gmh_diagnosis01}".split(';'); // more than one value can be checked
var eligible = false;
var only_covid = false;
var only_lyme = false;
var only_q_fever = false;
var only_no_ms = false;

// General checks
if ({Eligibility_me_cfs} == 1) {
	eligible = true;
}

// only Q Fever
if (splitted_diag.indexOf("3") > -1 && splitted_diag.indexOf("0") == -1 && splitted_diag.indexOf("1") == -1 && splitted_diag.indexOf("2") == -1 && splitted_diag.indexOf("4") == -1 && splitted_diag.indexOf("5") == -1 ) {
	only_q_fever = true;
}

// only Lyme
if (splitted_diag.indexOf("4") > -1 && splitted_diag.indexOf("0") == -1 && splitted_diag.indexOf("1") == -1 && splitted_diag.indexOf("2") == -1 && splitted_diag.indexOf("3") == -1 && splitted_diag.indexOf("5") == -1) {
	only_lyme = true;
}

// only Post/Long COVID
if (splitted_diag.indexOf("5") > -1 && splitted_diag.indexOf("0") == -1 && splitted_diag.indexOf("1") == -1 && splitted_diag.indexOf("2") == -1 && splitted_diag.indexOf("3") == -1 && splitted_diag.indexOf("4") == -1) {
	only_covid = true;
}

// anything but MS
if (splitted_diag.indexOf("2") == -1 && (splitted_diag.indexOf("1") > -1 || splitted_diag.indexOf("3") > -1 || splitted_diag.indexOf("4") > -1 || splitted_diag.indexOf("5") > -1)) {
	only_no_ms = true;
}


// Checking category
if (eligible &&	{dsqsf_cdc_v2} == 0 && {dsqsf_ccc_v1} == 0 && {dsqsf_iom_v1} == 0 && splitted_diag.indexOf("0") > -1) {
	category = 1; // healthy control
}

if (eligible &&	splitted_diag.indexOf("6") > -1) {
	category = 1; // healthy control
}

if (eligible && ({dsqsf_cdc_v2} == 1 || {dsqsf_ccc_v1} == 1 || {dsqsf_iom_v1} == 1) && only_no_ms) {
	category = 2; // ME/CFS
}

if (eligible && only_covid && {gmh_lc} == 1) {
	category = 3; // Post/Long COVID
}

if (eligible &&	only_lyme && {gmh_lyme_tx} == 1 && {gmh_lyme_ptlds} == 1) {
	category = 4; // Lyme
}

if (eligible && only_q_fever && {gmh_qfs} == 1) {
	category = 5; // Q Fever
}

if (eligible && splitted_diag.indexOf("2") > -1) {
	category = 6; // MS
}

if (eligible && category == 0) {
	category = 7; // To be determined
}

// "print" result of categorization
category;
