import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import SectionHeader from "../shared/section-header";
import ProjectSlider from "./project-slider";
import { getProjects } from "@/api/home";

const ProjectSection = async () => {
  const t = await getTranslations("projectSection");
  let data;
  const res = await getProjects();
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
            <SectionHeader
              className="lg:max-w-[60%]"
              title={t("title")}
              description={data?.feature_project_caption}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <ProjectSlider projects={data?.feature_projects} />
          </motion.div>
        </div>
      </section>
    )
  );
};

export default ProjectSection;
