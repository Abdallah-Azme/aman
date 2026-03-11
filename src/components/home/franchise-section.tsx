import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import CustomLink from "../shared/custom-link";
import SectionHeader from "../shared/section-header";
import { getFranchise } from "@/api/home";
const FranchiseSection = async () => {
  const t = await getTranslations("franchise");
  let data;
  const res = await getFranchise();
  if (res.status) {
    data = res.data;
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
        className="py-16 "
      >
        <div className="container flex items-center justify-between    max-lg:flex-col max-lg:gap-8">
          <div className="lg:max-w-80">
            <SectionHeader title={t("title")} description={data?.title} />
          </div>

          <div className="lg:max-w-[60%] space-y-4 ">
            <p className="lg:text-body-xl text-body-md max-lg:text-center">
              {data?.description}
            </p>
            <CustomLink href="/franchise" text={t("cta")} />
          </div>
        </div>
      </motion.section>
    )
  );
};

export default FranchiseSection;
