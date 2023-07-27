const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const config = require('../config/config');

const accessKeyId = config.do_space_key;
const secretAccessKey = config.do_secret_key;

if (!accessKeyId || !secretAccessKey) {
  console.error('Please set the DO_SECRET_KEY and DO_SPACE_KEY environment variables.');
  process.exit(1);
}

const spaceName = config.do_space_name; // Replace with your actual Space name
const region = config.do_region; // Replace with your actual region code
console.log(region);
const s3 = new AWS.S3({
  endpoint: `https://sgp1.digitaloceanspaces.com`,
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage }).single('image');

function uploadImage(req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
      }
  
      AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });
  
      const params = {
        Bucket: spaceName,
        Key: req.file.filename,
        Body: require('fs').createReadStream(req.file.path),
      };
  
      console.log('Uploading image with the following params:');
      console.log(params);
  
      s3.upload(params, function (err, data) {
        if (err) {
          console.error('Error uploading image:', err);
          return res.status(500).json({ message: 'Error uploading image to DigitalOcean Spaces' });
        }
  
        require('fs').unlinkSync(req.file.path);
  
        const imageUrl = data.Location;
        return res.json({ imageUrl: imageUrl });
      });
    });
  }
  

const uploadcontroller = {
  uploadImage,
};

module.exports = uploadcontroller;
