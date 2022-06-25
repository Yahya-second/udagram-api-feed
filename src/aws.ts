require('dotenv').config();
import AWS = require('aws-sdk');
import {config} from './config/config';

const c = config.dev;

// Configure AWS
//const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

const credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      httpOptions: { timeout: 30000, connectTimeout: 5000 },
      region: "me-south-1"
}
AWS.config.update(credentials);

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_reigion,
  params: {Bucket: c.aws_media_bucket},
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('getObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ) {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('putObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

/* This operation checks to see if a bucket exists. */

var params = {
  Bucket: "acl1"
 };
 s3.headBucket(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
