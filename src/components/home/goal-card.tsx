import { GoalItem } from '@/types/home';
import { IoSettingsOutline } from 'react-icons/io5';

const GoalCard = ({goal,number}:{goal:GoalItem,number:number}) => {
  return (
    <div className="bg-white rounded-xl lg:p-8 p-6 space-y-4">
      <h3 className="text-h4 text-natural-darker">
        {number < 10 ? `0${number}` : number}
      </h3>
      <div>
        <h2 className="text-h4 flex items-center gap-1">
          <IoSettingsOutline />
          {goal?.title}
        </h2>
        <p className="text-body-xl ">{goal?.description}</p>
      </div>
    </div>
  );
}

export default GoalCard