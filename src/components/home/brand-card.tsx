import { Link } from "@/i18n/navigation";
import { MdArrowOutward } from "react-icons/md";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";
import { BrandItem } from "@/types/home";
import Image from "next/image";

const BrandCard = ({ brand }: { brand: BrandItem }) => {
  const t = useTranslations("brandsSection.card");
  return (
    <div className="h-full flex flex-col justify-between w-full p-6 bg-grad-primary-secondary rounded-xl space-y-4">
      {/* placeholder */}
      <div className="size-24  bg-slate-300 rounded-full flex items-center justify-center overflow-hidden">
        <Image
          src={brand?.images[0]}
          alt={brand?.title}
          width={100}
          height={100}
          className=" object-cover"
        />
      </div>
      {/* badage */}
      <div className="text-wrap rounded-full py-1 px-3 text-body-sm bg-secondary text-white">
        {brand?.caption}
      </div>
      {/* name */}
      <h3 className="text-h4 text-white">{brand?.title}</h3>
      {/* description */}
      <p className=" text-primary-light-active line-clamp-3">{brand?.description}</p>
      {/* link */}
      <Link
        href={`/brands/${brand?.id}`}
        className=" text-base h-10 w-fit px-2 flex items-center  gap-1 text-white hover:text-text hover:bg-white  transition-all duration-300 ease-in-out"
      >
        {t("link")} <MdArrowOutward className="rtl:rotate-y-180" />
      </Link>
    </div>
  );
};

export default BrandCard;
