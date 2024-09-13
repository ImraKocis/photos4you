import { ReactElement } from "react";

export function AdminForbidden(): ReactElement {
  return (
    <section className="flex flex-col flex-1 justify-center items-center">
      <h2 className="font-bold text-lg mb-4">Forbidden Access</h2>
      <p className="text-lg">This content is only for Admin users</p>
    </section>
  );
}
