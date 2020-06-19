const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET,
    accessKeyId: process.env.AWS_S3_ID,
    region: 'us-east-2'
})

const s3 = new aws.S3();

module.exports = s3;