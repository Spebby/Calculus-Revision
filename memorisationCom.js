import data from './flashcards.json';

// create a struct for the cards


const Cards = {
    context: '',
    front: '',
    back: '',
}

console.log(data);
// create an array of cards
function CreateCards(data) {
    let cards = [];
    for (i in data) {
        let card = Object.create(Cards);
        card.context = i.context;
        card.front = i.front;
        card.back = i.back;
        cards.push(card);
    }
    return cards;
}