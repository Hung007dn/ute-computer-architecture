# UTE Computer Architecture

Nền tảng học và ôn thi môn Kiến trúc máy tính dành cho sinh viên HCMUTE.

## Tính năng

- 10 chương học, 20 bài học và ngân hàng 30 câu hỏi có giải thích.
- Luyện tập theo chương, chế độ thi thử và dashboard tiến độ.
- Tài liệu, video, flashcard, cheat sheet và kế hoạch học tập.
- Công cụ Base Converter, Two's Complement, IEEE 754 và CPU Performance.
- Giao diện responsive, dark mode và tìm kiếm toàn website.
- Drizzle ORM cùng Cloudflare D1 cho dữ liệu người dùng và tiến độ học.

## Công nghệ

- Next.js/Vinext, React 19 và TypeScript
- Tailwind CSS 4 và Lucide Icons
- Drizzle ORM, Cloudflare D1 và Workers

## Chạy trên máy

Yêu cầu Node.js 22.13 trở lên và pnpm.

```bash
pnpm install
pnpm dev
```

Mặc định ứng dụng chạy tại `http://localhost:5173`.

## Kiểm tra và build

```bash
pnpm exec tsc --noEmit
pnpm build
```

Sinh migration sau khi thay đổi schema:

```bash
pnpm db:generate
```

## Đẩy lên GitHub

Repository đã được khởi tạo Git và có commit đầu tiên. Tạo một repository trống trên GitHub, sau đó chạy:

```bash
git remote add origin https://github.com/<username>/<repository>.git
git branch -M main
git push -u origin main
```

Không commit `.env`, `.dev.vars`, khóa bí mật hoặc token. Các file này đã được loại trừ trong `.gitignore`.

## Cấu trúc chính

- `app/`: trang và API routes
- `components/`: thành phần giao diện và công cụ tương tác
- `data/`: nội dung mẫu của khóa học
- `db/`: schema Drizzle
- `drizzle/`: migration SQL
- `public/`: tài nguyên tĩnh
- `worker/`: Cloudflare Worker entrypoint

## Bản đang hoạt động

[UTE Computer Architecture](https://kien-truc-may-tinh-hub-2026.chatgpt-3518.chatgpt.site/)
