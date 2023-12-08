const processFile = require("../middleware/upload-image-article");
const { format } = require("util");
const { storage } = require("../db/cloud-storage");
const { Readable } = require("stream");

const bucket = storage.bucket("ml-ouput-eco-scan-bucket");

const upload = async (req, res) => {
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    const localReadStream = new Readable();
    localReadStream.push(req.file.buffer);
    localReadStream.push(null); // Signal the end of the stream

    localReadStream.pipe(blobStream)
      .on('error', (err) => {
        console.log(err);
        res.status(500).send({ message: err.message });
      })
      .on('finish', async () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        try {
          await bucket.file(req.file.originalname).makePublic();
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            url: publicUrl,
          });
        } catch (err) {
          console.log(err);
          res.status(500).send({
            message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
            url: publicUrl,
          });
        }
      });
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

const getListFiles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });

    res.status(200).send(fileInfos);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Unable to read list of files!",
    });
  }
};

const download = async (req, res) => {
  try {
    const [metaData] = await bucket.file(req.params.name).getMetadata();
    res.send(metaData.mediaLink);
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
};
