let suits = ['Hearts', 'Diamonds','Clubs','Spades']
let values = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']

let deck = [] 
let mainCard = ""
let mainCardSuit = ""
let mainCardValue = ""

let leftButton = document.getElementById('btn1')
let rightButton = document.getElementById('btn2')
let card = document.getElementById('card')
let drawNextCardButton = document.getElementById("drawButton")
let deckLength = document.getElementById("deckLength")
let buttonGroup = document.getElementById("buttonGroup")

let redGuessListener = () =>{isRed() ? guessedRed() : endRound()}
let blackGuessListener = ()=>{isRed()?  endRound(): guessedBlack()}

let currentLeftLstnr = redGuessListener
let currentRightLstnr = blackGuessListener

//You can only ever guess from suits that belong to the same color 
let isSpadesListener = ()=>{isSpades() ? guessedBlackSuit() : endRound()}
let isClubsListener = ()=>{isSpades() ? endRound(): guessedBlackSuit()}
let isHeartsListener = ()=>{isHearts() ?  guessedRedSuit() : endRound()}
let isDiamondsListener = ()=> {isHearts()? endRound() : guessedRedSuit()}
let isNumberListener = ()=>{isNumber() ? guessedNumber() : endRound()}
let isFigureListener = ()=>{isNumber() ? endRound() : guessedFigure()}
let isFiveOrLowerListener = ()=>{parseInt(mainCardValue) > 5 ? endRound(): guessedLower()}
let isGreaterThanFiveListener = ()=>{parseInt(mainCardValue) <= 5 ? guessedGreater() : endRound()}

leftButton.addEventListener('click',redGuessListener,false)
rightButton.addEventListener('click',blackGuessListener,false)
startGame() 

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
    console.log(mainCard)
    mainCardSuit = mainCard.split(" ")[2]
    mainCardValue = mainCard.split(" ")[0]
    deckLength.innerHTML = `Your deck has ${deck.length} cards left.`
    card.classList.add("drawAnimation")
}

function drawNextCard(){
    card.style.transform = "none"
    leftButton.disabled = false
    rightButton.disabled = false
    resetButtonListeners()
    draw(deck)
}

function resetButtonListeners(){
    drawNextCardButton.style.visibility = 'hidden'
    guessedSomething(currentLeftLstnr,currentRightLstnr,"Red","Black",redGuessListener,blackGuessListener)
    currentLeftLstnr = redGuessListener
    currentRightLstnr = blackGuessListener    
}

function startGame(){
    fillDeck()
    shuffle(deck)
    draw(deck)
}

function restartGame(){
     deck = [] 
     mainCard = ""
     mainCardSuit = ""
     mainCardValue = ""
    startGame()
}

function endRound(){
    //add previous card to history and show result (win or loss)

    let frontCard = document.getElementById("frontCard")
    frontCard.style.content =`url(resources/${mainCardSuit}/${mainCardValue}.png)`
    card.classList.remove("drawAnimation")
    drawNextCardButton.style.visibility ="visible"
    card.style.transform = "rotateY(180deg)"
    leftButton.disabled = true
    rightButton.disabled = true


}

function deckFinished(){//End game, thanks for playing
}

function isNumber(){ return(mainCardValue.length <= 2)}

function isRed(){return(mainCardSuit == 'Hearts' || mainCardSuit == 'Diamonds')} 
//Every time a guess is made the listeners and button text need to be updated
function guessedSomething(removeLeftLstnr,removeRightLstnr,leftText,rightText,addLeftLstnr,addRightLstnr){
    leftButton.removeEventListener('click',removeLeftLstnr,false)
    rightButton.removeEventListener('click',removeRightLstnr,false)
    leftButton.textContent = leftText
    rightButton.textContent = rightText
    leftButton.addEventListener('click',addLeftLstnr,false)
    rightButton.addEventListener('click',addRightLstnr,false)
    currentLeftLstnr = addLeftLstnr
    currentRightLstnr = addRightLstnr
}

function guessedBlack(){guessedSomething(redGuessListener,blackGuessListener,"Spades","Clubs",isSpadesListener,isClubsListener)}

function guessedRed(){guessedSomething(redGuessListener,blackGuessListener,"Hearts","Diamonds",isHeartsListener,isDiamondsListener)}

function guessedRedSuit(){guessedSomething(isHeartsListener,isDiamondsListener,"Number","Figures",isNumberListener,isFigureListener)}

function guessedBlackSuit(){guessedSomething(isSpadesListener,isClubsListener,"Number","Figure",isNumberListener,isFigureListener)}

function guessedNumber(){guessedSomething(isNumberListener,isFigureListener,"<= 5","> 5",isFiveOrLowerListener,isGreaterThanFiveListener)}

function guessedFigure(){
    leftButton.removeEventListener('click',()=>{isNumberListener()},false)
    rightButton.removeEventListener('click',()=>{isFigureListener()},false)
    //transformFourButtons()

}

function guessedLower(){
    leftButton.removeEventListener('click',()=>{isFiveOrLowerListener()},false)
    rightButton.removeEventListener('click',()=>{isGreaterThanFiveListener()},false)
    //transformFourButtons
}
function guessedGreater(){
    leftButton.removeEventListener('click',()=>{isFiveOrLowerListener()},false)
    rightButton.removeEventListener('click',()=>{isGreaterThanFiveListener()},false)
    //transformFiveButtons
}
function isHearts(){return(mainCardSuit == 'Hearts')}

function isSpades(){return(mainCardSuit == 'Spades')}


