"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";
import { bnNumber, unitLabel } from "@/lib/format";
const subscribe = () => () => {};
const getDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
const categories = [
  ["chal", "চাল"],
  ["dal", "ডাল"],
  ["tel", "তেল"],
  ["sobji", "সবজি"],
  ["mach", "মাছ"],
  ["mangsho", "মাংস"],
  ["dim-dui", "ডিম-দুধ"],
  ["mosla", "মসলা"],
];
export function Header({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const date = useSyncExternalStore(subscribe, getDate, () => "আজকের বাজার");
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  async function logout() {
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি");
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন");
    }
  }
  return (
    <header className="site-header">
      <div className="topbar container">
        <Link href="/" className="brand">
          <Image src="/assets/logo-icon.png" width={34} height={34} alt="" />
          <span>
            <b>বাজার দর</b>
            <small suppressHydrationWarning>{date}</small>
          </span>
        </Link>
        <nav className="desktop-nav">
          <Link className={pathname === "/" ? "active" : undefined} href="/">
            হোম
          </Link>
          {categories.map(([s, n]) => (
            <Link
              className={pathname === `/category/${s}` ? "active" : undefined}
              key={s}
              href={`/category/${s}`}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="auth-actions">
          {!isPending && session ? (
            <>
              <Link className="btn ghost" href="/profile">
                প্রোফাইল
              </Link>
              <button className="btn primary" onClick={logout}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="btn ghost" href="/signin">
                সাইন ইন
              </Link>
              <Link className="btn primary" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
          <button
            className="menu-btn"
            aria-label="মেনু"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav">
          <Link
            href="/"
            className={pathname === "/" ? "active" : undefined}
            onClick={() => setOpen(false)}
          >
            হোম
          </Link>
          {session && (
            <Link href="/profile" onClick={() => setOpen(false)}>
              প্রোফাইল
            </Link>
          )}
          {categories.map(([s, n]) => (
            <Link
              onClick={() => setOpen(false)}
              key={s}
              href={`/category/${s}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
      <div className="ticker" aria-label="পণ্যের দামের চলমান তালিকা">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {products.length > 0 ? products.map((product) => (
                <span className="ticker-item" key={`${copy}-${product.id}`}>
                  <span aria-hidden="true">{product.image}</span>
                  <span>{product.nameBn}</span>
                  <span>{bnNumber(product.today)} টাকা/{unitLabel(product.unit).replace("প্রতি ", "")}</span>
                  {product.change.dir === "flat" ? (
                    <span className="ticker-flat">— {bnNumber(Math.abs(product.change.pct))}%</span>
                  ) : product.change.dir === "up" ? (
                    <b>▲ {bnNumber(Math.abs(product.change.pct))}%</b>
                  ) : (
                    <em>▼ {bnNumber(Math.abs(product.change.pct))}%</em>
                  )}
                </span>
              )) : (
                <span className="ticker-item">🛒 দামের তথ্য আপডেট করা হচ্ছে…</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
