
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
	exponent = Math.floor(Math.random() * 12) + 1;
	var output = "";

	// reset leading constant so numbers don't balloon
	leadingConstant = 1;
	if (Math.random() < 0.5)
		leadingConstant = Math.floor(Math.random() * 9) + 1;

	output = leadingConstant + "x" + convertToScript(exponent, intToExponent);
	return output;
}

function solvePowerRule(input) {
	var output = "";

	if(exponent == 1)
		return leadingConstant;

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

//#region Power Rule Variables
var leadingConstant = 1;
var exponent = 1;
//#endregion

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