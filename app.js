const exec = require('child_process').exec;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

exec('ulimit -n', (err, stdout, stderr) => {
  if (err) {
    err = new Error(err.message || err.toString());
    console.error(err);
  }
  if (stdout) {
    console.error('ulimit -n', stdout);
  }
  if (stderr) {
    console.error('ulimit -n', stderr);
  }
});

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
