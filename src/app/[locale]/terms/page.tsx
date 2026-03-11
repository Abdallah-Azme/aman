import ContactBox from "@/components/home/contact-box";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
const TermsPage = () => {
  const t = useTranslations("terms");
  return (
    <>
      <Navbar />
      <main>
        {/* content */}
        <section className="relative h-screen w-full overflow-hidden  flex items-center justify-center">
          {/* anmated bg */}
          <InteractiveGridPattern />
          {/* content */}
          <div className="container flex items-center justify-between ">
            {/* content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
              className="  flex flex-col gap-4 z-1 items-center text-center "
            >
              <h1 className="lg:text-h1 text-h3 text-gradient">{t("title")}</h1>
              <p className="lg:text-h5">{t("description")}</p>
            </motion.div>
          </div>
        </section>
        {/* content */}
        <section className="py-16">
          <div className="container">
            {t
              .raw("content")
              .map(
                (
                  item: { title: string; description: string },
                  index: number,
                ) => (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    key={index}
                    className="  flex flex-col gap-4  "
                  >
                    <h1 className="lg:text-h4 text-h5">{item.title}</h1>
                    <p className="lg:text-body-xl text-body-lg text-gray-600">
                      {item.description}
                    </p>
                  </motion.div>
                ),
              )}
          </div>
        </section>
      </main>
      <ContactBox />
      <Footer />
    </>
  );
};

export default TermsPage;
