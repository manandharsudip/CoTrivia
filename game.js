const queCount = document.querySelector(".que-count");
const vQuestion = document.querySelector(".question-ele");
const buttonA = document.querySelector(".classA");
const buttonB = document.querySelector(".classB");
const buttonC = document.querySelector(".classC");
const buttonD = document.querySelector(".classD");
const myUserScore = JSON.parse(localStorage.getItem('userScores')) || [];
const cMode = sessionStorage.getItem('cMode') || "Easy";
const modeH = document.querySelector('#mode');

modeH.textContent = cMode;
const myObj = { "Easy": './Questions/questions.json', "Medium": './Questions/questionsM.json', "Hard": './Questions/questionsH.json' };

let rightAnswer;
let scoreCount = 0;
let questionCount = 1;
let queArray = [];


// Question drawing Logic
// fetch the questions from the questions directory according to mode selected else selects easy mode
// Random question is draws from the choose mode
// no repeatation of question though we draw random questions
// questions index is stored in array and check if it exists in array while drawing
// if array consists the array while loop is executed until unique question is selected
//if user sucessfully answers all question, redirection towards leaderboard.

async function questions() {
    const res = await fetch(myObj[cMode]);
    const data = await res.json();
    console.log(data);
    let queVal = Math.floor(Math.random() * 10);

    while (queArray.includes(queVal)) {
        queVal = Math.floor(Math.random() * 10);
        // console.log("old question recievedValue detected")
        if (queArray.length >= 10) {
            alert("Congratulations !! You Win !!")
            window.location = "leaderboard.html";
            break;
        }
    }
    queArray.push(queVal);
    const fetchedData = data[queVal];
    return fetchedData;
}

// button color reset
function reset() {
    buttonA.style.background = "#ffffff";
    buttonB.style.background = "#ffffff";
    buttonC.style.background = "#ffffff";
    buttonD.style.background = "#ffffff";
}

// disable buttons
function disableButtons() {
    buttonA.disabled = true;
    buttonB.disabled = true;
    buttonC.disabled = true;
    buttonD.disabled = true;
}


// score updating Logic
// check if user has already played before or not
// if user found then score is updated based on if currently user has scored most that previously.
// else new scored points is stored.

function updateScore(scoreCount) {
    const userData = JSON.parse(userDataString);
    let myCurrentUser = userData.username;
    const user = myUserScore.find(user => user.myCurrentUser === myCurrentUser);

    if (user) {
        if (user.scoreCount < scoreCount) {
            user['scoreCount'] = scoreCount;
        }
    } else {
        myUserScore.push({ myCurrentUser, scoreCount });
    }

    localStorage.setItem('userScores', JSON.stringify(myUserScore));
}


// Button Color Changing Logic
// if button is pressed yellow color is displayed
// if pressed button is correct then green is displayed and redirect to next question
// if pressed button is wrong then red color is displayed and correct answer is showed and gives options to restart

function handleBtn(recievedValue) {
    let clickedClass = 'class' + recievedValue;
    let rightClass = 'class' + rightAnswer;
    // console.log("Submitted Answer: ", recievedValue);

    document.querySelector(`.${clickedClass}`).style.background = "yellow";

    if (rightAnswer === recievedValue) {
        setTimeout(function () {
            document.querySelector(`.${rightClass}`).style.background = "green";
            scoreCount++;
            // updateScore(scoreCount);
        }, 1000);

        setTimeout(function () {
            questions().then(
                (fetchedData) => {
                    reset();
                    queCount.textContent = questionCount;
                    vQuestion.textContent = fetchedData.question;
                    buttonA.textContent = fetchedData.A;
                    buttonB.textContent = fetchedData.B;
                    buttonC.textContent = fetchedData.C;
                    buttonD.textContent = fetchedData.D;
                    rightAnswer = fetchedData.answer;
                    // console.log("Question Count: ", questionCount);
                    console.log("Right Answer: ", rightAnswer);
                    questionCount++;
                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }, 2000);
    } else {
        setTimeout(function () {
            document.querySelector(`.${clickedClass}`).style.background = "red";
            document.querySelector(`.${rightClass}`).style.background = "green";
            disableButtons()

            // updateScore(scoreCount);
        }, 1000);

        setTimeout(function () {
            if (confirm("Game Over ! Do you want to restart the Game?") == true) {
                location.reload();
            } else {
                window.location = "home.html";
            }
        }, 2000);
    }
    setTimeout(function () {
        updateScore(scoreCount);
        // console.log("Outside: ", scoreCount)
    }, 1000);

}


questions().then(
    (fetchedData) => {
        vQuestion.textContent = fetchedData.question;
        buttonA.textContent = fetchedData.A;
        buttonB.textContent = fetchedData.B;
        buttonC.textContent = fetchedData.C;
        buttonD.textContent = fetchedData.D;
        rightAnswer = fetchedData.answer;
        console.log("Right Answer: ", rightAnswer);
        questionCount++;
    })
    .catch((error) => {
        console.log("Error fetching data:", error);
    });


