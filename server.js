const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes')
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
  // res.send("Hello, here you will find the best Mexican Food, move to /recipes");
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes);
 
mongodb.initDb((err, mongodb) => {
if (err) {
    console.log(err);
} else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
}
});