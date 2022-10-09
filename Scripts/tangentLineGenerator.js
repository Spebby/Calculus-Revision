function generateProblem() {
	var output = "";

	numOfConstants = Math.floor(Math.random() * 3);

	var firstTerm = Math.floor(Math.random() * 15) + 2;
	var firstTermPower = Math.floor(Math.random() * 8) + 1;

	var secondTerm = "";
	var secondTermPower = "";
	if(Math.random() < 0.75)
	{
		secondTerm = Math.floor(Math.random() * 15) + 2;
		
		// rarely have a second term with a power
		if(Math.random() < 0.25)
			secondTermPower = Math.floor(Math.random() * 3) + 1;
	}
	
	if(numOfConstants > 0)
		for(var i = 0; i < numOfConstants; i++)
			constants.push(Math.floor(Math.random() * 15) + 1);
	
	// randomly make the terms negative
	if(Math.random() < 0.25)
		firstTerm *= -1;
	if(Math.random() < 0.25 && secondTerm != "")
		secondTerm *= -1;
	for(var i = 0; i < constants.length; i++)
		if(Math.random() < 0.25)
			constants[i] *= -1;
	
	// assemble the problem
	var firstTermString = firstTerm + "x" + convertToScript(firstTermPower.toString(), intToExponent);
	
	var secondTermString = "";
	if(secondTerm != "")
		secondTermString = secondTerm + "x" + convertToScript(secondTermPower.toString(), intToExponent); 

			


	console.log("firstTermString: " + firstTermString);
	console.log("secondTermString: " + secondTermString);

	return output;
}

function getSolution(input) {
	var output = "";



	return output; 
}

function generate() {
	problem = generateProblem();
	solution = getSolution(problem);

	console.log("Problem: " + problem);
	console.log("Solution: " + solution);
}

var problem;
var solution;

//#region Power Rule Variables
var numOfConstants = 0;
var constants = [];
//#endregion

setTimeout(function () {
    nextCard();
}, 100);

function nextCard() {
	generate();

	if(flipped)
		flipCard();

    //document.getElementById("problem").innerHTML = problem;
    //document.getElementById("solution").innerHTML = solution;
}