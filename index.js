const newDeckBtn = document.getElementById("new-deck_btn")
const drawCardsBtn = document.getElementById("draw-cards_btn")

const cardsContainer = document.getElementById("cards")
const remainingCards = document.getElementById("remaining-cards")
let cardsCount

const gameTitle = document.getElementById("game-title")
let title = "Game of War"
gameTitle.textContent = title

const computerScoreDisplay = document.getElementById("computer-score")
const playerScoreDisplay = document.getElementById("my-score")
computerScore = 0
playerScore = 0

let deckId 
drawCardsBtn.disabled = true

async function handleClick(){
     const response = await fetch ("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
     const data = await response.json()
     deckId = data.deck_id
     cardsCount = data.remaining
     remainingCards.textContent = `Remaining cards: ${cardsCount}`
     drawCardsBtn.disabled = false
    gameTitle.textContent = "Game of War"
    computerScore = 0
    playerScore = 0
    computerScoreDisplay.innerHTML = `Computer score: ${computerScore}`
    playerScoreDisplay.innerHTML = `My score: ${playerScore}`
}

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click",async function(){
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await response.json()
    const cards = data.cards
    for(let i = 0; i < cards.length;i++){
        cardsContainer.children[i].innerHTML = `<img class="card" src ="${cards[i].image}"/>`
    }
    cardsCount -=2
    remainingCards.textContent = `Remaining cards: ${cardsCount}`
    gameTitle.textContent= determineWinner(cards[0],cards[1])
    if(cardsCount === 0){
        if(computerScore > playerScore){
            gameTitle.textContent = "Computer WON the game!"
        }
        else if(playerScore>computerScore){
            gameTitle.textContent = "You WON the game!"
        }
        else(
            gameTitle.textContent = "It's a tie game!"
        )
        drawCardsBtn.disabled = true
    }
})

function determineWinner(card1,card2){
    const valueOptions = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if(card1ValueIndex>card2ValueIndex){
        computerScore++
        computerScoreDisplay.innerHTML = `Computer score: ${computerScore}`
        return "Computer wins!"
    }
    else if (card2ValueIndex>card1ValueIndex){
        playerScore++
        playerScoreDisplay.innerHTML = `My score: ${playerScore}`
        return "You win!"
    }
    else{
        return "War"
    }   
}