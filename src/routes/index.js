const express = require("express");
const router = express.Router();
const articleController = require("../controller/article-controller");
const mlOuputController = require("../controller/ml-output-controller");

let routes = (app) => {
  router.get("/article", articleController.getAllArticle);
  router.get("/article/:id", articleController.getSpecificArticle);

  router.post("/scan-result/upload", mlOuputController.upload);
  router.get("/scan-result/list", mlOuputController.getListFiles);
  router.get("/scan-result/list/:name", mlOuputController.download);

  app.use(router);
};

module.exports = routes;