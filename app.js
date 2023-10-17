const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const tasksRouter = require('./routes/tasks');

const app = express();

const httpLogStream = fs.createWriteStream(path.join(__dirname, 'http.log'), { flags: 'a' });
app.use(morgan('combined', { stream: httpLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
