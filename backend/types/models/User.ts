import type { defaultParams } from "./Default";
export interface User extends defaultParams{
    name: string;
    email: string;
    isadmin: boolean;
    hashed_password: string;
    registration_at: Date;
    about?: string;
  }