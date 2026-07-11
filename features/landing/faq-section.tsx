import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/constants";

export function FAQSection() {
  return (
    <section className="bg-surface-alt py-20">
      <div className="container-page max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-600">Questions</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue={FAQ_DATA[0].id}
          className="divide-y divide-ink-300/20 rounded-2xl border border-ink-300/20 bg-white"
        >
          {FAQ_DATA.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b-0">
              <AccordionTrigger className="px-5 py-4 text-left font-semibold text-ink-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed text-ink-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
