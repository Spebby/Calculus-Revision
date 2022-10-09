
const intToExponent = {
	"0": "⁰",
	"1": "¹",
	"2": "²",
	"3": "³",
	"4": "⁴",
	"5": "⁵",
	"6": "⁶",
	"7": "⁷",
	"8": "⁸",
	"9": "⁹",
};
const exponentToInt = {
	"⁰": "0",
	"¹": "1",
	"²": "2",
	"³": "3",
	"⁴": "4",
	"⁵": "5",
	"⁶": "6",
	"⁷": "7",
	"⁸": "8",
	"⁹": "9",
};

function convertToScript(input, script) {
	if(input <= 1)
		return "";
	
	var output = "";
	var inputString = input.toString();

	for (var i = 0; i < inputString.length; i++)
		output += script[inputString[i]];
	
	return output;
}

function generatePowerRule() {
	var leadingConstant = "";
	var exponent = Math.floor(Math.random() * 12) + 1;
	var output = "";

	if (Math.random() < 0.5)
		leadingConstant = Math.floor(Math.random() * 9) + 1;

	output = leadingConstant + "x" + convertToScript(exponent, intToExponent);
	return output;
}

function solvePowerRule(input) {
	var output = "";
	var leadingConstant = "";
	var exponent = "";
	
	// check if there is a leading constant
	if(input[0] != "x") {
		for (var i = 0; i < input.length; i++) {
			if (input[i] == "x")
				break;

			leadingConstant += input[i];
		}
	}
	else 
		leadingConstant = 1;
	

	if (input[input.indexOf("x") + 1] != null) {
		for (var i = input.length - 1; i >= 0; i--) {
			if (input[i] == "x")
				break;
			exponent = input[i] + exponent;
		}
	}
	else 
		exponent = "¹";

	leadingConstant = parseInt(leadingConstant);
	exponent = parseInt(convertToScript(exponent, exponentToInt));

	leadingConstant *= exponent;
	if(leadingConstant == 0)
		leadingConstant = "";

	exponent -= 1;
	if(exponent == 0)
		return "1";

	output = leadingConstant + "x" + convertToScript(exponent, intToExponent);

	return output; 
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
			problem = generatePowerRule();
			solution = solvePowerRule(problem);
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


flipped = false;
function showAnswer() {
    if (flipped) {
        document.getElementById("front").style.display = "block";
        document.getElementById("back").style.display = "none";
        flipped = false;
    } else {
        document.getElementById("front").style.display = "none";
        document.getElementById("back").style.display = "block";
        flipped = true;
    }
}

function nextCard() {
	generateProblem();

    document.getElementById("problem").innerHTML = problem;
    document.getElementById("solution").innerHTML = solution;
}