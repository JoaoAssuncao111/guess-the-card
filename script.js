let suits = ['Hearts', 'Diamonds','Clubs','Spades']
let values = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']

let deck = [] 
let mainCard = ""
let mainCardSuit = ""
let mainCardValue = ""
const button1Elem = document.getElementById('btn1')
const button2Elem = document.getElementById('btn2')

startGame()
console.log(mainCard)
console.log(isHeart())

button1Elem.addEventListener('click', () => {redGuessListener()})
button2Elem.addEventListener('click',() => {blackGuessListener()})

function fillDeck(){

    for(let suit of suits){
        for(let value of values){
            deck.push(value + " of " + suit)
        }
    }
}

function shuffle(deck){
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function pickACard(deck){
    mainCard = deck.pop()
    mainCardSuit = mainCard.split(" ")[2]
    mainCardValue = mainCard.split(" ")[0]
    
}

function redGuessListener(){
    console.log("listener1")
    if(!(isRed())){ 
        endRound()
        return
    }
    else guessedRedOrBlack()
}

function blackGuessListener(){
    if(isRed()){ 
        endRound()
        return
    }
    else guessedRedOrBlack()
}

function startGame(){
    fillDeck()
    shuffle(deck)
    pickACard(deck)
    
}

function restartGame(){
    let deck = [] 
    let mainCard = ""
    let mainCardSuit = ""
    let mainCardValue = ""
    startGame()
}

function endRound(){
    pickACard(deck)
    //add previous card to history and show result (win or loss)
}

function isNumber(){
    return('0' <= mainCardValue <= '9')
}

function isRed(){
    return(mainCardSuit == 'Hearts' || mainCardSuit == 'Diamonds')
} 

function guessedRedOrBlack(){
    button1Elem.removeEventListener('click',()=>{redGuessListener()},false)
    button2Elem.removeEventListener('click',()=>{blackGuessListener()},false)
    //change button text
    button1Elem.addEventListener('click',()=>{guessedSuit()})
    button2Elem.addEventListener('click',()=> guessedSuit())
}

function guessedSuit(){

}

function isHeart(){
    return(mainCardSuit == 'Hearts')
}

function numberGuess(){
    switch(mainCardValue){
        case '1':
    }
}
function figureGuess(card){}

startGame()