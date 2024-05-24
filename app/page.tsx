import { ImageGrid } from "@/app/ui/image/image-grid";
import { getAllImages } from "@/app/actions/images/actions";
import { UserProfileImage } from "@/app/ui/profile/user-profile-image";
import { UserPersonalInformationForm } from "@/app/ui/profile/personal-information";
export default async function Home() {
  const images = await getAllImages();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full ml-auto overflow-y-auto ">
      {/*<UserProfileImage />*/}
      {/*<UserPersonalInformationForm />*/}
      <ImageGrid images={images} />
    </div>
  );
}
