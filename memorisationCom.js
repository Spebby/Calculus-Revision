function Flashcard(context, front, back) {
    this.context = context;
    this.front = front;
    this.back = back;
}

// create an array of flashcards
var cardArray = [];

function loadFlashcards() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/Spebby/Calculus-Revision/main/flashcards.json', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            jsonData = JSON.parse(request.responseText)
            for (var i = 0; i < jsonData.flashcards.length; i++) {
                var card = jsonData.flashcards[i];
                var flashcard = new Flashcard(card.context, card.front, card.back);
                console.log("Flashcard created: " + card.context, card.front, card.back);
                cardArray.push(flashcard);
            }
            console.log("Flashcards loaded: " + cardArray.length);
        } else {
            // We reached our target server, but it returned an error
            console.log("Error loading flashcards");
        }
    };
    request.onerror = function() {
        // There was a connection error of some sort
        console.log("Error loading flashcards");
    };
    request.send();
}

function getRandomFlashcard() {
    var randomIndex = Math.floor(Math.random() * cardArray.length);
    return cardArray[randomIndex];
}

loadFlashcards();

// wait for the flash cards to be generated 
setTimeout(function() {
    var flashcard = getRandomFlashcard();
    document.getElementById("context").innerHTML = flashcard.context;
    document.getElementById("front").innerHTML = flashcard.front;
    document.getElementById("back").innerHTML = flashcard.back;
}, 1000);