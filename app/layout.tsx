import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "UTE Computer Architecture", template: "%s · UTE Computer Architecture" },
  description: "Nền tảng học tập, luyện đề và ôn thi môn Kiến trúc máy tính dành cho sinh viên HCMUTE.",
  openGraph: { title: "UTE Computer Architecture – Học Kiến trúc máy tính HCMUTE", description: "Học lý thuyết, luyện bài tập, làm đề và thực hành với phòng lab tương tác.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" suppressHydrationWarning><body><SiteShell>{children}</SiteShell></body></html>;
}
