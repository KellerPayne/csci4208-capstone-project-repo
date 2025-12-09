// gets each html element so UI can be updated
const statusEl = document.getElementById('status');
const questionArea = document.getElementById('questionArea');
const questionTextEl = document.getElementById('questionText');
const choicesEl = document.getElementById('choices');
const joinButton = document.getElementById('joinGame');
const playerNameInput = document.getElementById('playerName');
const subjectSelect = document.getElementById('subjectSelect');
const leaderboardList = document.getElementById("leaderboardList");
const exitButton = document.getElementById("exitGame");
const joinCard = document.getElementById("joinCard");
const SUBJECTS = {      // stores readable names for each subject prefix
    q: "Java",
    ds: "Data Structures",
    os: "Operating Systems",
    alg: "Algorithms",
    sql: "SQL",
    py: "Python"
};
const subjectKeys = Object.keys(SUBJECTS);      // creates an array of subject prefixes, used for rotating leaderboard display

let currentPlayer = null;       // stores logged-in player object
let currentQuestion = null;     // stores session returned from api/session/join
let currentSession = null;      // stores current question returned from /api/session/current-question
let leaderboardIndex = 0;       // used for rotating leaderboards every 3 seconds

// helper method to update status message
function setStatus(msg) {
    statusEl.textContent = msg;
}

// function for player to join game
async function joinGame() {
    const name = playerNameInput.value.trim();      // stores player's name
    const subjectPrefix = subjectSelect.value;      // stores subject prefix for subject selected by player

    if (!name) return setStatus("Please enter your name.");     // if name is empty, prompts user using status message
    if (!subjectPrefix) return setStatus("Please select a subject.");   // if no subject is selected, prompts player using status message

    try {
        // Create player
        const playerRes = await fetch('/api/players', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, subjectPrefix })
        });     // Sends a POST request to create the player in backend

        currentPlayer = await playerRes.json();     // saves returned player object into currentPlayer

        // Join session
        const sessionRes = await fetch('/api/session/join', {       // joins or creates a session and stores it
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: currentPlayer.id,
                subjectPrefix
            })
        });

        currentSession = await sessionRes.json();

        setStatus("Session joined! Loading first question...");     // prompt user of success
        await loadCurrentQuestion();        // fetches current question
        joinCard.style.display= "none";     // hides join screen
        document.getElementById("leaderboard").style.display = "none";      // hides leaderboard      
        exitButton.style.display = "block";     // displays exit button after answer choices
    } catch (err) {
        setStatus(`Error: ${err.message}`);     // sets status message if error occurs
    }
}

// handles leaderboard logic
async function loadLeaderboard(subjectPrefix= "q") {
    try {
        const res = await fetch('/api/players');
        const players = await res.json();       // fetches all players from backend

        const filtered = players.filter (p => p.subjectPrefix === subjectPrefix);       // filters players to show only those who played the selected subject

        leaderboardList.innerHTML = `<h3>${SUBJECTS[subjectPrefix]} Leaderboard</h3>`;      // displays subject title

        if (!filtered.length) {     // if no players for that subject
            leaderboardList.innerHTML += `<div>No players yet for ${SUBJECTS[subjectPrefix]}.</div>`;       // display message 
            return;     // returns
        }

        filtered.sort((a, b) => b.score - a.score);     // sorts players by score from highest to lowest

        leaderboardList.innerHTML += filtered.map(p => `<div><strong>${p.name}</strong>: ${p.score} pts</div>`).join("");       // displays each player
    } catch (err) {
        leaderboardList.innerHTML = "Error loading leaderboard.";       // catches and handles errors
    }
}

// function to cycle through leaderboard
function cycleLeaderboard() {       // cycle through subjects in leaderboard automatically
    loadLeaderboard(subjectKeys[leaderboardIndex]);     // loads next leaderboard every time it is called
    leaderboardIndex = (leaderboardIndex + 1) % subjectKeys.length;     // cycles through all subjects
}

setInterval(cycleLeaderboard, 3000);        // calls cycleLeaderboard every 3 seconds

// function to load current question of session
async function loadCurrentQuestion() {
    try {
        const res = await fetch(`/api/session/current-question/${currentSession.id}`);
        const question = await res.json();      // requests current question for session

        if (!question) {        // if no questions left, hides question area
            setStatus("No more questions for this subject.");
            questionArea.style.display = "none";
            return;
        }

        currentQuestion = question;     // saves question
        renderQuestion(question);       // displays it

    } catch (err) {
        setStatus(`Error: ${err.message}`);
    }
}

// function to render question
function renderQuestion(question) {
    questionArea.style.display = 'block';       // set question area display to block
    questionTextEl.textContent = question.text;     // displays question text
    choicesEl.innerHTML = '';       // placeholder for questions to be added and displayed

    // creates a button for each choice
    question.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = () => submitAnswer(index);        // when clicked, submits answer clicked
        choicesEl.appendChild(btn);
    });
}

// function to submit answer
async function submitAnswer(answerIndex) {
    try {
        // sends answer to backend for scoring
        const res = await fetch('/api/quiz/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: currentPlayer.id,
                sessionId: currentSession.id,
                questionId: currentQuestion.id,
                answerIndex
            })
        });

        // returns {correct: true/false}
        const result = await res.json();

        if (result.correct) {       // if correct
            setStatus("Correct!");      // sets status message to correct
        } else {
            setStatus("Incorrect.");        // else it sets it to incorrect
        }

        await loadCurrentQuestion();        // loads next question
    } catch (err) {
        setStatus(`Error: ${err.message}`);
    }
}

// function to exit current game session
function exitGame() {
    // resets game memory
    currentPlayer = null;
    currentSession = null;
    currentQuestion = null;

    // Reset UI
    questionArea.style.display="none";
    exitButton.style.display="none";
    joinCard.style.display ="block";
    document.getElementById("leaderboard").style.display="block";
    setStatus("");

    // Reset inputs
    playerNameInput.value = "";
    subjectSelect.value = "";
    leaderboardIndex = 0;
    loadLeaderboard("q");
}

joinButton.addEventListener('click', joinGame);     // event listener for join button
exitButton.addEventListener("click", exitGame);     // event listener for exit button

loadLeaderboard("q");       // display Java leaderboard on page load