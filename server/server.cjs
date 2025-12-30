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

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  console.log(db.url);
  try {
    await db.mongoose.connect(db.url, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    });
    isConnected = true;
    console.log("Connected to the database!");
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    throw err;
  }
};

require("./routes/routes.cjs")(app);

const PORT = process.env.PORT || 3001;

// For Vercel serverless deployment
if (process.env.VERCEL) {
  module.exports = async (req, res) => {
    await connectDB();
    return app(req, res);
  };
} else {
  connectDB().then(() => {
    app.listen(PORT);
    console.log('API running on port ' + PORT);
  });
}
