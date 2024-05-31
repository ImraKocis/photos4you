"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { revalidateTable } from "@/app/actions/admin/users";

export function RevalidateTable({ tag }: { tag: string }) {
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      onClick={async () => {
        setClicked(false);
        setTimeout(() => setClicked(true), 300);
        await revalidateTable(tag);
      }}
    >
      <RefreshCw
        className={twMerge(
          "w-6 h-6 transform duration-300",
          clicked ? "rotate-180" : "",
        )}
      />
    </Button>
  );
}
