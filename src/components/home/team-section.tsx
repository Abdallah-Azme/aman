import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import SectionHeader from "../shared/section-header";
import TeamSlider from "./team-slider";
import { getTeam } from "@/api/home";
const TeamSection = async () => {
  const t = await getTranslations("team");
  let data;
  const res = await getTeam();
  if (res.status) {
    data = res.data;
  } else {
    data = null;
  }
  return (
    data && (
      <section className="py-16 ">
        <div className="container space-y-8">
          {/* title and see all */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title={t("title")}
              description={data?.team_members_caption}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <TeamSlider teamMembers={data?.team_members} />
          </motion.div>
        </div>
      </section>
    )
  );
};

export default TeamSection;
