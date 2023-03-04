import { Species } from "./species.model";
import { Size } from "./size.model";

export interface Pet {
  id: number;
  name: string;
  avatarInBase64: string;
  species: Species;
  size: Size;
  dateOfBirth: Date;
  userId: number;
}
