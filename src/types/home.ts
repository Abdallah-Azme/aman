export interface BrandItem {
    id: number;
  title: string;
  caption:string,
    description: string;
    image: string;
}

export interface ProjectItem {
    id: number;
    title: string;
    caption: string;
    description: string;
}

export interface GoalItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface TeamMember {
    id: number;
    name: string;
    specialty: string;
    image: string;
}

export interface FaqItem {
  id: number;
    question: string;
    answer: string;
}

