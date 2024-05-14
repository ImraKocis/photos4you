import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

const handleName = (
  fullName?: string,
  firstName?: string,
  lastName?: string,
): string => {
  if (fullName) {
    const names = fullName.split(" ");
    return `${names[0][0]}${names[1][0]}`;
  }
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`;
  else if (firstName) return `${firstName[0]}`;
  else if (lastName) `${lastName[0]}`;
  return "";
};

export function ProfileAvatar({
  fullName,
  lastName,
  firstName,
  image,
}: ProfileAvatarProps) {
  console.log("image?test", image);
  return (
    <Avatar>
      <AvatarImage src={image} width={24} height={24} alt="profile image" />
      <AvatarFallback>
        {handleName(fullName, firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
}
