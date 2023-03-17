import { Checkpoint } from "./checkpoint.model";

export interface Exercise {
  id?: number;
  petId: number;
  name?: string;
  totalDistance: number;
  averageSpeed: number;
  checkpoints: Checkpoint[];
}
