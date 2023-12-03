const { db } = require("../db/firestore");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserFromUsername = async (username) => {
  try {
    const userRef = db.collection("users").where("username", "==", username);
    const user = await userRef.get();
    return user.docs.length > 0;
  } catch (error) {
    console.log(error);
  }
};

const loginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userRef = db.collection("users").where("username", "==", username);
    const user = await userRef.get();
    if (user.docs.length > 0) {
      const doc = user.docs[0];
      const comparePasswords = (password, hashedPassword) => {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      };
      const passwordMatch = await comparePasswords(
        password,
        doc.data().password
      );

      if (passwordMatch) {
        const user = doc.data();
        user.password = undefined;
        const userId = doc.id;
        const payload = {
          user: user,
          userId: userId,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_LIFETIME,
        });
        res.status(200).json({ user, token });
      }
    } else {
      res.status(400).send("Kredensial Invalid");
    }
  } catch (error) {
    res.status(500).send("error");
  }
};

const signUpUsers = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;
    const user = await getUserFromUsername(username);

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.
        if (!user) {
          const docRef = db.collection("users").doc();
          await docRef.set({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: hash,
          });
          const user = { username, firstName, lastName };
          const userId = docRef.id;
          const payload = {
            user: user,
            userId: userId,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          });
          

          res.status(200).json({ user, token });
        } else {
          res.status(400).send("Username telah digunakan!");
        }
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { loginUsers, signUpUsers };
