import { ImageGrid } from "@/app/ui/image/image-grid";
import { getAllImages } from "@/app/actions/images/actions";
export default async function Home() {
  const images = await getAllImages();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full ml-auto overflow-y-auto ">
      <ImageGrid images={images} />
    </div>
  );
}
