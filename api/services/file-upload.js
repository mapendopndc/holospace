const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./aws-config');

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
    }),
    limits: {
        fileSize: 1024 * 1024 * 40
    }
});

module.exports = upload;