const processFile = require("../middleware/upload-image-article");
const { format } = require("util");
const { storage } = require("../db/cloud-storage");
const { Readable } = require("stream");

const bucket = storage.bucket("ml-ouput-eco-scan-bucket");

const upload = async (req, res) => {
  try {
    //Get image file from user and compress it with processFile
    await processFile(req, res);

    //Check image is already upload or not
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    //-------------------------------Store Image To Cloud Storage-------------------------------//
    //Get image fie name
    const blob = bucket.file(req.file.originalname);

    //Open stream processing
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    //Make image file become local so can process it with pipe
    const localReadStream = new Readable();
    localReadStream.push(req.file.buffer);
    localReadStream.push(null); // Signal the end of the stream

    //Start pipe to store image file on google storage
    localReadStream.pipe(blobStream)
      //Error handler
      .on('error', (err) => {
        console.log(err);
        res.status(500).send({ message: err.message });
      })
      //Finish handler
      .on('finish', async () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        //Send image url
        try {
          await bucket.file(req.file.originalname).makePublic();
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            url: publicUrl,
          });
        } catch (err) {
          console.log(err);
          res.status(500).send({
            message: `Uploaded the file unsuccessfully:`,
          });
        }
      });
    //-------------------------------Store Image To Cloud Storage-------------------------------//
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = {
  upload,
};
