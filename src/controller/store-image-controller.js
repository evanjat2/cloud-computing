const { db } = require("../db/firestore");

const storeImage = async (req, res) => {
  try {
    const { imageURL, foodName } = req.body;
    const userId = req.user.userId;

    const docRef = db.collection("saved-image").doc();
    await docRef.set({
      userId: userId,
      imageURL: imageURL,
      foodName: foodName,
    });

    const data = { userId, imageURL, foodName };

    res.status(200).json({ data, message: "sent successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

const getImage = async (req, res) => {
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
  getImage,
};
