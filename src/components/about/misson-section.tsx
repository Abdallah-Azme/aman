import { getTranslations } from "next-intl/server";
import SectionHeader from "../shared/section-header";
import MissionCard from "./mission-card";
import * as motion from "motion/react-client";
import CustomLink from "../shared/custom-link";
import { getAboutFoundations } from "@/api/about";
import { GoalItem } from "@/types/home";

type props = {
  withLink?: boolean;
};
const MissonSection = async ({ withLink = true }: props) => {
  const t = await getTranslations("about");
  let data;
  const res = await getAboutFoundations();
  if (res?.status) {
    data = res?.data;
  } else {
    data = null;
  }
  return (
    data && (
      <div className="container flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 z-1 max-lg:items-center max-lg:text-center "
        >
          <SectionHeader title={t("goals.title")} description={data?.caption} />
          <p className="text-body-md">{data?.description}</p>
        </motion.div>
        {/* goals cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {data?.details?.map((goal: GoalItem, index: number) => (
            <MissionCard goal={goal} key={index} index={index} />
          ))}
        </div>

        {withLink && <CustomLink href="/strategic" text={t("goals.learnMore")} />}
      </div>
    )
  );
};

export default MissonSection;
