//Initiate access to firestore
const { db } = require("../db/firestore");

//Function to get all article from db
const getAllArticle = async (req, res) => {
  try {
    //Access collection
    const articleRef = db.collection("article-content");

    //Get all article
    const response = await articleRef.get();
    let responseArr = [];

    //Access all data and push it to array
    response.forEach((doc) => {
      responseArr.push(doc.data());
    });

    //Send array and status code
    res.status(200).send(responseArr);
  } catch (error) {
    console.log(error);
  }
};

const getSpecificArticle = async (req, res) => {
  try {
    //Get title from request body
    const { title } = req.body;

    //Access collection
    const articleRef = db.collection("article-content");

    //Query db by title from request
    const snapshot = await articleRef.where("title", "==", title).get();

    //Handle if not found title
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    //Access data and send it
    snapshot.forEach((doc) => {
      const data = doc.data();
      res.status(200).json({id:doc.id, data});
    });

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllArticle,
  getSpecificArticle,
};
