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
const SUBJECTS = {
    q: "Java",
    ds: "Data Structures",
    os: "Operating Systems",
    alg: "Algorithms",
    sql: "SQL",
    py: "Python"
};
const subjectKeys = Object.keys(SUBJECTS);

let currentPlayer = null;
let currentQuestion = null;
let currentSession = null;
let leaderboardIndex = 0;

function setStatus(msg) {
    statusEl.textContent = msg;
}

async function joinGame() {
    const name = playerNameInput.value.trim();
    const subjectPrefix = subjectSelect.value;

    if (!name) return setStatus("Please enter your name.");
    if (!subjectPrefix) return setStatus("Please select a subject.");

    try {
        // Create player
        const playerRes = await fetch('/api/players', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, subjectPrefix })
        });

        currentPlayer = await playerRes.json();

        // Join session
        const sessionRes = await fetch('/api/session/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: currentPlayer.id,
                subjectPrefix
            })
        });

        currentSession = await sessionRes.json();

        setStatus("Session joined! Loading first question...");
        await loadCurrentQuestion();
        joinCard.style.display= "none";
        document.getElementById("leaderboard").style.display = "none";
        exitButton.style.display = "block";
    } catch (err) {
        setStatus(`Error: ${err.message}`);
    }
}

async function loadLeaderboard(subjectPrefix= "q") {
    try {
        const res = await fetch('/api/players');
        const players = await res.json();

        const filtered = players.filter (p => p.subjectPrefix === subjectPrefix);

        leaderboardList.innerHTML = `<h3>${SUBJECTS[subjectPrefix]} Leaderboard</h3>`;

        if (!filtered.length) {
            leaderboardList.innerHTML += `<div>No players yet for ${SUBJECTS[subjectPrefix]}.</div>`;
            return;
        }

        filtered.sort((a, b) => b.score - a.score);

        leaderboardList.innerHTML += filtered.map(p => `<div><strong>${p.name}</strong>: ${p.score} pts</div>`).join("");
    } catch (err) {
        leaderboardList.innerHTML = "Error loading leaderboard.";
    }
}

function cycleLeaderboard() {
    loadLeaderboard(subjectKeys[leaderboardIndex]);
    leaderboardIndex = (leaderboardIndex + 1) % subjectKeys.length;
}

setInterval(cycleLeaderboard, 3000);

async function loadCurrentQuestion() {
    try {
        const res = await fetch(`/api/session/current-question/${currentSession.id}`);
        const question = await res.json();

        if (!question) {
            setStatus("No more questions for this subject.");
            questionArea.style.display = "none";
            return;
        }

        currentQuestion = question;
        renderQuestion(question);

    } catch (err) {
        setStatus(`Error: ${err.message}`);
    }
}

function renderQuestion(question) {
    questionArea.style.display = 'block';
    questionTextEl.textContent = question.text;
    choicesEl.innerHTML = '';

    question.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = () => submitAnswer(index);
        choicesEl.appendChild(btn);
    });
}

async function submitAnswer(answerIndex) {
    try {
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

        const result = await res.json();

        if (result.correct) {
            setStatus("Correct!");
        } else {
            setStatus("Incorrect.");
        }

        await loadCurrentQuestion();
    } catch (err) {
        setStatus(`Error: ${err.message}`);
    }
}

function exitGame() {
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

joinButton.addEventListener('click', joinGame);
exitButton.addEventListener("click", exitGame);

loadLeaderboard("q");