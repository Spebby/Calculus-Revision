function generateProblem() {
	var output = "";

	context = Math.floor(Math.random() * 5) + 1;

	var numOfTerms = Math.floor(Math.random() * 3) + 2;
	var constant = (Math.floor(Math.random() * 15) - 5).toString();
	console.log("numofTerms: " + numOfTerms);

	terms = [];
	var powerChance = 1;
	for(var i = 0; i < numOfTerms; i++) {
		var term = Math.floor(Math.random() * 15) + 2;
		var termPower = "";
		
		// commonly give a power
		if(Math.random() < powerChance)
			termPower = Math.floor(Math.random() * 8) + 1;
		
		powerChance -= powerChance/numOfTerms;
		
		// randomly make negative
		if(Math.random() < 0.25)
			term *= -1;
		
		terms.push(term + "x" + convertToScript(termPower.toString(), intToExponent));
	}
	
	// sort list based powers
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

	console.log("post first sort: " + terms);

	// sort list based on powers
	temp = terms;
	terms = [];

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

	console.log("post second sort: " + terms);
			

	if(Math.random() < 0.5 || constant == 0)
		constant = "";
	else 
		terms.push(constant);

	console.log("constant: " + constant)
	console.log("terms: " + terms);
	
	for(var i = 0; i < terms.length; i++) {
		output += terms[i];

		// check if term is negative
		if( i != terms.length - 1) {
			// to account for if there's no X.
			var xIndex = terms[i + 1].length;
			if(terms[i + 1].indexOf("x") != -1)
				xIndex = terms[i + 1].indexOf("x");
			
			if(parseInt(terms[i + 1].substring(0, xIndex)) < 0)
				output += " - ";
			else
				output += " + ";

			// remove negative from next term
			if(parseInt(terms[i + 1].substring(0, xIndex)) < 0)
				terms[i + 1] = terms[i + 1].substring(1);
		}
	}

	console.log(output);

	return output;
}

function getSolution(input) {
	var output = "";



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
	console.log("Context: " + context);
}

var problem;
var solution;
var context;

//#region Power Rule Variables
var terms = [];
//#endregion

setTimeout(function () {
    nextCard();
}, 100);

function nextCard() {
	generate();

	if(flipped)
		flipCard();

	document.getElementById("context").innerHTML = "What is the tangent line at x = " + context;
    document.getElementById("problem").innerHTML = problem;
    document.getElementById("solution").innerHTML = solution;
}