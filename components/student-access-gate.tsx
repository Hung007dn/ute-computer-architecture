import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/student-auth";

export async function StudentAccessGate({ children, returnTo }: { children: React.ReactNode; returnTo: string }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  if (user.mustChangePassword) redirect("/change-password");
  return children;
}
