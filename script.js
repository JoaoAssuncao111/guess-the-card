let suits = ['Hearts', 'Diamonds','Clubs','Spades']
let values = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']

let deck = [] 
let mainCard = ""
let mainCardSuit = ""
let mainCardValue = ""
let score = 0

let leftButton = document.getElementById('btn1')
let rightButton = document.getElementById('btn2')
let card = document.getElementById('card')
let drawNextCardButton = document.getElementById("drawButton")
let deckLength = document.getElementById("deckLength")
let buttonGroup = document.getElementById("buttonGroup")
let correctAudio = document.getElementById("audio")

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
let isGreaterThanFiveListener = ()=>{parseInt(mainCardValue) <= 5 ? endRound() : guessedGreater()}
let is2Listener = ()=>{}
let is6Listener = ()=> {}
let isJackListener = ()=>{}

leftButton.addEventListener('click',redGuessListener,false)
rightButton.addEventListener('click',blackGuessListener,false)
startGame() 
correctAudio.volume = 0.2

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
    switch(currentLeftLstnr){
        case is2Listener: deleteLowerAppendedButtons(); break
        case is6Listener: deleteGreaterAppendedButtons(); break
        case isJackListener: deleteFigureAppendedButtons(); break
    }
    resetButtonListeners()
    
    draw(deck)
}

function resetButtonListeners(){
    drawNextCardButton.style.visibility = 'hidden'
    guessedSomething(currentLeftLstnr,currentRightLstnr,"Red","Black",redGuessListener,blackGuessListener)   
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
    //add card to history and show result (loss)
    for(button of buttonGroup.childNodes){button.disabled = true}
    flipCard()

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

function guessedLower(){
    is2Listener = ()=>{mainCardValue == '2'? guessedLast() : endRound()}
    let is3Listener = ()=>{mainCardValue == '3'? guessedLast() : endRound()}
    let is4Listener = ()=>{mainCardValue == '4'? guessedLast() : endRound()}
    let is5Listener = ()=>{mainCardValue == '5'? guessedLast() : endRound()}
    
    guessedSomething(isFiveOrLowerListener,isGreaterThanFiveListener,"2","3",is2Listener,is3Listener)
    appendButtonToGroup("4",is4Listener)
    appendButtonToGroup("5",is5Listener)
}
function guessedGreater(){
    is6Listener = ()=>{mainCardValue == '6'? guessedLast() : endRound()}
    let is7Listener = ()=>{mainCardValue == '7'? guessedLast() : endRound()}
    let is8Listener = ()=>{mainCardValue == '8'? guessedLast() : endRound()}
    let is9Listener = ()=>{mainCardValue == '9'? guessedLast() : endRound()}
    let is10Listener = ()=>{mainCardValue == '10'? guessedLast() : endRound()}
    guessedSomething(isFiveOrLowerListener,isGreaterThanFiveListener,"6","7",is6Listener,is7Listener)
    appendButtonToGroup("8",is8Listener)
    appendButtonToGroup("9",is9Listener)
    appendButtonToGroup("10",is10Listener)
}

function guessedFigure(){
    isJackListener = ()=>{mainCardValue == 'Jack'? guessedLast() : endRound()}
    let isQueenListener = ()=>{mainCardValue == 'Queen'? guessedLast() : endRound()}
    let isKingListener = ()=>{mainCardValue == 'King'? guessedLast() : endRound()}
    let isAceListener = ()=>{mainCardValue == 'Ace'? guessedLast() : endRound()}
    guessedSomething(isNumberListener,isFigureListener,"Jack","Queen",isJackListener,isQueenListener)
    appendButtonToGroup("King", isKingListener)
    appendButtonToGroup("Ace",isAceListener)
}

function guessedLast(){
    //score++
    correctAudio.play()
    endRound()

}
function appendButtonToGroup(text,listener){
    const btn = document.createElement("BUTTON")
    btn.innerHTML = text;
    btn.classList.add("button")
    btn.id = text
    buttonGroup.appendChild(btn)
    btn.addEventListener('click',listener,false)
}

function deleteFigureAppendedButtons(){document.getElementById("King").remove();document.getElementById("Ace").remove()}
function deleteLowerAppendedButtons(){document.getElementById("4").remove();document.getElementById("5").remove()}

function deleteGreaterAppendedButtons(){
    document.getElementById("8").remove()
    document.getElementById("9").remove()
    document.getElementById("10").remove()
}


function isHearts(){return(mainCardSuit == 'Hearts')}

function isSpades(){return(mainCardSuit == 'Spades')}

function flipCard(){
    
    let frontCard = document.getElementById("frontCard")
    frontCard.style.content =`url(resources/${mainCardSuit}/${mainCardValue}.png)`
    card.classList.remove("drawAnimation")
    drawNextCardButton.style.visibility ="visible"
    card.style.transform = "rotateY(180deg)"
    
}


