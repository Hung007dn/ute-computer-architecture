"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

type PasswordFieldProps = {
  name: string;
  label: string;
  autoComplete: "current-password" | "new-password";
};

export function PasswordField({ name, label, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const inputId = `password-${name}`;
  return <div className="block"><label htmlFor={inputId} className="mb-2 block text-xs font-bold">{label}</label><div className="flex items-center gap-3 rounded-xl border border-border bg-page px-4 focus-within:border-blue-500"><LockKeyhole size={17} className="shrink-0 text-muted"/><input id={inputId} name={name} type={visible ? "text" : "password"} required autoComplete={autoComplete} className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"/><button type="button" onClick={()=>setVisible(current=>!current)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-soft hover:text-main" aria-label={visible ? `Ẩn ${label.toLowerCase()}` : `Hiện ${label.toLowerCase()}`} title={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>{visible?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></div>;
}
