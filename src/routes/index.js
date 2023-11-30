const express = require("express");
const router = express.Router();
const articleController = require("../controller/article-controller");
const mlOuputController = require("../controller/ml-output-controller");

let routes = (app) => {
  router.get("/article", articleController.getListFiles);
  router.get("/article/:name", articleController.download);

  router.post("/scan-result/upload", mlOuputController.upload);
  router.get("/scan-result/list", mlOuputController.getListFiles);
  router.get("/scan-result/list/:name", mlOuputController.download);

  app.use(router);
};

module.exports = routes;