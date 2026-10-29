import type { AnchorHTMLAttributes } from "react";

type SafeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function SafeLink({ href, ...props }: SafeLinkProps) {
  return <a href={href} {...props} />;
}
