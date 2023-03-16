import { Checkpoint } from "./checkpoint.model";

export interface Exercise {
  id: number;
  petId: number;
  name: string;
  checkpoints: Checkpoint[];
}
