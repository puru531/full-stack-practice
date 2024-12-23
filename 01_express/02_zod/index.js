//Zod is used to validate the input data, and it throws an error if the data is invalid.

// wrong way of doing input validation
/*
    if (username === 'admin' && password === 'admin') {
        next();
    } else {
        res.status(401).json({msg: 'You are not authorized to access this endpoint'});
    }
*/
// The above code is a bad way of doing input validation because it is not scalable and maintainable.

// Zod is a TypeScript-first schema declaration and validation library. It is used to validate the input data and throw an error if the data is invalid. Zod provides a fluent API for defining schemas and validating data against those schemas.



const express = require('express');
const zod = require('zod');

const app = express();
const port = 3000;

// zod schema to validate the input data of the request body
const schema = zod.array(zod.number());

//schema for email, password, country
/*
const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    country: zod.literal(['India', 'USA', 'UK']),  // only these 3 countries are allowed
});
 */

app.use(express.json());

app.get('/health-checkup', (req, res) => {
    const kidneys = req.body.kidneys;
    try {
        // validate the input data
        schema.parse(kidneys);
        res.json({msg: 'Your kidneys are healthy'});
    } catch (error) {
        res.status(411).json({msg: error.errors});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// 1.16.49 03.1