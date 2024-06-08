import { Suspense } from "react";
import Loading from "@/app/loading";
import { HomePageGetter } from "@/app/HomePage";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageGetter />
    </Suspense>
  );
}
