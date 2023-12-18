const axios = require("axios");

const quota = require("../controller/quotaController");

const sendImageToFlaskEndpoint = async (imageData) => {
  try {
    const flaskEndpoint = "https://predict-pbjv724rza-et.a.run.app/predict/";

    // Send image
    const response = await axios.post(
      flaskEndpoint,
      { image: imageData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Stored response endpoint
    const flaskResponse = response.data;

    console.log(flaskResponse);

    return flaskResponse;
  } catch (error) {
    console.error("Error sending image to Flask endpoint:", error.message);
    throw error;
  }
};

const checkQuota = async (req, res) => {
  console.log(req);

  //Verified user by token
  const userId = req.user.userId;
  const isHaveQuota = await checkQuota(userId);
  const result = await reduceQuota(userId);
  const { user, token } = result;
  res.send({ isHaveQuota, user, token });
  //   try {
  //     const userId = req.user.userId;

  //     // Membuat objek FormData untuk mengirim data gambar
  //     const formData = new FormData();
  //     formData.append("image", req.body.image);

  //     const isHaveQuota = await checkQuota(userId);

  //     // Mengirimkan gambar ke endpoint Flask untuk diproses
  //     const response = await sendImageToFlaskEndpoint(formData);

  //     // Tampilkan pesan respons dari Flask
  //     console.log("Flask Response:", response);

  //     // Lakukan sesuatu dengan data yang diproses dari Flask, misalnya simpan dalam variabel
  //     const result = await reduceQuota(userId);
  //     const { user, token } = result;

  //     res.send({ isHaveQuota, processedData: response, user, token });
  //   } catch (error) {
  //     // Tangani kesalahan jika ada
  //     console.error("Error:", error.message);
  //     res.status(500).send({ error: "Internal Server Error" });
  //   }
};

module.exports = { checkQuota };
