export interface S3Image {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: StorageClasses;
}

export interface AWSUrlProps {
  bucket: string;
  region: string;
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
