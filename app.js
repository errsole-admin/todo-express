/**
 * Insert this Errsole code snippet as the first line of your app's main file
 */
const errsole = require('errsole');
errsole.initialize({
  framework: 'express',
  token: process.env.ERRSOLE_TOKEN,
  exitOnException: true,
  evalExpression: true
});
// End of Errsole code snippet

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const tasksRouter = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
