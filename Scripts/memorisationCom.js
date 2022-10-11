class Flashcard {
    constructor(context, front, back) {
        this.context = context;
        this.front = front;
        this.back = back;
    }
}
var backUpFlashcard = new Flashcard("No Avalible Flashcards", "Change your settings!", "Change your settings!");

// create an array of flashcards
var cardArray = [];
var remainingCards = [];
jsonRetrived = false;

function loadFlashcards() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/Spebby/Calculus-Revision/main/flashcards.json', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 500) {
            // Success!
            jsonRetrived = true;
            jsonData = JSON.parse(request.responseText)
            for (var i = 0; i < jsonData.flashcards.length; i++) {
                var card = jsonData.flashcards[i];
                var flashcard = new Flashcard(card.context, card.front, card.back);
                //console.log("Flashcard created: " + card.context, card.front, card.back);
                cardArray.push(flashcard);
            }
        } else {
            // We reached our target server, but it returned an error
            console.log("Error loading flashcards");
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
        console.log("Error loading flashcards");
    };
    request.send();
}

function getRandomFlashcard() {
    if(!allowRepeatCards && remainingCards.length == 0)
        remainingCards = cardArray;

    // fill the repeat array. if allowing repeat cards, this will be the entire card array
    if(allowRepeatCards == false)
        filteredArray = remainingCards;
    else
        filteredArray = cardArray;

    // filter the array based on the settings. this is probably the worst way to do this
    if (allowDerivatives == false)
        filteredArray = filteredArray.filter(card => card.context != "Derivatives");
    if (allowDerivativeRules == false)
        filteredArray = filteredArray.filter(card => card.context != "Derivative Rules");
    if (allowDefinitions == false)
        filteredArray = filteredArray.filter(card => card.context != "Definitions");
    if (allowTrigIdentities == false)
        filteredArray = filteredArray.filter(card => card.context != "Trig Identities");
    if (allowLimitLaws == false)
        filteredArray = filteredArray.filter(card => card.context != "Limit Laws");
    
    if(filteredArray.length == 0)
        return backUpFlashcard;

    var randomIndex = Math.floor(Math.random() * filteredArray.length);
    var randomCard = filteredArray[randomIndex];

    if(!allowRepeatCards)
        remainingCards.splice(remainingCards.indexOf(randomCard), 1);

    return randomCard;
}

// shuffles the fronts and backs of cards
function shuffleSides() {
    for (var i = 0; i < cardArray.length; i++)
        if (Math.random() < 0.5)
            [cardArray[i].front, cardArray[i].back] = [cardArray[i].back, cardArray[i].front];

    document.getElementById("frontText").innerHTML = flashcard.front;
    document.getElementById("backText").innerHTML = flashcard.back;
}

loadFlashcards();

// add a settings option that allows to user to choose various things
// if the cards should be shuffled or not
// broad categories of cards to be shown
// more specific categories of cards to be shown
// if the cards should be shown in a random order or not
// if the above should the flashcards loop? (allowing this when random will be hard to implement)

// wait for the flash cards to be generated 
var flashcard = new Flashcard("", "", "");
setTimeout(function () {
    nextCard();
}, 200);

setTimeout(function () {
    if(document.getElementById("context").innerHTML == "Loading..." && jsonRetrived)
        nextCard();
}, 750);

function nextCard() {
    flashcard = getRandomFlashcard();

    if(allowShuffle)
        shuffleSides();
    
    document.getElementById("context").innerHTML = flashcard.context;
    document.getElementById("frontText").innerHTML = flashcard.front;
    document.getElementById("backText").innerHTML = flashcard.back;
}

var allowDerivatives = true;
var allowDerivativeRules = true;
var allowDefinitions = true;
var allowTrigIdentities = true;
var allowLimitLaws = true;
var allowShuffle = true;
var allowRepeatCards = true;

// i would imagine there's a much better way to do this, but I'm not familiar enough with
// HTML's ability to call functions with parameters, so I'm just going to do this for now
function toggleDerivatives() {
    allowDerivatives = !allowDerivatives;
    nextCard();
}
function toggleDerivativeRules() {
    allowDerivativeRules = !allowDerivativeRules;
    nextCard();
}
function toggleDefinitions() {
    allowDefinitions = !allowDefinitions;
    nextCard();
}
function toggleTrigIdentities() {
    allowTrigIdentities = !allowTrigIdentities;
    nextCard();
}
function toggleLimitLaws() {
    allowLimitLaws = !allowLimitLaws;
    nextCard();
}
function toggleShuffle() {
    allowShuffle = !allowShuffle;
    if(flipped)
        flipCard();
}
function toggleRepeatCards() {
    allowRepeatCards = !allowRepeatCards;
}