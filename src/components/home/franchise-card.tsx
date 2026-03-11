import { IoSettingsOutline } from "react-icons/io5";

const FranchiseCard = ({description}: {description: string}) => {
  
  return (
    <div className="bg-white rounded-xl lg:p-8 p-6 space-y-4 border-2 h-full">
      <IoSettingsOutline className="text-h4"/>
      <p className="text-h5 ">{description}</p>
    </div>
  );
};

export default FranchiseCard;
