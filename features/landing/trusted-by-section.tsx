export function TrustedBySection() {
  const companies = ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix"];

  return (
    <section className="border-b border-ink-300/15 bg-white py-10">
      <div className="container-page">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-ink-400">
          Trusted by employees from leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {companies.map((company) => (
            <span
              key={company}
              className="text-lg font-extrabold text-ink-300 grayscale opacity-70 hover:opacity-100 hover:text-brand-600 transition-all"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
