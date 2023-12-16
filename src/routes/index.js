const express = require("express");
const router = express.Router();
const articleController = require("../controller/article-controller");
const mlOuputController = require("../controller/ml-output-controller");
const authController = require("../controller/authController");
const storeImage = require("../controller/store-model-output-controller");
const authHeader = require("../middleware/auth-header");
const quota = require("../controller/quotaController");

let routes = (app) => {
  router.get("/article", articleController.getAllArticle);
  router.get("/article/:id", articleController.getSpecificArticle);

  router.post("/scan-result/upload", mlOuputController.upload);

  router.post("/auth/signUp", authController.signUpUsers);
  router.post("/auth/login",authController.loginUsers);

  router.patch("/store-result", authHeader.auth, storeImage.storeModelOutput)
  router.patch("/get-result-info", authHeader.auth, storeImage.getOutputInfo)

  router.patch("/quota", authHeader.auth, quota.addQuota);
  
  app.use(router);
};

module.exports = routes;
