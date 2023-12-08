const { Storage } = require("@google-cloud/storage");

const serviceAccount = JSON.parse(process.env.ML_RESULT_BUCKET);

const storage = new Storage({
  credentials: serviceAccount,
});

module.exports = { storage };
