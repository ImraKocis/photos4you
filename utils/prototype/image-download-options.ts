export interface ImagePrototype {
  processImage(blob: Blob): Promise<Blob>;
  clone(): ImagePrototype;
}

export class OriginalImage implements ImagePrototype {
  async processImage(blob: Blob): Promise<Blob> {
    return blob; // No processing
  }

  clone(): ImagePrototype {
    return new OriginalImage();
  }
}

export class BlurredImage implements ImagePrototype {
  async processImage(blob: Blob): Promise<Blob> {
    const imageBitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.filter = "blur(5px)";
      ctx.drawImage(imageBitmap, 0, 0);
    }
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Blob creation failed"));
        }
      });
    });
  }

  clone(): ImagePrototype {
    return new BlurredImage();
  }
}

export class SepiaImage implements ImagePrototype {
  async processImage(blob: Blob): Promise<Blob> {
    const imageBitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.filter = "sepia(1)";
      ctx.drawImage(imageBitmap, 0, 0);
    }
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Blob creation failed"));
        }
      });
    });
  }

  clone(): ImagePrototype {
    return new SepiaImage();
  }
}
