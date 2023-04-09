const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
const operators = ['add', 'subtract', 'multiply', 'divide'];

app.get('/', (req, res) => res.render('index.ejs', { operators: operators }));
app.post('/', (req, res) => {
    let result = 0;

    if (typeof parseFloat(req.body.num1) != 'number' || typeof parseFloat(req.body.num1) != 'number' || !operators.includes(req.body.operator)) {
        result = 'Error! Please Check the inputs again!';
    } else {
        switch (req.body.operator) {
            case 'add':
                result = `Your Calculated value is: ${+req.body.num1 + +req.body.num2}`;
                break;
            case 'subtract':
                result = `Your Calculated value is: ${+req.body.num1 - +req.body.num2}`;
                break;
            case 'multiply':
                result = `Your Calculated value is: ${+req.body.num1 * +req.body.num2}`;
                break;
            case 'divide':
                result = `Your Calculated value is: ${+req.body.num1 / +req.body.num2}`;
                break;
            default:
                result = 'Error!';
                break;
        }
    }
    res.render('result', { result });
});

app.listen(PORT, () => console.log('Server is Up and Running on Port 3000 !'));