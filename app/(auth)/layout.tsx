import Link from "next/link";
import { ShieldCheck, Sparkles, Star } from "lucide-react";
import { APP_NAME } from "@/constants";
import { Logo } from "@/components/common/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <main id="main-content" className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link href="/" className="mb-10 inline-flex w-fit items-center pl-2" aria-label={`${APP_NAME} Home`}>
          <Logo />
        </Link>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </main>

      <div className="relative hidden overflow-hidden bg-brand-700 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(245,165,36,0.25),transparent_45%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div />
          <div>
            <div className="mb-6 flex -space-x-3">
              {[3, 7, 11, 15].map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={n}
                  src={`https://i.pravatar.cc/100?img=${n}`}
                  alt=""
                  className="h-11 w-11 rounded-full ring-2 ring-brand-700"
                />
              ))}
            </div>
            <p className="text-2xl font-bold leading-snug">
              Join 200,000+ learners building real skills with project-based courses.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-brand-100">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className="fill-amber-accent text-amber-accent" />
                ))}
              </div>
              4.8 average rating from 42,000+ reviews
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-brand-100">
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} /> Secure &amp; private
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={18} /> Learn at your pace
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
