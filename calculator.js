const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.post('/', (req, res) => {
    const operators = ['add', 'subtract', 'multiply', 'divide']
    let result = 0;
    if (typeof parseFloat(req.body.num1) != 'number' || typeof parseFloat(req.body.num1) != 'number' || !operators.includes(req.body['1'])) {
        result = 'Error! Please Check the inputs again!';
    } else {
        switch (req.body['1']) {
            case 'add':
                result = +req.body.num1 + +req.body.num2;
                break;
            case 'subtract':
                result = +req.body.num1 - +req.body.num2;
                break;
            case 'multiply':
                result = +req.body.num1 * +req.body.num2;
                break;
            case 'divide':
                result = +req.body.num1 / +req.body.num2;
                break;
            default:
                result = 'Error!';
                break;
        }
        result = `Your Calculated value is: ${result}`;
    }

    res.send(`
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body style="display: flex; align-items: center; padding-top: 40px; padding-bottom: 40px; margin: auto;">
            <main style="margin: auto;">
                <form action="/" method="get">
                    <h1 class="mb-3 fw-bold">${result}</h1>
                    <button class="w-100 btn btn-lg btn-outline-primary" type="submit" style="margin-top: 50px;">Go to Home</button>
                </form>
            <main>
        </body>
    `);
});

app.listen(PORT, () => console.log('Server is Up and Running on Port 3000 !'));