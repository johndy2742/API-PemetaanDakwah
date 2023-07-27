const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');

// Configure AWS SDK with your access credentials
const accessKeyId = 'DO00EB7TWMX4FU3PG2X6'; // Replace with your actual access key
const secretAccessKey = 'Evb+SKm7oFwsMvWwte2+VMeOoiecyKxdWNUxrAMUy1g'; // Replace with your actual secret key
console.log('Access Key:', accessKeyId);
console.log('Secret Key:', secretAccessKey);

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const spaceName = 'peta-dakwah-image'; // Replace with your actual Space name
const region = 'sgp1'; // Replace with your actual region code

// Create an S3 instance
const s3 = new AWS.S3({
  endpoint: `https://${region}.digitaloceanspaces.com`,
});

// Multer configuration - specify the destination for storing uploaded images
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

// Controller action for handling image upload
function uploadImage(req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
      }
  
      // Image was uploaded successfully, now upload it to DigitalOcean Spaces
      const params = {
        Bucket: spaceName,
        Key: req.file.filename,
        Body: require('fs').createReadStream(req.file.path),
      };
  
      // Log the params before uploading the image
      console.log('Uploading image with the following params:');
      console.log(params);
  
      s3.upload(params, function (err, data) {
        if (err) {
          return res.status(500).json({ message: 'Error uploading image to DigitalOcean Spaces' });
        }
  
        // Delete the temporary file created by multer
        require('fs').unlinkSync(req.file.path);
  
        // Image uploaded to DigitalOcean Spaces successfully
        const imageUrl = data.Location;
        return res.json({ imageUrl: imageUrl });
      });
    });
  }
  

// Export the controller action
module.exports = { uploadImage };
