export interface Reminder {
  id: number;
  petId: number;
  title: string;
  body: string;
  hours: number;
  minutes: number;
  enabled: boolean;
}
