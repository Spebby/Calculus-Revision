class Flashcard {
    constructor(context, front, back) {
        this.context = context;
        this.front = front;
        this.back = back;
    }
}

// create an array of flashcards
var cardArray = [];
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
    var randomIndex = Math.floor(Math.random() * cardArray.length);
    return cardArray[randomIndex];
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
    shuffleSides();
    document.getElementById("context").innerHTML = flashcard.context;
    document.getElementById("frontText").innerHTML = flashcard.front;
    document.getElementById("backText").innerHTML = flashcard.back;
}