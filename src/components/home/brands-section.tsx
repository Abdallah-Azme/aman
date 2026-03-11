import { getBrandsHome } from "@/api/home";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import CustomLink from "../shared/custom-link";
import SectionHeader from "../shared/section-header";
import BrandCard from "./brand-card";
import { BrandItem } from "@/types/home";
type Props = {
  withSeeAll?: boolean;
  numberOfBrands?: number;
};
const BrandsSection = async ({
  withSeeAll = true,
  numberOfBrands = 6,
}: Props) => {
  const t = await getTranslations("brandsSection");
  let data;
  const res = await getBrandsHome();
  if (res.status) {
    data = res.data;
  } else {
    data = null;
  }
  return (
    data && (
      <section className="py-16">
        <div className="container space-y-8">
          {/* title and see all */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between max-lg:flex-col "
          >
            <SectionHeader
              className={`${withSeeAll ? "lg:max-w-[60%]" : ""}`}
              title={t("title")}
              description={data?.brand_caption}
            />
            {withSeeAll && <CustomLink href="/" text={t("seeAll")} />}
          </motion.div>
          {/* brands */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-4">
            {data?.brand_details?.map((brand:BrandItem, index:number) => (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
                key={index}
              >
                <BrandCard brand={brand} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default BrandsSection;
