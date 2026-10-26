export type HomeIconName = 'monitor' | 'server' | 'brain' | 'rocket' | 'team' | 'graduate' | 'chart';

export interface Feature {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: HomeIconName;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  isMockup?: boolean;
  githubUrl?: string;
  websiteUrl?: string;
}
