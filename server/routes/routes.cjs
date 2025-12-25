module.exports = app => {
  const products = require("../controllers/product.controller.cjs");
  const customers = require("../controllers/customer.controller.cjs");
  const invoices = require("../controllers/invoice.controller.cjs");
  const cashMemos = require("../controllers/cashMemo.controller.cjs");

  var router = require("express").Router();

  // Product routes
  router.post("/products/create", products.create);
  router.get("/products/", products.findAll);
  router.post("/products/:id", products.update);
  router.delete("/products/:id", products.delete);
  router.get("/products/lastRecord", products.findLastRecord);
  router.get("/products/:id", products.findOne);

  // Customer routes
  router.post("/customers/create", customers.create);
  router.get("/customers/", customers.findAll);
  router.get("/customers/lastRecord", customers.findLastRecord);
  router.get("/customers/:id", customers.findOne);
  router.post("/customers/:id", customers.update);
  router.delete("/customers/:id", customers.delete);

  // Invoice routes
  router.get("/invoices/", invoices.findAll);
  router.post("/invoices/create", invoices.create);
  router.get("/invoices/lastRecord", invoices.findLastIdRowInvoiceNumber);
  router.get("/invoices/:id", invoices.findOne);
  router.post("/invoices/:id", invoices.update);
  router.delete("/invoices/:id", invoices.delete);

  // Cash Memo routes
  router.post("/cashMemo/create", cashMemos.create);
  router.get("/cashMemo/lastRecord", cashMemos.findLastMemoInvoiceNumber);
  router.get("/cashMemos/", cashMemos.findAll);
  router.delete("/cashMemos/:id", cashMemos.delete);

  app.use("/api", router);
};
