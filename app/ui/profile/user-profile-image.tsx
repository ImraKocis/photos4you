"use client";
import { ReactElement } from "react";
import { useUser } from "@/lib/redux/hooks";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProfileAvatar } from "@/app/ui/navigation/profile-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { handleUserProfileName } from "@/lib/utils";

export function UserProfileImage(): ReactElement | null {
  const user = useUser();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative h-32 w-32 overflow-hidden rounded-full">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="User profile image"
            className="h-full w-full object-cover"
            width={128}
            height={128}
            style={{
              aspectRatio: "128/128",
              objectFit: "cover",
            }}
          />
        ) : (
          <Avatar className="w-[128px] h-[128px]">
            <AvatarFallback className="text-5xl text-white">
              {handleUserProfileName(
                undefined,
                user?.firstName,
                user?.lastName,
              )}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
      </div>
    </div>
  );
}
