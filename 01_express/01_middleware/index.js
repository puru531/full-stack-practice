/*
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health-checkup', (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;
// Bad way of doing input validation
    if (username === 'admin' && password === 'admin') {
        res.json({msg: 'You are authorized to access this endpoint', kidneyId});
    }
    return res.status(401).json({msg: 'You are not authorized to access this endpoint'});
})

//app.listen is used to bind and listen the connections on the specified host and port.
// It takes the port number and a callback function as arguments.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

*/

// ---------------------- Middleware ----------------------
/*
Middleware in Express.js is used to handle and process requests before they reach the route handlers. It functions as a series of functions that execute in sequence, each having access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Middleware can perform various tasks such as:

- Logging requests
- Parsing request bodies
- Handling authentication and authorization
- Managing sessions
- Serving static files
- Error handling

Middleware functions can be added to the application using `app.use()` or directly to specific routes.
 */

// ---------------------- Middleware Example ----------------------

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); // It is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// It makes the JSON payload available in the req.body property of the request object.

// Middleware function to check if the user is authorized
const userMiddleware = (req, res, next) => {
    const username = req.headers.username;
    const password = req.headers.password;

    if (username === 'admin' && password === 'admin') {
        next();
    } else {
        return res.status(401).json({msg: 'You are not authorized to access this endpoint'});
    }
};

// Middleware function to check if the kidneyId is provided
/*
* Middleware functions can be chained together to perform multiple checks or operations before reaching the final route handler.
* In this example, we have two middleware functions: userMiddleware and kidneyMiddleware.
* The userMiddleware checks if the username and password are correct, and the kidneyMiddleware checks if the kidneyId is provided in the query parameters.
* If both checks pass, the final route handler for the /health-checkup endpoint is executed, and the health checkup is completed.
* If any of the checks fail, an error response is sent back to the client.
* Middleware functions provide a flexible way to add custom logic, validation, and processing to the request-response cycle in Express.js applications.
*
*
* It takes three arguments: req, res, and next.
* The req and res arguments are the request and response objects, respectively,
* and the next argument is a callback function that should be called to pass control to the next middleware function in the chain.
* */
const kidneyMiddleware = (req, res, next) => {
    const kidneyId = req.query.kidneyId;
    if(kidneyId) {
        next();
    }
    else {
        return res.status(400).json({msg: 'Kidney ID is required'});
    }
};

app.use(userMiddleware); // Adding the userMiddleware to all routes

// app.get('/health-checkup', userMiddleware, kidneyMiddleware, (req, res) => {
//     res.json({msg: 'Your health checkup is complete!'});
// });
app.get('/health-checkup', kidneyMiddleware, (req, res) => { // userMiddleware is already added to all routes
    res.json({msg: 'Your health checkup is complete!'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


//1.08.41 --> lec 03.1