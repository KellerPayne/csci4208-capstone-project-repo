import express from 'express';      // import to create routers
// import so that each user gets a unique session ID, multiple clients can access the server concurrently, and so that API can identify which player/session the request belongs to
import session from 'express-session';      
// import routers
import {playersRouter} from './src/api/playersRouter.js'; 
import {sessionRouter} from './src/api/sessionRouter.js';
import {quizRouter} from './src/api/quizRouter.js';
// import error handler
import {errorHandler} from './src/middleware/errorHandler.js';

const app = express(); // creates Express web server

// Install Middleware
app.use(express.json());

/*
    Session Middleware

    What happens here:
    - Ensures each visitor or browser tab gets a session cookie
    - allows Express to store session data on the server in memory
    - Allows access of session properties

    Required to manage:
    - multple players
    - players having separate progress
    - persistent identito across requests
*/
app.use(session({secret: 'study-secret', resave: false, saveUninitalized: true}));

// Wire up API Routes
app.use('/api/players', playersRouter);
app.use('/api/session', sessionRouter);
app.use('/api/quiz', quizRouter);


// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ok: true, sessionId: req.sessionID});
});

// Serve the thin client
app.use(express.static('public'));

// Centralized error handler
// Catches errors thrown from routers, services, and the DB layer and sends clean JSON errors
app.use(errorHandler);

// Starts the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));