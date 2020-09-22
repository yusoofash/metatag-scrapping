const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorHandlers = require('./middlewares/errorHandlers');
const apiRoutes = require('./routes');

// load .env variable
dotenv.config();
const config = require('./config');


const port = config.httpPort || 3000;

// parse incoming requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// api routes
app.use('/api', apiRoutes);

// error handlers
app.use(errorHandlers.apiErrorHandler);
app.use(errorHandlers.defaultErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
