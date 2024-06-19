'use strict'

const questionTime = 60
let questionTimeout = questionTime

const questionsList = [
    {
        question: 'Прямая пересекает плоскость "x" в точке А и образует с этой плоскостью угол 30 градусов. Точка В лкжит на прямой z, причем АВ=6√6. Найдите длину проекции отрезка АВ на плоскость "x".',
        answers:[
            '6√2',
            '3√6',
            '9√3',
            '9√2',
            '9√6',
        ],
        right: 3
    },

    {
        question: 'Велосипедист за 5ч проехал 52км. За какое время (в минутах) велосипедист преодолеет в полтора раза больший путь, если будет двигаться с той же скоростью?',
        answers:[
            '390 минут',
            '210 минут',
            '360 минут',
            '450 минут'
        ],
        right: 3 
    },
  
   {
        question: 'Площади двух участковполя находятся в отношении 3:8. Какова площадь (в гектарах) меньшегоучастка поля, если общая площадь двух участков равна 682 га?',
        answers:[
            '171 га',
            '86 га',
            '186 га',
            '227 га'
        ],
        right: 2
    },

       {
        question: 'МК - диаметр, О - центр окружности, угол NOM = 128 градусов, на вписанной окружности есть точка N. Градусная мера вписанного угла NKM равна:',
        answers:[
            '68 градусов',
            '32 градуса',
            '52 градуса',
            '64 градуса'
        ],
        right: 3
    },
]

questionsList.sort( arrayRandomSort )
function arrayRandomSort() {
    return Math.random() - 0.5
}

let score = 0
let rightAnswers = 0

let rightText = ''
let answer = ''

let questionCounter = 0
const questionNumber = questionsList.length

const startButton = document.querySelector('.start')

const gameContainer = document.querySelector('#game-container')

const divInfo = document.querySelector('#info')
const qNumberSpan = document.querySelector('#q-number')
const qAllSpan = document.querySelector('#q-all')
const qTimerSpan = document.querySelector('#q-timer')
const divQuestion = document.querySelector('.question')

const divAns1 = document.querySelector('#ans1')
const divAns2 = document.querySelector('#ans2')
const divAns3 = document.querySelector('#ans3')
const divAns4 = document.querySelector('#ans4')

const divResult = document.querySelector('#result')
const spanScore = document.querySelector('#score')
const spanRight = document.querySelector('#rightCount')

const answers = [divAns1, divAns2, divAns3, divAns4]
const answerSpans = [
    divAns1.querySelector('span'),
    divAns2.querySelector('span'),
    divAns3.querySelector('span'),
    divAns4.querySelector('span'),
]

for(let i = 0; i < answers.length; i++) {
    answers[i].onclick = getAnswerClick
    // answers[i].onclick = function() { getAnswerClick(i) }
}

function getAnswerClick( event ) {
    if (answer) return 

    const divAnswer = event.target
    const spanAnswer = divAnswer.querySelector('span')
        if (spanAnswer) { // проверяем в <div> иои в <span> был клик
        answer = spanAnswer.innerText // достаем текст ответа из <div><span>
    } else {
        answer = divAnswer.innerText // достаем текст ответа из <span>
    }

    if (answer = rightText) {
   
    } else {

    }
}

startButton.onclick = startQuiz

function startQuiz() {
    startButton.style.display = 'none'
    gameContainer.style.display = 'block'
  
    qAllSpan.innerText = questionNumber
    nextQuestion()
}

function updateTimer() {
    if (answer) {
        if(rightText === answer) {
            score += questionTimeout
            rightAnswers = rightAnswers + 1
        }
        return nextQuestion()
    }

    questionTimeout--
    qTimerSpan.innerText = questionTimeout
    if (questionTimeout > 0) {
        setTimeout(updateTimer, 1000)
    } else {
        setTimeout(nextQuestion, 1000)
    }
}

function nextQuestion() {
    answer = ''
    // clearTimeout(questionTimerID)

    questionCounter++
  
    if (questionCounter > questionNumber) {
        return showResults()
    }
  
    questionTimeout = questionTime
    qNumberSpan.innerText = questionCounter
    qTimerSpan.innerText = questionTimeout 

    let question = questionsList.pop()
    rightText = question.answers[ question.right ]

    divQuestion.innerText = question.question

    answerSpans.forEach( (ansSpan, index) => {
        ansSpan.innerText = question.answers[index]
    })
  
    setTimeout(updateTimer, 1000)
}

function showResults() {
    gameContainer.style.display = 'none'

    spanScore.innerText = score
    spanRight.innerText = rightAnswers
    divResult.style.display = 'block'
}