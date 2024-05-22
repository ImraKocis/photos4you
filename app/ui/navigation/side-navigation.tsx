"use client";

import { ReactElement, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CiMenuFries } from "react-icons/ci";
import {
  IoCloseOutline,
  IoHome,
  IoSearch,
  IoLogIn,
  IoLogOut,
} from "react-icons/io5";
import Link from "next/link";
import { ProfileAvatar } from "@/app/ui/navigation/profile-avatar";
import { useIsNavigationOpen, useUser } from "@/lib/redux/hooks";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AuthContainer } from "@/app/ui/auth/auth-container";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/lib/redux/features/userSlice";
import { Dispatch } from "redux";
import { set } from "@/lib/redux/features/navigationBarSlice";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { UploadPhoto } from "@/app/ui/image/upload";

const content: LinkContent[] = [
  { title: "Home", href: "/", icon: <IoHome className="w-6 h-6" /> },
  { title: "Search", href: "/", icon: <IoSearch className="w-6 h-6" /> },
];

interface LinkContent {
  title: string;
  href: string;
  icon: ReactElement;
}

export function SideNavigation() {
  const isOpen = useIsNavigationOpen();
  const user = useUser();
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <div
      className={twMerge(
        "h-screen z-50 fixed bg-foreground text-white flex flex-col justify-between transform duration-500 px-4 py-3",
        isOpen ? "w-navigation-open" : "w-navigation-closed",
      )}
    >
      <section>
        <div
          className={twMerge(
            "flex mb-6",
            isOpen ? "justify-end" : "justify-center",
          )}
        >
          <button
            className="flex p-2 justify-center items-center"
            onClick={() => dispatch(set(!isOpen))}
          >
            {isOpen ? (
              <IoCloseOutline className="text-white flex w-6 h-6" />
            ) : (
              <CiMenuFries className="text-white flex w-6 h-6" />
            )}
          </button>
        </div>
        <div className="w-full">
          <ul className="flex flex-col gap-2">
            {content.map((item, index) => (
              <li key={index}>
                <Link className="flex items-center" href={item.href}>
                  <button className="flex p-2 justify-center items-center">
                    {item.icon}
                  </button>

                  <span
                    className={twMerge(
                      "transition ml-2 duration-300 ease-in-out",
                      isOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none -z-50",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="flex justify-center items-center gap-2">
                        <button className="flex w-full items-center relative">
                          <div className="flex justify-center items-center p-2">
                            <MdOutlineAddAPhoto className="w-6 h-6 " />
                          </div>
                          <span
                            className={twMerge(
                              "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
                              isOpen
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none -z-50",
                            )}
                          >
                            Creat Post
                          </span>
                        </button>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <UploadPhoto />
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
                <li>
                  <Link className="flex items-center" href="/profile">
                    <button className="flex p-2 justify-center items-center">
                      <ProfileAvatar
                        image={user.avatar}
                        firstName={user.firstName}
                        lastName={user.lastName}
                      />
                    </button>

                    <span
                      className={twMerge(
                        "transition ml-2 duration-300 ease-in-out",
                        isOpen
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none -z-50",
                      )}
                    >
                      Profile
                    </span>
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </section>
      <section className="w-full mb-4">
        {!user ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex justify-center items-center gap-2">
                <button className="flex w-full items-center relative">
                  <div className="flex justify-center items-center p-2">
                    <IoLogIn className="w-6 h-6" />
                  </div>
                  <span
                    className={twMerge(
                      "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
                      isOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none -z-50",
                    )}
                  >
                    Log In
                  </span>
                </button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AuthContainer />
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <button
              className="flex w-full items-center relative"
              onClick={() => dispatch(deleteUser())}
            >
              <div className="flex justify-center items-center p-2">
                <IoLogOut className="w-6 h-6" />
              </div>
              <span
                className={twMerge(
                  "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
                  isOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none -z-50",
                )}
              >
                Log Out
              </span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
