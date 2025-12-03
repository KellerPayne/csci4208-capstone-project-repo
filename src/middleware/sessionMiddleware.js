import crypto from 'crypto';    // import crypto to generate unique session identifiers
/*
Middleware class that ensures that every client that connects to the server gets a unique sessionId
stored in a cookie.
*/

export function sessionMiddleware(req, res, next) {
    if (!req.session.sessionId) {   // checks if the request already has a sessionId
        req.session.sessionId = crypto.randomUUID();        // if not, creates and assigns a new sessionId, stores it in the session storage, and attaches cookie to browser
    }
    next();     // move on to the next middleware/route handler
}