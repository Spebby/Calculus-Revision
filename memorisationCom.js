function Flashcard(context, front, back) {
    this.context = context;
    this.front = front;
    this.back = back;
}

cards = [];

function loadFlashcards() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/Spebby/Calculus-Revision/main/flashcards.json', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var jsonData = JSON.parse(request.responseText);
            for (var i = 0; i < jsonData.flashcards.length; i++) {
                var card = jsonData.flashcards[i];
                var flashcard = new Flashcard(card.context, card.front, card.back);
                console.log("Flashcard created: " + flashcard.context, flashcard.front, flashcard.back);
                cards.push(flashcard);
            }
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
    var i = Math.floor(Math.random() * cards.length);
    return cards[i];
}

var flashcard = getRandomFlashcard();