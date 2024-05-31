import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );
}
