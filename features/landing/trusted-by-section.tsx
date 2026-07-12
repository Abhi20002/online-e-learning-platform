import { TRUSTED_COMPANIES } from "@/components/logos/company-logos";

export function TrustedBySection() {
  return (
    <section className="border-b border-ink-300/15 bg-gradient-to-b from-white to-surface py-16">
      <div className="container-page">
        <p className="mb-12 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-400/80">
          Trusted by employees from leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12 lg:gap-x-20">
          {TRUSTED_COMPANIES.map(({ name, logo: Logo }) => (
            <div
              key={name}
              className="group relative flex items-center justify-center"
              title={`${name} - Trusted Partner`}
              aria-label={name}
            >
              <div className="text-ink-300 opacity-50 grayscale transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:text-brand-600 group-hover:scale-110">
                <Logo />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
