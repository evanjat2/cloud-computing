const express = require("express");
const router = express.Router();
const articleController = require("../controller/article-controller");
const mlOuputController = require("../controller/ml-output-controller");
const authController = require("../controller/authController");
const foodEmission = require("../controller/food-emission-controller");
const storeImage = require("../controller/store-image-controller");
const authHeader = require("../middleware/auth-header")

let routes = (app) => {
  router.get("/article", articleController.getAllArticle);
  router.get("/article/detail", articleController.getSpecificArticle);

  router.post("/scan-result/upload", mlOuputController.upload);
  router.get("/scan-result/list", mlOuputController.getListFiles);
  router.get("/scan-result/list/:name", mlOuputController.download);

  router.post("/auth/signUp", authController.signUpUsers);
  router.post("/auth/login",authController.loginUsers);

  router.get("/emission/:name", foodEmission.getEmission);

  router.patch("/store-image", authHeader.auth, storeImage.storeImage)
  router.patch("/get-food-info", authHeader.auth, storeImage.getFoodInfo)

  app.use(router);
};

module.exports = routes;
