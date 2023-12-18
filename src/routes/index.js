const express = require("express");
const router = express.Router();
const articleController = require("../controller/article-controller");
const imageToGCS = require("../controller/image-to-gcs-controller.js");
const authController = require("../controller/authController");
const modelOuput = require("../controller/model-output-controller.js");
const authHeader = require("../middleware/auth-header");
const quota = require("../controller/quotaController");

let routes = (app) => {
  router.get("/article", articleController.getAllArticle);
  router.get("/article/:id", articleController.getSpecificArticle);

  router.post("/scan-result/upload", imageToGCS.upload);

  router.post("/auth/signUp", authController.signUpUsers);
  router.post("/auth/login",authController.loginUsers);

  router.patch("/store-result", authHeader.auth, modelOuput.storeModelOutput)
  router.patch("/get-result-info", authHeader.auth, modelOuput.getOutputInfo)
  router.patch("/get-result-info/:id", authHeader.auth, modelOuput.getSpecificOutput)

  router.patch("/quota/add", authHeader.auth, quota.addQuota);
  router.post("/quota", quota.checkQuota);
  router.patch("/quota/reduce", quota.reduceQuota);
  
  app.use(router);
};

module.exports = routes;
