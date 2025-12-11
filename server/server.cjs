'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require("./models/index.cjs");
console.log(db.url);
db.mongoose
  .connect(db.url,  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routes/routes.cjs")(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log('API running on port ' + PORT);
