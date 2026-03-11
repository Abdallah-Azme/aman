import ContactBox from "@/components/home/contact-box";
import GoalSlider from "@/components/home/goal-slider";
import CustomBadage from "@/components/shared/custom-badage";
import CustomLink from "@/components/shared/custom-link";
import Footer from "@/components/shared/footer";
import Gallery from "@/components/shared/gallery";
import Navbar from "@/components/shared/navbar";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";

const BrandDetailsPage = () => {
  const t = useTranslations("singleBrand");
  return (
    <>
      <Navbar />
      <main>
        {/* main content */}
        <section className="relative lg:h-screen w-full overflow-hidden lg:pt-18 pt-24 flex items-center justify-center">
          {/* anmated bg */}
          <InteractiveGridPattern />
          {/* content */}
          <div className="container flex items-center justify-between max-lg:flex-col gap-4 ">
            {/* content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full flex flex-col gap-4 z-1 max-lg:items-center max-lg:text-center "
            >
              <CustomBadage text={t("badge")} />
              <h1 className="lg:text-h2 text-h3 text-gradient">{t("title")}</h1>
              <p className="lg:text-2xl text-lg">{t("description")}</p>
              <CustomLink href="/" text={t("learnMore")} />
            </motion.div>
            {/* slider */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              <GoalSlider  />
            </motion.div>
          </div>
        </section>
        {/* why people choose */}
        <section className="py-16">
          <div className="container space-y-8">
            <motion.h2
              className="text-h3 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {t("why.title")}
            </motion.h2>
            {/* cards */}
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="lg:flex-[0_0_calc(33.333%-1rem)] lg:grow md:flex-[0_0_calc(50%-1rem)] md:grow flex-[0_0_calc(100%-1rem)] flex flex-col gap-4 p-6 border rounded-lg"
                >
                  <h3 className="text-h5">{t("why.card.title")}</h3>
                  <p className="text-body-lg">{t("why.card.description")}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* gallery */}
        <section className="py-16">
          <div className="container space-y-8">
            <motion.h2
              className="text-h3 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {t("gallery")}
            </motion.h2>
            <Gallery />
          </div>
        </section>
      </main>
      <ContactBox/>
      <Footer />
    </>
  );
};

export default BrandDetailsPage;
