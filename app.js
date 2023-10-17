const { Client } = require('@elastic/elasticsearch');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const tasksRouter = require('./routes/tasks');

const app = express();

const esClient = new Client({ node: 'http://ip-172-31-86-101.ec2.internal:9200' });
const esLogger = (format) => {
  return morgan(format, {
    stream: {
      write: (message) => {
        esClient.index({
          index: 'http-logs',
          body: {
            message: message.trim(),
            timestamp: new Date()
          }
        });
      }
    }
  });
};
app.use(esLogger('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
