import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import CustomLink from "../shared/custom-link";
import SectionHeader from "../shared/section-header";
import GoalSlider from "./goal-slider";
import { getFoundations } from "@/api/home";

const GoalSection = async () => {
  const t = await getTranslations("goalSection");
  let data;
  const res = await getFoundations();
  if (res?.status == true) {
    data = res?.data;
  } else {
    data = null;
  }
  return (
    data && (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-primary/20 py-16"
      >
        <div className="container flex items-center gap-12 max-lg:flex-col overflow-hidden">
          {/* content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 lg:w-1/2"
          >
            <SectionHeader title={t("title")} description={data?.title} />
            <p className="lg:text-body-xl text-body-lg max-lg:text-center">
              {data?.description}
            </p>
            <CustomLink href="/about" text={t("learnMore")} />
          </motion.div>
          {/* slider */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <GoalSlider images={data?.images} />
          </motion.div>
        </div>
      </motion.section>
    )
  );
};

export default GoalSection;
