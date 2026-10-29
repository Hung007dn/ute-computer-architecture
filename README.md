# UTE Computer Architecture

Website học tập và ôn thi môn **Kiến trúc máy tính và Hợp ngữ**, hướng đến sinh viên Trường Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE).

## Website đang hoạt động

**[Truy cập UTE Computer Architecture](https://ute-computer-architecture.hung007dn.workers.dev)**

## Giới thiệu

Xin chào, mình là **Vũ Trọng Hưng**, sinh viên Khoa Công nghệ Thông tin, Trường Đại học Sư phạm Kỹ thuật TP.HCM.

Mình xây dựng website này để hỗ trợ các bạn học lý thuyết, luyện bài tập và ôn thi môn Kiến trúc máy tính và Hợp ngữ dễ dàng hơn. Dự án vẫn đang được phát triển và sẽ tiếp tục bổ sung nội dung, bài tập cùng các tính năng mới.

Nếu có ý kiến đóng góp, bạn có thể liên hệ với mình qua Zalo (`0911112020`) hoặc Facebook được gắn trên trang cá nhân GitHub.

## Tính năng

- Lộ trình gồm 10 chương về kiến trúc máy tính và hợp ngữ.
- Nội dung bài học được chia thành các phần Khái niệm, Công thức, Video và Quiz.
- Ngân hàng câu hỏi trắc nghiệm có đáp án và giải thích.
- Chế độ luyện tập, thi thử giữa kỳ và cuối kỳ.
- Flashcard, cheat sheet, kế hoạch học tập và dashboard tiến độ.
- Bộ công cụ Base Converter, Two's Complement, IEEE 754 và CPU Performance.
- Thư viện tài liệu hỗ trợ tải lên và tải xuống file PDF/DOCX tối đa 20 MB.
- Giao diện responsive, chế độ sáng/tối và tìm kiếm toàn website.

## Công nghệ

- Next.js/Vinext, React 19 và TypeScript.
- Vite, Tailwind CSS 4 và Lucide Icons.
- Cloudflare Workers để triển khai ứng dụng.
- Cloudflare D1 để lưu metadata tài liệu.
- Cloudflare KV để lưu file PDF/DOCX.
- Drizzle ORM để thao tác với cơ sở dữ liệu.

## Chạy dự án trên máy

Yêu cầu:

- Node.js `22.13.0` trở lên.
- pnpm `11.25.0` hoặc phiên bản tương thích.

```bash
git clone https://github.com/Hung007dn/ute-computer-architecture.git
cd ute-computer-architecture
pnpm install
pnpm dev
```

Sau khi khởi động, mở [http://localhost:5173](http://localhost:5173).

## Kiểm tra và build

```bash
pnpm exec tsc --noEmit
pnpm build
```

Sinh migration sau khi thay đổi database schema:

```bash
pnpm db:generate
```

## Triển khai Cloudflare Workers

Đăng nhập Cloudflare và build dự án trước khi triển khai:

```bash
pnpm exec wrangler login
pnpm build
pnpm exec wrangler deploy --config wrangler.production.jsonc
```

Database D1, KV namespace và secret `ADMIN_UPLOAD_KEY` phải được cấu hình trong tài khoản Cloudflare. Không commit mật khẩu, token, `.env` hoặc `.dev.vars` lên GitHub.

## Cấu trúc chính

- `app/`: giao diện, các trang và API routes.
- `components/`: thành phần giao diện và chức năng tương tác.
- `data/`: dữ liệu mẫu của khóa học.
- `db/`: Drizzle schema và kết nối D1.
- `drizzle/`: migration SQL.
- `public/`: logo và tài nguyên tĩnh.
- `worker/`: Cloudflare Worker entrypoint.
- `wrangler.production.jsonc`: cấu hình triển khai production.

## Repository

[github.com/Hung007dn/ute-computer-architecture](https://github.com/Hung007dn/ute-computer-architecture)
