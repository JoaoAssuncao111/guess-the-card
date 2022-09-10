let suits = ['Hearts', 'Diamonds','Clubs','Spades']
let values = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']

let deck = [] 
let mainCard = ""
let mainCardSuit = ""
let mainCardValue = ""

let leftButton = document.getElementById('btn1')
let rightButton = document.getElementById('btn2')
let drawNextCardButton = document.getElementById("drawButton")
let deckLength = document.getElementById("deckLength")
let buttonGroup = document.getElementById("buttonGroup")


let redGuessListener = () =>{isRed ? guessedRed(): endRound()}
let blackGuessListener = ()=>{isRed? endRound : guessedBlack()}

//You can only ever guess from suits that belong to the same color 
let isSpadesListener = ()=> {isSpades() ? guessedBlackSuit() : endRound()}
let isClubsListener = ()=>{isSpades() ? endRound(): guessedBlackSuit()}
let isHeartsListener = function isHeartsGuess(){isHearts() ?  guessedRedSuit() : endRound()}
let isDiamondsListener = function isDiamondsGuess(){!isHeartsGuess()}
let isNumberListener = function isNumberGuess(){isNumber() ? guessedNumber() : endRound()}
let isFigureListener = function isFigureGuess(){isNumber() ? endRound : guessedFigure()}


leftButton.addEventListener('click',redGuessListener)
rightButton.addEventListener('click',blackGuessListener,false)
startGame() 
console.log(mainCard)

drawNextCardButton.addEventListener('click',() => {drawNextCard()})



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

function draw(deck){
    if(deck.length == 0) deckFinished()
    mainCard = deck.pop()
    mainCardSuit = mainCard.split(" ")[2]
    mainCardValue = mainCard.split(" ")[0]
    deckLength.innerHTML = `Your deck has ${deck.length} cards left.`
}

function drawNextCard(){
    
    resetButtonListeners()
    leftButton.addEventListener('click', redGuessListener)
    rightButton.addEventListener('click',blackGuessListener)
}

function resetButtonListeners(){
    drawNextCardButton.style.visibility = 'hidden'
    leftButton.textContent = "Red"
    rightButton.textContent = "Black"
    
    leftButton.replaceWith(leftButton.cloneNode(true));
    rightButton.replaceWith(rightButton.cloneNode(true));
    
}

function startGame(){
    
    fillDeck()
    shuffle(deck)
    draw(deck)
    deckLength.innerHTML = `Your deck has ${deck.length} cards left.`
    
}

function restartGame(){
     deck = [] 
     mainCard = ""
     mainCardSuit = ""
     mainCardValue = ""
     
   
    startGame()
}

function endRound(){
    //draw(deck)
    //add previous card to history and show result (win or loss)
    drawNextCardButton.style.visibility ="visible"
}

function deckFinished(){
    //End game, thanks for playing
}

function isNumber(){
    return(mainCardValue.length <= 2)
}

function isRed(){
    return(mainCardSuit == 'Hearts' || mainCardSuit == 'Diamonds')
} 


function guessedBlack(){
    leftButton.removeEventListener('click',redGuessListener,false)
    rightButton.removeEventListener('click',blackGuessListener,false)
    leftButton.textContent = "Spades"
    rightButton.textContent = "Clubs"
    leftButton.addEventListener('click',isSpadesListener)
    rightButton.addEventListener('click',isClubsListener)
}

function guessedRed(){
    leftButton.removeEventListener('click',redGuessListener,false)
    rightButton.removeEventListener('click',blackGuessListener,false)
    leftButton.textContent = "Hearts"
    rightButton.textContent = "Diamonds"
    leftButton.addEventListener('click',isHeartsListener)
    rightButton.addEventListener('click',isDiamondsListener)
}


function guessedRedSuit(){
    leftButton.removeEventListener('click',()=>{isHeartsOrSpadesListener()},false)
    rightButton.removeEventListener('click',()=>{isDiamondsOrClubsListener()},false)
    leftButton.textContent = "Number"
    rightButton.textContent = "Figure"
    leftButton.addEventListener('click',()=>{isNumberListener()},false)
    rightButton.addEventListener('click',()=>{isFigureListener()},false)
}
function guessedBlackSuit(){
    leftButton.removeEventListener('click',()=>{isHeartsOrSpadesListener()},false)
    rightButton.removeEventListener('click',()=>{isDiamondsOrClubsListener()},false)
    leftButton.textContent = "Number"
    rightButton.textContent = "Figure"
    leftButton.addEventListener('click',()=>{isNumberListener()},false)
    rightButton.addEventListener('click',()=>{isFigureListener()},false)
}



function guessedNumber(){
    leftButton.removeEventListener('click',()=>{isNumberListener()},false)
    rightButton.removeEventListener('click',()=>{isFigureListener()},false)
    leftButton.textContent = "<=5"
    rightButton.textContent = ">5"
    leftButton.addEventListener('click', ()=> {isFiveOrLowerListener()},false)
    rightButton.addEventListener('click',()=>{isGreaterThanFiveListener()},false)
}

function guessedFigure(){
    leftButton.removeEventListener('click',()=>{isNumberListener()},false)
    rightButton.removeEventListener('click',()=>{isFigureListener()},false)
    //transformFourButtons()

}

function isFiveOrLowerListener(){
    if(parseInt(mainCardValue) > 5){
        endRound()
    }
    else guessedLower()
}

function isGreaterThanFiveListener(){
    if(parseInt(mainCardValue) <= 5){
        endRound()
}
    else guessedGreater()
}
function guessedLower(){
    leftButton.removeEventListener('click',()=>{isFiveOrLowerListener()},false)
    rightButton.removeEventListener('click',()=>{isGreaterThanFiveListener()},false)
    //
}
function guessedGreater(){
    leftButton.removeEventListener('click',()=>{isFiveOrLowerListener()},false)
    rightButton.removeEventListener('click',()=>{isGreaterThanFiveListener()},false)
    //
}

function guessesSomething(removeLeftLstnr,removeRightLstnr,leftText,rightText,addLeftLstnr,addRightLstnr){
    leftButton.removeEventListener('click',removeLeftLstnr,false)
    rightButton.removeEventListener('click',removeRightLstnr,false)
    leftButton.textContent = leftText
    rightButton.textContent = rightText
    leftButton.addEventListener('click',addLeftLstnr,false)
    rightButton.addEventListener('click',addRightLstnr,false)
}
function isHearts(){
    return(mainCardSuit == 'Hearts')
}

function isSpades(){
    return(mainCardSuit == 'Spades')
}
