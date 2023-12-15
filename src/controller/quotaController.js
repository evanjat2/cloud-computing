const { db } = require("../db/firestore");

const addQuota = async (req, res) => {
  try {
    // Verify user by token
    const { package } = req.body;
    const userId = req.user.userId;
    const userRef = db.collection("users").doc(userId);
    const user = await userRef.get();
    let quota = user.data().quota;
    package == "Bronze"
      ? (quota += 15)
      : package == "Silver"
      ? (quota += 30)
      : package == "Gold"
      ? (quota += 45)
      : res.status(400).send("Tidak ada package bernama " + package);
    await userRef.set({ quota: quota }, { merge: true });
    res.status(200).json({ quota: quota });
  } catch (error) {
    res.status(500).send("error");
  }
};

module.exports = { addQuota };
