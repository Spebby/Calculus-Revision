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

function convertToScript (input, conversion) {
	if (input <= 1)
		return "";

	var output = "";
	var inputString = input.toString();

	for (var i = 0; i < inputString.length; i++)
		output += conversion[inputString[i]];

	return output;
}