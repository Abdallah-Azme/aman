import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PiTargetBold } from "react-icons/pi";
import { GoalItem } from "@/types/home";
const MissionCard = ({goal, index}: {goal: GoalItem, index: number}) => {
  const t = useTranslations("about.goals");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 1 + index * 0.1 }}
      viewport={{ once: true }}
      className="group border border-natural-dark rounded-xl p-6  bg-white hover:bg-linear-to-b hover:from-primary hover:to-secondary hover:border-white flex  gap-4 odd:flex-col-reverse even:flex-col"
    >
      <Image
        src={goal?.image}
        alt={goal?.title}
        width={200}
        height={200}
        className="w-full h-50  object-cover rounded-lg  "
      />
      <div className="border border-natural-dark p-4 rounded-lg group-hover:border-white space-y-2">
        <h2 className=" flex items-center gap-2 text-text text-h5 group-hover:text-white pb-2 border-b border-natural-dark  group-hover:border-white ">
          <PiTargetBold />
          {goal?.title}
        </h2>
        <p className=" text-body-xl group-hover:text-white ">
          {goal?.description}
        </p>
      </div>
    </motion.div>
  );
};

export default MissionCard;
