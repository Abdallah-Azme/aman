import { getCompanyInfo, getWhoUs } from "@/api/about";
import MissonSection from "@/components/about/misson-section";
import ContactBox from "@/components/home/contact-box";
import GoalSlider from "@/components/home/goal-slider";
import TeamSection from "@/components/home/team-section";
import Counters from "@/components/shared/counters";
import CustomBadage from "@/components/shared/custom-badage";
import CustomLink from "@/components/shared/custom-link";
import CustomProgress from "@/components/shared/custom-progress";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
const AboutPage = async () => {
  const t = await getTranslations("about");
  let data;
  let companyInfo;
  const res = await getWhoUs();
  if (res?.status) {
    data = res?.data;
  } else {
    data = null;
  }
  const companyInfoRes = await getCompanyInfo();
  if (companyInfoRes?.status) {
    companyInfo = companyInfoRes?.data;
  } else {
    companyInfo = null;
  }
  return (
    <>
      <Navbar />
      <main>
        {/* main content */}
        <section className="relative lg:h-screen w-full overflow-hidden lg:pt-18 pt-24 flex items-center justify-center">
          {/* anmated bg */}
          <InteractiveGridPattern />
          {/* content */}
          {data && (
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
          )}
        </section>
        {/* goals */}
        <section className="bg-primary/20 py-16">
          <MissonSection />
        </section>
        {/* team */}
        <TeamSection />
        {/* statisics */}
        {companyInfo?.skills?.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className=" py-16"
          >
            <div className="container lg:flex justify-between ">
              <div className="w-[38%] max-lg:hidden space-y-4 relative">
                <Image
                  src={companyInfo?.first_image}
                  alt="statistics"
                  width={200}
                  height={200}
                  className="w-full rounded-2xl max-h-[250px] object-cover"
                />
                <Image
                  src={companyInfo?.second_image}
                  alt="statistics"
                  width={200}
                  height={200}
                  className="w-full rounded-2xl max-h-[250px] object-cover"
                />
                <Image
                  src={"/about-arrow.svg"}
                  alt="statistics"
                  width={200}
                  height={200}
                  className="size-40 absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 hover:rotate-y-180 transition-all "
                />
              </div>
              <div className="lg:w-[60%] flex flex-col  gap-10">
                <div>
                  <h3 className="text-h3 text-gradient">
                    {companyInfo?.title}
                  </h3>
                  <p className="text-body-xl text-natural-darker">
                    {companyInfo?.description}
                  </p>
                </div>
                <div className="flex flex-col gap-8">
                  {companyInfo?.skills.map(
                    (
                      item: { name: string; percentage: number },
                      index: number,
                    ) => (
                      <CustomProgress
                        key={index}
                        number={item.percentage}
                        title={item.name}
                      />
                    ),
                  )}
                </div>
                {/* <Button className="w-fit h-14 rounded-full text-body-md px-8! text-white">
                  {t("statistics.link")}
                  <FaArrowRightLong />
                </Button> */}
              </div>
            </div>
          </motion.section>
        )}
        {companyInfo?.counters?.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Counters counters={companyInfo?.counters} />
          </motion.section>
        )}{" "}
      </main>
      <ContactBox />
      <Footer />
    </>
  );
};

export default AboutPage;
