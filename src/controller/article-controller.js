require("dotenv").config({ path: "../../.env" }); // Load `.env` file

const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("../../article-eco-scan-bucket-key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();
// const collectionName = process.env.ARTICLE_COLLECTION;
// console.log(typeof collectionName);

const getAllArticle = async (req, res) => {
  try {
    const articleRef = db.collection("article-content");
    const response = await articleRef.get();
    let responseArr = [];

    response.forEach((doc) => {
      responseArr.push(doc.data());
    });

    res.send(responseArr);
  } catch (error) {
    console.log(error);
  }
};

const getSpecificArticle = async (req, res) => {
  try {
    const articleRef = db
      .collection("article-content")
      .doc(req.params.id);
    const response = await articleRef.get();
    
    res.send(response.data());
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllArticle,
  getSpecificArticle,
};
