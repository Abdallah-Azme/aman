import BrandsSection from "@/components/home/brands-section";
import ContactBox from "@/components/home/contact-box";
import GoalSlider from "@/components/home/goal-slider";
import ProjectSection from "@/components/home/project-section";
import CustomBadage from "@/components/shared/custom-badage";
import CustomLink from "@/components/shared/custom-link";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import { getBrandsPage } from "@/api/brands";
const AboutPage = async () => {
  const t = await getTranslations("about");
  const b = await getTranslations("brands");
  let data;
  const res = await getBrandsPage();
  if (res?.status) {
    data = res?.data;
  } else {
    data = null;
  }

  return (
    <>
      <Navbar />
      <main>
        {/* main content */}
        {data && (
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
                <CustomBadage text={b("badge")} />
                <h1 className="lg:text-h2 text-h3 text-gradient">
                  {data?.title}
                </h1>
                <p className="lg:text-2xl text-lg">{data?.description}</p>
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
                <GoalSlider images={data?.images} />
              </motion.div>
            </div>
          </section>
        )}
        {/* brands section */}
        <BrandsSection withSeeAll={false} numberOfBrands={9} />
        {/* project section */}
        <ProjectSection />
      </main>
      <ContactBox />
      <Footer />
    </>
  );
};

export default AboutPage;
