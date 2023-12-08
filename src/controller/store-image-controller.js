const { db } = require("../db/firestore");

const storeImage = async (req, res) => {
  try {
    //Get image url and food name from request body
    const { imageURL, foodName } = req.body;
    let emission = ""

    //Verified user by token
    const userId = req.user.userId;

    //Access collection
    const collectionRef = db.collection("food-emission");

    //Query food emission from db food emission
    const snapshot = await collectionRef.where("foodName", "==", foodName).get();

    //Handle if foodName is not found
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    //Access data and send it
    snapshot.forEach((doc) => {
      const data = doc.data();
      emission = data.value
    });


    //Stored all information to firebase
    const docRef = db.collection("saved-image").doc();
    await docRef.set({
      userId: userId,
      imageURL: imageURL,
      foodName: foodName,
      foodEmission: emission
    });

    //Set up variabel for response
    const data = { userId, imageURL, foodName, foodEmission: emission };

    res.status(200).json({ data, message: "sent successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

const getFoodInfo = async (req, res) => {
  try {
    const userId = req.user.userId;

    const collectionRef = db.collection("saved-image");
    const snapshot = await collectionRef.where('userId', '==', userId).get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const dataArray = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      dataArray.push({ id: doc.id, data });
    });
    
    res.status(200).send(dataArray)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  storeImage,
  getFoodInfo,
};
