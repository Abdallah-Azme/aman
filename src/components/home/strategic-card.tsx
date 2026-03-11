import { GoalItem } from "@/types/home";
import Image from "next/image";
const StrategicCard = ({goal}: {goal: GoalItem}) => {
  return (
    <div className="w-full p-6 bg-grad-primary-secondary rounded-xl ">
      {/* icon */}
      <div className="size-16 bg-white rounded-lg flex items-center justify-center mb-12">
        <Image src={goal.image} alt={goal.title} width={50} height={50}  className="object-contain size-14"/>
      </div>
      {/* name */}
      <h3 className="text-h4 text-white mb-6">{goal.title}</h3>
      {/* description */}
      <p className="text-white text-body-xl">{goal.description} </p>
    </div>
  );
};

export default StrategicCard;
