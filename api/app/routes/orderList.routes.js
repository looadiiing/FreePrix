module.exports = (app) => {
  const orderLists = require("../controllers/orderList.controller.js");

  var router = require("express").Router();

  router.post("/", orderLists.create);

  router.get("/", orderLists.findAll);

  router.get("/:id", orderLists.findOne);

  app.use("/api/orderLists", router);
};
