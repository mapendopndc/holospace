const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET,
    accessKeyId: process.env.AWS_S3_ID,
    region: 'us-east-2'
})


const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'holospace-app',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, 'ar-models/' + Date.now() + file.originalname)
        }
    })
});

module.exports = upload;