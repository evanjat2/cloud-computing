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
    const { title } = req.body;

    const articleRef = db.collection("article-content");

    const snapshot = await articleRef.where("title", "==", title).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const dataArray = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      dataArray.push({ id: doc.id, data });
    });

    res.status(200).send(dataArray);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllArticle,
  getSpecificArticle,
};
