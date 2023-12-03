const { db } = require("../db/firestore");

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
