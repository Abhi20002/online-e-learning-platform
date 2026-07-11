export function TrustedBySection() {
  const companies = ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix"];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by employees from leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((company) => (
            <div
              key={company}
              className="text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
