const dbConfig = require("../config/db.config.cjs");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model.cjs")(mongoose);
db.customers = require("./customer.model.cjs")(mongoose);
db.invoices = require("./invoice.model.cjs")(mongoose);
db.cashMemos = require("./cashMemo.model.cjs")(mongoose);
module.exports = db;
