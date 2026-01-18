import sectsData from './sects.json';

export interface ISect {
  id: string;
  label: string;
  color: string;
  bgGradient: string;
  sects: {
    id: string;
    name: string;
    slogan: string;
    description: string;
    imagePlaceholderColor: string;
    characterImage?: string;
  }[];
}

export const SECTS_DATA: ISect[] = sectsData as ISect[];