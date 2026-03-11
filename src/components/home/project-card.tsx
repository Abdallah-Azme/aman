import { ProjectItem } from '@/types/home';
import { Badge } from '../ui/badge';
type Props = {
  number: number;
  project: ProjectItem;
}
const ProjectCard = ({ number, project }: Props) => {
  return (
    <div className="bg-white rounded-xl p-6 space-y-4">
      <h3 className="text-h4 text-natural-darker">{number<10 ? `0${number}` : number}</h3>
      <Badge className="text-body-md bg-secondary text-white">{project?.caption}</Badge>
      <div>
        <h2 className="text-h4">{project?.title}</h2>
        <p className="text-body-xl ">{project?.description}</p>
      </div>
    </div>
  );
}

export default ProjectCard