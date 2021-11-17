require("dotenv").config();
const Express = require ("express");
const app = Express();
const dbConnection = require('./db')

app.use(require('./middleware/headers'))

const controllers = require("./controllers");
// const Controllers = require ('./controllers')

app.use(Express.json());

app.use('/user', controllers.userController);

// app.use(require("./middleware/validate-jwt"));

app.use('/journal', controllers.journalController),

app.use(require("./middleware/validate-jwt"));

app.use('/test', (req, res) => {res.send('This is a message from the test endpoint on the server!')});



dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => app.listen(3000, () => {console.log('[Server]: App is listening on port 3000')}))
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`)
});