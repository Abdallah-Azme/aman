import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import SectionHeader from "../shared/section-header";
import { getFaqs } from "@/api/home";
import { FaqItem } from "@/types/home";
const Faqs = async () => {
  const t = await getTranslations("faqs");
  let data;
  const res = await getFaqs();
  if (res.status) {
    data = res.data;
  } else {
    data = null;
  }

  return (
    data && (
      <section className="py-16">
        <div className="container space-y-8">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title={t("title")}
              description={data?.faqs_caption}
            />
          </motion.div>
          {/* faqs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Accordion
              type="single"
              collapsible
              className="lg:w-1/2 mx-auto space-y-4"
              defaultValue="item-1"
            >
              {data?.faqs
                .map(
                  (
                    faq: FaqItem,
                    index: number,
                  ) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="data-[state=open]:bg-linear-to-b from-primary to-secondary px-4 data-[state=open]:text-white data-[state=open]:rounded-xl"
                    >
                      <AccordionTrigger withPlus>
                        <div className="flex items-center lg:gap-12 gap-2 lg:text-lg">
                          <p>{index < 10 ? `0${index + 1}` : index + 1}</p>
                          <p>{faq.question}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ),
                )}
            </Accordion>
          </motion.div>
        </div>
      </section>
    )
  );
};

export default Faqs;
