/*
    Front-End Thin-Client that:
    - Shows UI
    - Sends requests to Express API
    - Renders results
    - DOES NOT HANDLE GAME LOGIC!
*/

// DOM References
const statusElement = document.getElementById('status');        // the Message Bar ("loading...", "correct!")
const questionArea = document.getElementById('questionArea');       // Section containing question UI

/*
    Event listener for the Join Game button.

    When the button is clicked:
        - async function is ran
        - allows for await to be used inside for fetch calls
*/

document.getElementById('createPlayer').onclick = async () => {
    statusElement.textContent = 'Creating player...';       // show loading state
    
    const name = document.getElementById('playerName').ariaValueMax;        // gets the player's name
    const res = await fetch('/api/players', {       // create player object via API POST request
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name})
    });

    const player = await res.json();

    statusElement.textContent = `Welcome, ${player.name}!`;     // displays personalized welcome message

    const q = await fetch('/api/session/current-question');     // fetches current question
    const question = await q.json();

    // shows the question on screen
    questionArea.style.display = 'block';
    document.getElementById('questionText').textContent = question.text;

    // clears old choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';


    // renders answer choices
    question.choices.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.textContent = c;
        btn.onclick = async () => {     // sends answer to server on click
            const res = await fetch('/api/quiz/answer', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    playerId: player.id,        // sends playerID
                    questionId: question.id,    // questionID
                    answer: i   // and index of answer player selected
                })
            });
            const result = await res.json();        // reads server's response
            statusElement.textContent = result.correct ? 'Correct!' : 'Incorrect!';     // displays incorrect or correct
        };
        choicesDiv.appendChild(btn);
    });
};