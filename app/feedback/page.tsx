import { redirect } from "next/navigation";
import { MessageSquareText } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";
import { getCurrentUser } from "@/lib/student-auth";

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=/feedback");
  if (user.mustChangePassword) redirect("/change-password");

  return (
    <div className="page-container section-space">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-500">
            <MessageSquareText size={25} />
          </span>
          <span className="eyebrow mt-5 inline-flex">Đóng góp xây dựng</span>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Góp ý & phản hồi
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">
            Ý kiến của bạn sẽ được gửi trực tiếp đến quản trị viên để xem xét và
            cải thiện website.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
