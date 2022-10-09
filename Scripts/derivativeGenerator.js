function generatePowerRule() {
	var exponent = Math.floor(Math.random() * 12) + 1;

	// reset leading constant so numbers don't balloon
	var constant = "";
	if (Math.random() < 0.9) {
		constant = Math.floor(Math.random() * 9) + 2;
		
		if(Math.random() < 0.25)
			constant *= -1;
	}

	return constant + "x" + convertToScript(exponent, intToExponent);
}

function solvePowerRule(input) {
	var output = "";
	var constant = parseInt(input.substring(0, input.indexOf("x")));
	var exponent = parseInt(convertToScript(input.substring(input.indexOf("x") + 1), exponentToInt));

	if(input.indexOf("x") == -1)
		return 0;

	// pains me to write an else if statement. I could probably have gotten around it but i'm too lazy rn
	if(isNaN(constant)) {
		if(isNaN(exponent))
			return 1;
			
		constant = exponent;
	}
	else if(isNaN(exponent) || exponent - 1 == 0)
		return constant;
	else 
		constant *= exponent;

	exponent -= 1;

	output = constant + "x" + convertToScript(exponent, intToExponent);

	return output; 
}

const numOfChainTerms = 3; // (+2)
function generateChainRule() {
	// chain rule is so applyable that I could make this function rediculously complex. 
	// In the interest of time it's remaining as a stub.
	var output = "";

	var numOfTerms = Math.floor(Math.random() * numOfChainTerms) + 2;
	var terms = [];

	for(var i = 0; i < numOfTerms; i++)
		terms.push(Math.random() < 0.5 ? firstTerm = generatePowerRule() : firstTerm = randomTrigFunction());	

	for(var i = 0; i < terms.length; i++) {
		output += terms[i];
		if(i == terms.length - 1)
			for(var j = 0; j < terms.length; j++)
				output += ")";
		else
			output += "(";
	}

	return output;
}

function randomTrigFunction() {
	var trigFunctions = ["sin", "cos", "tan", "csc", "sec", "cot"];
	var index = Math.floor(Math.random() * trigFunctions.length);

	if(Math.random() < 0.25)
		return "-" + trigFunctions[index];

	return trigFunctions[index];
}

function solveChainRule() {
	return "Not implemented yet";
}

function generateProblem() {
	// originally was going to use a Dict to get a return value, but it wasn't working to my liking. Will have to use a switch as a bandaid fix.
	var type = Math.floor(Math.random() * 3);
	switch(type) {
		case 0:
			problem = generatePowerRule();
			solution = solvePowerRule(problem);
			break;
		case 1:
			problem = generateChainRule();
			solution = solveChainRule(problem);
			break;
		case 2:
			problem = generatePowerRule();
			solution = solvePowerRule(problem);
			break;
		default:
			problem = generatePowerRule();
			solution = solvePowerRule(problem);
			break;
	}

	console.log("Problem: " + problem);
	console.log("Solution: " + solution);
}

var problem;
var solution;

setTimeout(function () {
    nextCard();
}, 100);


function nextCard() {
	generateProblem();

	if(flipped)
		flipCard();

    document.getElementById("problem").innerHTML = problem;
    document.getElementById("solution").innerHTML = solution;
}