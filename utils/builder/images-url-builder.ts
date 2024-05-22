export class ImageUrlBuilder {
  private bucketName!: string;
  private region!: string;
  private imageUrl!: string;

  public setBucketName(bucketName: string): this {
    this.bucketName = bucketName;
    return this;
  }

  public setRegion(region: string): this {
    this.region = region;
    return this;
  }

  public setImageUrl(imageUrl: string): this {
    this.imageUrl = imageUrl;
    return this;
  }

  private formatBaseUrl(): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com`;
  }

  public build(): string {
    return `${this.formatBaseUrl()}/${this.imageUrl}`;
  }
}
