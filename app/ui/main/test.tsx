"use client";

import { Button } from "@/components/ui/button";
import { createPost } from "@/app/actions/post/actions";

export function TestActions() {
  return <Button onClick={async () => await createPost()}>Create Post</Button>;
}
