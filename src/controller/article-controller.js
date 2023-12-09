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
      const data = doc.data();
      data.id = doc.id; // Include the id in the data object
      responseArr.push(data);
    });

    //Send array and status code
    res.status(200).send(responseArr);
  } catch (error) {
    console.log(error);
  }
};

const getSpecificArticle = async (req, res) => {
  try {
    // Get articleId from request parameters
    const { id: articleId } = req.params;

    //Access collection
    const articleRef = db.collection("article-content");

    // Query db by document ID (articleId from request)
    const snapshot = await articleRef.doc(articleId).get();

    //Handle if title is not found
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    // Get data and send it
    const data = snapshot.data();
    data.id = snapshot.id; // Include the id in the data object

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllArticle,
  getSpecificArticle,
};
