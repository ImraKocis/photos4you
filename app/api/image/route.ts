import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { getS3Client } from "@/app/lib/s3/s3-config";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  const { filename, contentType, userId } = await request.json();

  try {
    const client = await getS3Client();
    const { url, fields } = await createPresignedPost(client, {
      Bucket: "photos4you",
      Key: `${userId}/${uuidv4()}`,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return Response.json({ url, fields });
  } catch (error) {
    console.log(error);
    // @ts-ignore
    return Response.json({ error: error.message });
  }
}

export async function GET(request: NextRequest) {
  // const userId = request.nextUrl.searchParams.get("userId");
  const s3 = await getS3Client();

  try {
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      // Prefix: userId ? userId : undefined,
    };

    const command = new ListObjectsV2Command(input);
    const result = await s3.send(command);
    return Response.json({ images: result.Contents, status: true });
  } catch (e) {
    console.log(e);
    return Response.json({ images: [], status: false });
  }
}
