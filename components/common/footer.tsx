import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { APP_NAME, FOOTER_LINKS, SOCIAL_LINKS } from "@/constants";

const socialIcons = {
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Linkedin: FaLinkedin,
  Youtube: FaYoutube,
};

export function Footer() {
  return (
    <footer className="border-t border-ink-300/20 bg-ink-900 text-ink-300" role="contentinfo">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="Skillbridge Home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-extrabold text-white">{APP_NAME}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Empowering learners worldwide with high-quality, accessible online education.
            Start your learning journey today.
          </p>
          {/* Social Links */}
          <div className="mt-5 flex gap-3" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.icon as keyof typeof socialIcons];
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand-500 transition-colors"
                  aria-label={social.name}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Support</h4>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_LINKS.support.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_LINKS.resources.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ink-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
