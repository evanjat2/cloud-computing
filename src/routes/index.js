const express = require("express");
const router = express.Router();
const articleController = require("../controller/article-controller");
const mlOuputController = require("../controller/ml-output-controller");
const authController = require("../controller/authController");
const foodEmission = require("../controller/food-emission-controller");
const storeImage = require("../controller/store-image-controller");
const authHeader = require("../middleware/auth-header");
const quota = require("../controller/quotaController");

let routes = (app) => {
  router.get("/article", articleController.getAllArticle);
  router.get("/article/:id", articleController.getSpecificArticle);

  router.post("/scan-result/upload", mlOuputController.upload);
  router.get("/scan-result/list", mlOuputController.getListFiles);
  router.get("/scan-result/list/:name", mlOuputController.download);

  router.post("/auth/signUp", authController.signUpUsers);
  router.post("/auth/login", authController.loginUsers);

  router.get("/emission/:name", foodEmission.getEmission);

  router.patch("/store-image", authHeader.auth, storeImage.storeImage);
  router.patch("/get-food-info", authHeader.auth, storeImage.getFoodInfo);

  router.patch("/quota", authHeader.auth, quota.addQuota);
  app.use(router);
};

module.exports = routes;
