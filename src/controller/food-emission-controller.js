const { db } = require("../db/firestore");

const getEmission = async (req, res) => {
  try {
    const emissionRef = db.collection("food-emission").doc(req.params.name);
    const response = await emissionRef.get();

    res.send(response.data());
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEmission
};
