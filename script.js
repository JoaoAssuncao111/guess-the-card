let suits = ['Hearts', 'Diamonds','Clubs','Spades']
let values = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']

let deck = []

let mainCard = ""
let mainCardSuit = ""
let mainCardValue = ""

function fillDeck(){
    for(let suit of suits){
        for(let value of values){
            deck.push(value + " of " + suit)
        }
    }
}

function shuffle(deck){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function pickACard(deck){
    //TODO add previous mainCard to history
    mainCard = deck.pop
    //TODO set main card image to actual card
    
}

function isNumber(card){
    return('0' <= card[0] <= '9')
}

function isRed(card){
    const suit = card.split(" ")[1]
    return(suit[0] == 'H' || suit[0] == 'D')
}

function isHeart(card){
    const suit = card.split(" ")[1]
}

function numberGuess(){}
function figureGuess(){}