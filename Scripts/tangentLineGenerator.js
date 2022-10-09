const allowedXVal = 4; // highest allowed "x =" value
const allowedNumOfTerms = 2; // most amount of terms allowed (+ 2)
const allowedTermSize = 5; // biggest term allowed to be generated
const allowedPowerSize = 4; // highest power allowed to be generated

function generateProblem() {
	var output = "";

	context = Math.floor(Math.random() * allowedXVal) + 1;

	var numOfTerms = Math.floor(Math.random() * allowedNumOfTerms) + 2;
	var constant = (Math.floor(Math.random() * allowedTermSize) - 5).toString();

	var terms = [];
	var powerChance = 1;
	for(var i = 0; i < numOfTerms; i++) {
		var term = Math.floor(Math.random() * allowedTermSize) + 2;
		var termPower = "";
		
		// commonly give a power
		if(Math.random() < powerChance)
			termPower = Math.floor(Math.random() * allowedPowerSize) + 1;
		
		powerChance -= powerChance/numOfTerms;
		
		// randomly make negative
		if(Math.random() < 0.25)
			term *= -1;
		
		terms.push(term + "x" + convertToScript(termPower.toString(), intToExponent));
	}

	// var holders
	var temp = terms;
	terms = [];

	// sort list based on leading coefficient
	while(temp.length > 0) {
		var highest = 0;
		var highestIndex = 0;

		// find highest
		for(var j = 0; j < temp.length; j++) {
			var term = parseInt(temp[j].substring(0, temp[j].indexOf("x")));
			if(highest < term) {
				highest = term;
				highestIndex = j;
			}
		}
		terms.push(temp[highestIndex]);
		temp.splice(highestIndex, 1);
	}

	temp = terms;
	terms = [];

	// sort list based on powers
	while(temp.length > 0) {
		var highest = 0;
		var highestIndex = 0;

		// find highest
		for(var j = 0; j < temp.length; j++) {
			var power = parseInt(convertToScript(temp[j].substring(temp[j].indexOf("x") + 1), exponentToInt));
			if(highest < power) {
				highest = power;
				highestIndex = j;
			}
		}
		terms.push(temp[highestIndex]);
		temp.splice(highestIndex, 1);
	}		

	// at random, delete the constant term.
	if(Math.random() < 0.5 || constant == 0)
		constant = "";
	else 
		terms.push(constant);
	
	// assemble the output
	for(var i = 0; i < terms.length; i++) {
		output += terms[i];

		// check if term is negative
		if( i != terms.length - 1) {
			// to account for if there's no X.
			var xIndex = terms[i + 1].length;
			if(terms[i + 1].indexOf("x") != -1)
				xIndex = terms[i + 1].indexOf("x");
			
			if(parseInt(terms[i + 1].substring(0, xIndex)) < 0) {
				output += " - ";
				terms[i + 1] = terms[i + 1].substring(1);
			} else
				output += " + ";
		}
	}
	return output;
}

function getSolution(input) {
	// create a list of terms, split at + or -
	var terms = input.split(/(?=[+-])/);
	
	// remove spaces and + signs from terms
	for(var i = 0; i < terms.length; i++) {
		terms[i] = terms[i].replace(/\s/g, '');
		terms[i] = terms[i].replace("+", '');
	}

	var derivatives = [];

	// find derivative of each term
	for(var i = 0; i < terms.length; i++) {
		var term = terms[i];
		derivatives.push(solvePowerRule(term));
	}

	var x = context;
	var y = combineTerms(terms, x);
	var m = combineTerms(derivatives, x);
	var b = y - (m * x);

	return "y = " + m + "x + " + b;
}

function combineTerms(input, x) {
	var output = 0;
	var vars = [];
	for(var i = 0; i < input.length; i++) {
		var val = input[i].toString();
		var xIndex = val.length;
		var c = 0;
		var expo = 1;
		
		if(val.indexOf("x") != -1)
		{
			xIndex = val.indexOf("x");
			c = parseInt(val.substring(0, xIndex));
			if(val.length > xIndex + 1)
				expo = parseInt(convertToScript(val.substring(xIndex + 1), exponentToInt));
		} else {
			c = parseInt(val);
			vars.push(c);
			continue;
		}
		
		var term = c * (Math.pow(x, expo));
		vars.push(term);
	}
	
	//console.log("Near Output: " + vars);

	for(var i = 0; i < vars.length; i++)
		output += vars[i];

	return output;
}

function generate() {
	problem = generateProblem();
	solution = getSolution(problem);

	// remember that the problem must ask something along the lines of "what is the tangent line at x = 5?"
	// "for f(x) = problem"
	// "in y=mx+b form"

	console.log("Problem: " + problem);
	console.log("Solution: " + solution);
}

var problem;
var solution;
var context;

function nextCard() {
	generate();

	if(flipped)
		flipCard();

	document.getElementById("context").innerHTML = "What is the tangent line at x = " + context;
    document.getElementById("problem").innerHTML = problem;
    document.getElementById("solution").innerHTML = solution;
}