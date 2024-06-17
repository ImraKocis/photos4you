## Getting Started

Prepare environment

This application requires: 
- [photos4you API](https://github.com/ImraKocis/photos4you-api)
- [AWS S3 Bucket](https://aws.amazon.com/s3/)

### AWS S3 Config helpers

Bucket Policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::{AWS_BUCKET_NAME}/*"
    }
  ]
}
```

Next.js example and [docs](https://github.com/vercel/examples/tree/main/solutions/aws-s3-image-upload) for getting started with S3

### Environment 

```dotenv 
API_BASE_URL="http://localhost:3111"

# same google clinet ID on API side
GOOGLE_CLIENT_ID="x"

# same github clinet ID on API side
GITHUB_CLIENT_ID="x"

AUTH_GOOGLE_URL="https://accounts.google.com/o/oauth2/v2/auth"
AUTH_GITHUB_URL="https://github.com/login/oauth/authorize"

# AWS S3 Bucket config
AWS_ACCESS_KEY_ID="x"
AWS_SECRET_ACCESS_KEY="x"
AWS_BUCKET_NAME="x"
AWS_REGION="x"

NEXT_PUBLIC_BASE_URL='http://localhost:3000'
```


### Start Application

Run the development server:

```bash
yarn dev
```

Run the production server: 

```bash
yarn build
```
After successful build start application:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
