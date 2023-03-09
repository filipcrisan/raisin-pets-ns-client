import { TutorialCategory } from './tutorial-category.model';
import { Species } from './species.model';
import { Size } from './size.model';

export interface Tutorial {
  id: number;
  name: string;
  category: TutorialCategory;
  species: Species;
  size: Size;
  minAgeInYears: number;
  maxAgeInYears: number;
  frequency: string;
  content: string;
}
