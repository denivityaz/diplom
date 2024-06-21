import type { defaultParams } from "./Default";
export interface Appointment extends defaultParams{
    name: string;
    user_id?: number;
    connect_way: string;
    message: string;
  }