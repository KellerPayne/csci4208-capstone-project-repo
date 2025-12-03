const statusEl = document.getElementById('status');
const questionArea = document.getElementById('questionArea');
const questionTextEl = document.getElementById('questionText');
const choicesEl = document.getElementById('choices');
const joinButton = document.getElementById('joinGame');
const playerNameInput = document.getElementById('playerName');
const subjectSelect = document.getElementById('subjectSelect');

let currentPlayer = null;
let currentQuestion = null;
let currentSession = null;

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
            body: JSON.stringify({ name })
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
    } catch (err) {
        setStatus(`Error: ${err.message}`);
    }
}

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

joinButton.addEventListener('click', joinGame);
