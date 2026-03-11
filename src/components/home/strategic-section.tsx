import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import SectionHeader from "../shared/section-header";
import StrategicCard from "./strategic-card";
import { getStrategic } from "@/api/home";
import { GoalItem } from "@/types/home";
const StrategicSection = async () => {
  const t = await getTranslations("strategic");
  let data;
  const res = await getStrategic();
  if (res.status) {
    data = res.data;
  } else {
    data = null;
  }
  return (
    data && (
      <section className="py-16 bg-primary/20">
        <div className="container space-y-8">
          {/* title and see all */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <SectionHeader title={t("title")} description={data?.goals_title} />
          </motion.div>
          {/* card */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data?.goals.map((goal:GoalItem, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
                key={index}
              >
                <StrategicCard goal={goal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default StrategicSection;
