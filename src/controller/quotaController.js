const { db } = require("../db/firestore");
const jwt = require("jsonwebtoken");

const addQuota = async (req, res) => {
  try {
    // Verify user by token
    const { package } = req.body;
    const userId = req.user.userId;
    const docRef = db.collection("users").doc(userId);
    const doc = await docRef.get();
    const user = doc.data();
    let isError = false;
    package == "Bronze"
      ? (user.quota += 15)
      : package == "Silver"
      ? (user.quota += 30)
      : package == "Gold"
      ? (user.quota += 45)
      : (isError = true);

    if (!isError) {
      await docRef.set({ quota: user.quota }, { merge: true });
      user.password = undefined;
      const payload = {
        user: user,
        userId: userId,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Tidak ada package bernama" + package);
    }
  } catch (error) {
    res.status(500).send("error");
  }
};

module.exports = { addQuota };
