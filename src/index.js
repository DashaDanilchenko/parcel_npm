import ConfettiGenerator from "confetti-js"

const confettiSettings = { target: 'my-canvas' };
const confetti = new ConfettiGenerator(confettiSettings);
const confettiId = document.querySelector('#my-canvas')

const gameIcon = document.querySelectorAll('.player-container .fa-solid')
const computerIcon = document.querySelectorAll('.player-computer .fa-solid')

const rockComputer = document.querySelector('#rockComp')
const paperComputer = document.querySelector('#paperComp')
const scissorsComputer = document.querySelector('#scissorsComp')
const lizardComputer = document.querySelector('#lizardComp')
const spockComputer = document.querySelector('#spockComp')

const markGamer = document.querySelector('#mark-gamer')
const markComputer = document.querySelector('#mark-computer')

let computerChoice
const resultText = document.querySelector('.result-text')

function activeIcon(arrIcon, choiceIcon) {
    arrIcon.forEach(icon => icon.classList.remove('blue'))
    choiceIcon.classList.add('blue')
}

function countingPoints(mark) {
    let value = Number(mark.innerHTML)
    value++
    mark.innerHTML = value
}

function caseGame(choice) {
    switch (choice) {
        case 1:
             activeIcon(computerIcon, rockComputer)
            choice = 'rock'; break
        case 2:
            activeIcon(computerIcon, paperComputer)
            choice = 'paper'; break 
        case 3:
            activeIcon(computerIcon, scissorsComputer)
            choice = 'scissors'; break
        case 4:
            activeIcon(computerIcon, lizardComputer)
            choice = 'lizard'; break 
        case 5:
            activeIcon(computerIcon, spockComputer)
            choice = 'spock'; break
    }
    computerChoice = choice
}

function randomChoice() {
   let randomNum = Math.ceil(Math.random()*5)
   caseGame(randomNum)
}

function youDraw() {
    resultText.innerHTML = 'Draw!'
    confettiId.classList.add('none')
}

function youWon() {
    resultText.innerHTML = 'Won!'
    countingPoints(markGamer)
    confetti.render()
    confettiId.classList.remove('none')
}

function youLoss() {
    resultText.innerHTML = 'Loss!'
    countingPoints(markComputer)
    confettiId.classList.add('none')
}

function determineWinner(gamer, computer) {
    console.log(gamer, computer)
    gamer ===  'rock' && computer === ('scissors' || 'lizard')  ||
    gamer === 'paper' && computer === ('rock' || 'spock') ||
    gamer === 'scissors' && computer === ('paper' || 'lizard') ||
    gamer === 'lizard' && computer === ('spock' || 'paper') ||
    gamer === 'spock' && computer === ('scissors' || 'rock')? youWon(): youLoss()
}

function comparison(myChoice) {
    if (myChoice !== computerChoice) {
        determineWinner(myChoice, computerChoice)
    }if (myChoice === computerChoice){
        youDraw() 
    }
}

function choice() {
    activeIcon(gameIcon, this)
    randomChoice()
    comparison(this.id)
}

const rock = document.querySelector('#rock')
rock.addEventListener('click', choice)
const paper = document.querySelector('#paper')
paper.addEventListener('click', choice)
const scissors = document.querySelector('#scissors')
scissors.addEventListener('click', choice)
const lizard = document.querySelector('#lizard')
lizard.addEventListener('click', choice)
const spock = document.querySelector('#spock')
spock.addEventListener('click', choice)

const contentLoaded = document.querySelector('.fa-rotate')
contentLoaded.addEventListener('click', ()=> document.location.reload())