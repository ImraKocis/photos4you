import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleUserProfileName } from "@/lib/utils";

interface ProfileAvatarProps {
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string;
}

export function ProfileAvatar({
  fullName,
  lastName,
  firstName,
  image,
}: ProfileAvatarProps) {
  return (
    <Avatar>
      <AvatarImage
        src={image}
        width={24}
        height={24}
        alt="user profile avatar"
      />
      <AvatarFallback>
        {handleUserProfileName(fullName, firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
}
