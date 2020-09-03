import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';

export const s3Func: S3Handler = async (event, _context) => {
  const backet = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`s3://${backet}/${key}`);
  return;
}
