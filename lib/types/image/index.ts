export interface S3Image {
  Key: string;
  LastModified: string;
  ETag: string;
  // Size in Bytes
  Size: number;
  StorageClass: StorageClasses;
}

export interface AWSUrlProps {
  bucket: string;
  region: string;
}

export interface ImageDB {
  id: number;
  url: string;
  size: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

type StorageClasses =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS";
