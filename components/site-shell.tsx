"use client";
import Link from "@/components/safe-link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Command,
  FileText,
  FlaskConical,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  Trophy,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { chapters } from "@/data/course";

const primaryNav = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/learn", label: "Học", icon: BookOpen },
  { href: "/practice", label: "Luyện tập", icon: BrainCircuit },
  { href: "/exam", label: "Ôn thi", icon: Trophy },
  { href: "/documents", label: "Tài liệu", icon: FileText },
  { href: "/videos", label: "Video", icon: Video },
  { href: "/tools", label: "Công cụ", icon: FlaskConical },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<{
    name: string | null;
    email: string;
    role: "ADMIN" | "STUDENT";
    mustChangePassword: boolean;
  } | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("ute-ca-theme");
    const enabled =
      stored === "dark" ||
      (!stored && matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch((v) => !v);
      }
      if (event.key === "Escape") {
        setSearch(false);
        setMenu(false);
        setAccountMenu(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    setMenu(false);
    setAccountMenu(false);
  }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menu]);
  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (response) =>
        response.ok
          ? ((await response.json()) as {
              user: {
                name: string | null;
                email: string;
                role: "ADMIN" | "STUDENT";
                mustChangePassword: boolean;
              };
            })
          : null,
      )
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null));
  }, [pathname]);
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ute-ca-theme", next ? "dark" : "light");
  };
  const results = useMemo(() => {
    if (!query.trim()) return chapters.slice(0, 5);
    const n = query.toLowerCase();
    return chapters
      .filter((c) => `${c.title} ${c.description}`.toLowerCase().includes(n))
      .slice(0, 6);
  }, [query]);
  return (
    <div className="min-h-screen bg-page text-main">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 lg:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="UTE Computer Architecture - Trang chủ"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
              <img
                src="/hcmute-logo.png"
                alt="Logo HCM-UTE"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden leading-tight sm:block">
              <strong className="block text-sm tracking-tight">
                UTE Computer Architecture
              </strong>
              <small className="block text-[10px] font-medium text-muted">
                HCMUTE Learning Lab
              </small>
            </span>
          </Link>
          <nav
            className="mx-auto hidden items-center gap-1 xl:flex"
            aria-label="Điều hướng chính"
          >
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="icon-button hidden md:flex"
              onClick={() => setSearch(true)}
              aria-label="Tìm kiếm toàn website"
            >
              <Search size={17} />
              <span className="text-xs text-muted">Tìm kiếm</span>
              <kbd>⌘K</kbd>
            </button>
            <button
              className="square-button"
              onClick={toggleTheme}
              aria-label={dark ? "Bật giao diện sáng" : "Bật giao diện tối"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  className="avatar"
                  title={user.email}
                  aria-label="Mở menu tài khoản"
                  aria-expanded={accountMenu}
                  aria-controls="account-navigation"
                  onClick={() => setAccountMenu((current) => !current)}
                >
                  {(user.name || user.email).slice(0, 2).toUpperCase()}
                </button>
                {accountMenu && (
                  <div
                    id="account-navigation"
                    className="absolute right-0 top-[calc(100%+10px)] z-[70] w-64 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl"
                  >
                    <div className="border-b border-border px-3 py-3">
                      <strong className="block truncate text-sm">{user.name || "Tài khoản"}</strong>
                      <span className="mt-1 block truncate text-xs text-muted">{user.email}</span>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setAccountMenu(false)}
                      className="mobile-link mt-1"
                    >
                      <UserRound size={17} />
                      <span>Thông tin tài khoản</span>
                    </Link>
                    <Link
                      href={
                        user.mustChangePassword
                          ? "/change-password"
                          : user.role === "ADMIN"
                            ? "/admin"
                            : "/dashboard"
                      }
                      onClick={() => setAccountMenu(false)}
                      className="mobile-link"
                    >
                      <LayoutDashboard size={17} />
                      <span>{user.role === "ADMIN" ? "Trang quản trị" : "Dashboard"}</span>
                    </Link>
                    <button type="button" onClick={logout} className="mobile-link w-full text-rose-500">
                      <LogOut size={17} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="secondary-button py-2"
                aria-label="Đăng nhập sinh viên"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Link>
            )}
            <button
              type="button"
              className="square-button xl:hidden"
              onClick={() => setMenu((current) => !current)}
              aria-label={menu ? "Đóng menu" : "Mở menu"}
              aria-expanded={menu}
              aria-controls="mobile-navigation"
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/55 backdrop-blur-sm"
          onClick={() => setMenu(false)}
          role="presentation"
        >
          <aside
            id="mobile-navigation"
            className="ml-auto h-full w-[min(360px,88vw)] overflow-y-auto border-l border-border bg-surface p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
          >
            <div className="mb-7 flex items-center justify-between">
              <strong>Điều hướng</strong>
              <button
                type="button"
                className="square-button"
                onClick={() => setMenu(false)}
                aria-label="Đóng menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  className="mobile-link"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight className="ml-auto" size={16} />
                </Link>
              ))}
              <Link
                href={
                  user
                    ? user.role === "ADMIN"
                      ? "/admin"
                      : "/dashboard"
                    : "/login"
                }
                onClick={() => setMenu(false)}
                className="mobile-link"
              >
                {user ? <LayoutDashboard size={18} /> : <LogIn size={18} />}
                <span>
                  {user
                    ? user.role === "ADMIN"
                      ? "Quản trị"
                      : "Dashboard"
                    : "Đăng nhập"}
                </span>
                <ChevronRight className="ml-auto" size={16} />
              </Link>
              {user && (
                <button type="button" onClick={logout} className="mobile-link w-full">
                  <LogOut size={18} />
                  <span>Đăng xuất</span>
                </button>
              )}
            </nav>
          </aside>
        </div>
      )}
      {search && (
        <div
          className="fixed inset-0 z-[70] grid place-items-start bg-slate-950/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setSearch(false)}
        >
          <section
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            aria-label="Tìm kiếm"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search size={20} className="text-cyan-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-16 flex-1 bg-transparent text-base outline-none"
                placeholder="Tìm bài học, công thức, câu hỏi..."
              />
              <button
                onClick={() => setSearch(false)}
                className="text-xs text-muted"
              >
                ESC
              </button>
            </div>
            <div className="p-2">
              <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
                Chương và bài học
              </p>
              {results.length ? (
                results.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/learn/${chapter.slug}`}
                    onClick={() => setSearch(false)}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-soft"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-500">
                      {chapter.icon}
                    </span>
                    <span>
                      <strong className="block text-sm">{chapter.title}</strong>
                      <small className="line-clamp-1 text-muted">
                        {chapter.description}
                      </small>
                    </span>
                    <Command size={14} className="ml-auto text-muted" />
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-sm text-muted">
                  Không tìm thấy nội dung phù hợp.
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      <main>{children}</main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
                <img
                  src="/hcmute-logo.png"
                  alt="Logo HCM-UTE"
                  className="h-full w-full object-contain"
                />
              </span>
              <strong>UTE Computer Architecture</strong>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">
              LMS, nền tảng luyện thi và phòng lab tương tác dành cho sinh viên
              HCMUTE.
            </p>
          </div>
          <div>
            <strong className="footer-title">Học tập</strong>
            <Link href="/learn">10 chương học</Link>
            <Link href="/practice">Quiz theo chương</Link>
            <Link href="/exam">Đề thi thử</Link>
          </div>
          <div>
            <strong className="footer-title">Công cụ</strong>
            <Link href="/tools/base-converter">Base Converter</Link>
            <Link href="/tools/twos-complement">Two&apos;s Complement</Link>
            <Link href="/tools/ieee754">IEEE 754</Link>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted">
          © 2026 UTE Computer Architecture · Thiết kế cho hành trình học tập
          nghiêm túc.
        </div>
      </footer>
    </div>
  );
}
