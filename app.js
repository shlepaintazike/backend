const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser')

const connectToDatabase = require('./database/connect');
const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(
    cookiParser(),
    bodyParser.json(),
    express.static(path.join(__dirname, 'public')),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, 'public'),)
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http:/localhost:${PORT}`);
});