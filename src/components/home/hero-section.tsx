import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CustomBadage from "../shared/custom-badage";
import CustomLink from "../shared/custom-link";
import { Button } from "../ui/button";
import { getHero } from "@/api/home";
import { Link } from "@/i18n/navigation";
const HeroSection = async () => {
  const t = await getTranslations("hero");
  let data;
  const res = await getHero();
  if (res.status == true) {
    data = res?.data;
  } else {
    data = null;
  }


  return (
    <section className="relative h-screen w-full overflow-hidden lg:pt-18 flex items-center justify-center">
      {/* anmated bg */}
      <InteractiveGridPattern />
      {/* content */}
      {data && (
        <div className="container flex items-center justify-between ">
          {/* content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full flex flex-col gap-4 z-1 max-lg:items-center max-lg:text-center "
          >
            <CustomBadage text={t("badge")} />
            <h1 className="lg:text-h1 text-h2 text-gradient">{data?.title}</h1>
            <p className="lg:text-2xl text-lg">{data?.description}</p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="bg-primary text-white rounded-md px-4 h-10 text-base cursor-pointer flex items-center justify-center hover:bg-primary-hover transition-colors duration-300">
                {t("viewPortfolio")}
              </Link>
              <CustomLink href="/about" text={t("ourMission")} />
            </div>
          </motion.div>
          {/* image */}
          <motion.div
            className="w-[45%] max-lg:hidden z-1"
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src={data?.image}
              alt="hero"
              width={500}
              height={500}
              className="w-full object-contain  "
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
