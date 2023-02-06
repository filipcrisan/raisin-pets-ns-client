import { Species } from "./species.model";
import { Size } from "./size.model";

export interface Pet {
  id: number;
  name: string;
  avatarUrl: string;
  species: Species;
  size: Size;
  dateOfBirth: Date;
  userId: number;
}
