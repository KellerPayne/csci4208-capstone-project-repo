/*
Middleware class that:
- catches errors thrown anywhere in routes or services
- prevents server from crashing
- sends clean JSON error messages back to the client
- ensures a consistent error response format for thin UI
*/

// err is for the error object thrown by any route/service
// req is the HTTP request that caused the error
// res is the HTTP response object used to send back JSON
// next is a callback to pass the error forward
export function errorHandler(err, req, res, next) {
    res.status(400).json({              // sends back a 400 bad request HTTP status and a json body describing the error
        error: true,
        message: err.message
    });
}