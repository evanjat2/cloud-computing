const { db } = require("../db/firestore");

const addQuota = async (req, res) => {
  try {
    // Verify user by token
    const { package } = req.body;
    const userId = req.user.userId;
    const docRef = db.collection("users").doc(userId);
    const doc = await docRef.get();
    const user = doc.data();
    package == "Bronze"
      ? (user.quota += 15)
      : package == "Silver"
      ? (user.quota += 30)
      : package == "Gold"
      ? (user.quota += 45)
      : res.status(400).send("Tidak ada package bernama " + package);
    await docRef.set({ quota: user.quota }, { merge: true });
    user.password = undefined;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("error");
  }
};

module.exports = { addQuota };
