import { AuthContainer } from "@/app/ui/auth/auth-container";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>trigger</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AuthContainer />
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
