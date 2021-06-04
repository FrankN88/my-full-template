/*
let quiz = {
  data: [
  {
    q : "What is the approximated measure of the speed of light?",
    o : [
      "500 thousand meters/second",
      "300 thousand meters/second",
      "100 thousand meters/second",
      "400 thousand meters/second"
    ],
    a : 1 
  },
  {
    q : "How many elements there are in the periodic table of elements?",
    o : [
      "150",
      "200",
      "136",
      "118"
    ],
    a : 3
  },
  {
    q : "What is the formula of gravity of Earth?",
    o : [
      "g= 35 k s-2",
      "g= 9.81 m m-2",
      "g= 9.81 m s-2",
      "g= 25 m s-2"
    ],
    a : 2
  },
  {
    q : "Which is the seventh planet from the sun?",
    o : [
      "Uranus",
      "Earth",
      "Pluto",
      "Mars"
    ],
    a : 0
  },
  {
    q : "Which is the unit of measure of the magnetic field?",
    o : [
      "G",
      "Watt",
      "Candela",
      "Gauss"
    ],
    a : 3
  }
  ],

  // HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // GAME FLAGS
  current: 0, // current question
  result: 0, // result

  // INIT QUIZ HTML
  init: function(){
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizBox");

    // QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // GO!
    quiz.draw();
  },

  // DRAW QUESTION
  draw: function(){
   
    quiz.hQn.innerHTML = quiz.data[quiz.current].q;

    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.current].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.current].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },
  
  // OPTION SELECTED
  select: function(){
    // DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.current].a;
    if (correct) { 
      quiz.result++; 
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }
  
    // NEXT QUESTION OR END GAME
    quiz.current++;
    setTimeout(function(){
      if (quiz.current < quiz.data.length) { quiz.draw(); } 
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.result} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  }
};
window.addEventListener("load", quiz.init); */

const answersTrackerContainer = document.querySelector(".answers-tracker")
const options = document.querySelector(".options").children
const questionNumberSpan = document.querySelector(".question-num-value")
const question=document.querySelector(".question")
const totalQuestionsSpan =document.querySelector(".total-questions")
const correctAnswersSpan =document.querySelector(".correct-answers")
const totalQuestionsSpan2 =document.querySelector(".total-questions2")
const percentageSpan =document.querySelector(".percentage")

let currentIndex;
let index = 0;
let answeredQuestions =[]; // array of anwered question indexes
let score = 0;

const opt1 = document.querySelector(".option1")
const opt2 = document.querySelector(".option2")
const opt3 = document.querySelector(".option3")
const opt4 = document.querySelector(".option4")

const questions = [
    {
        q:'What is the approximated measure of the speed of light?"?',
        options:['300 thousand meters/second', '500 thousand meters/second', '200 thousand meters/second', '250 thousand meters/second'],
        answer:0
    },
    {
        q:'How many elements there are in the periodic table of elements?',
        options:['120', '118', '215', '230'],
        answer:1
    },
    {
        q:'What is the unit of measure of the magnetic field?',
        options:['G', 'Watt', 'Gauss', 'Candela'],
        answer:2
    }
]

totalQuestionsSpan.innerHTML = questions.length

function load(){
    questionNumberSpan.innerHTML = index + 1
    question.innerHTML = questions[currentIndex].q;
    opt1.innerHTML = questions[currentIndex].options[0]    
    opt2.innerHTML = questions[currentIndex].options[1]
    opt3.innerHTML = questions[currentIndex].options[2]
    opt4.innerHTML = questions[currentIndex].options[3]
    index++
}

//Check if selected answer is correct or wrong
function check(element){
    if(element.id == questions[currentIndex].answer){
        element.className="correct"
        updateAnswersTracker("correct")
        score++
    }
    else {
        element.className="wrong"
        updateAnswersTracker("wrong")
    }
    disableClick();
}

//Make sure the user selected an item before clicking on the Next button
function validate(){
    if(!options[0].classList.contains("disabled")){
        alert("Please select an option")
    }
    else{
        randomQuestion();
        enableClick();
    }
}

//Listener function for click event on Next button
function next(){
    validate();
}

//Function to disable click for the options
function disableClick(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled")

        if(options[i].id == questions[currentIndex].answer){
            options[i].classList.add('correct');
        }
    }
}

//Function to reanable click in the options
function enableClick(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong")

    }
}

//Function to select a random question
function randomQuestion(){
    let randomNumber = Math.floor(Math.random()*questions.length);
    if(index == questions.length){
        quizOver();
    }
    else{
        if(answeredQuestions.length > 0){
            if(answeredQuestions.includes(randomNumber)){
                randomQuestion();
            }
            else {
                currentIndex = randomNumber;
                load();
            }
        }
        if(answeredQuestions.length == 0){
            currentIndex = randomNumber
            load()
        }
        //add the question to list of anwered questions
        answeredQuestions.push(randomNumber)
    }
}

//Restart the quiz
window.onload=function(){
    this.randomQuestion();
    this.answersTracker();
}

//Set up answers tracker elements
function answersTracker(){
    for(let i=0; i< questions.length; i++){
        const div =document.createElement("div")
        answersTrackerContainer.appendChild(div);
    }
}

//Update the answers tracker elements
function updateAnswersTracker(newClass){
    answersTrackerContainer.children[index -1].classList.add(newClass)
}

//Displays the quiz-over page if quiz is over
function quizOver(){
    document.querySelector(".quiz-over").classList.add("show")
    correctAnswersSpan.innerHTML = score;
    totalQuestionsSpan2.innerHTML = questions.length
    percentageSpan.innerHTML=Math.round((score/questions.length)*100) + "%"
}

function tryAgain(){
    window.location.reload();
}