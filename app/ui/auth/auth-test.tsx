"use client";
import { useUser } from "@/lib/redux/hooks";

export function AuthSessionTest() {
  const user = useUser();
  return (
    <div className="flex text-wrap justify-center items-center">
      <p className="flex text-wrap text-xs">{user?.email}</p>
    </div>
  );
}
