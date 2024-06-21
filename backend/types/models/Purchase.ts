import type { defaultParams } from "./Default";
export interface Purchase extends defaultParams{
    detail: string;
    user_id: number;
    course_id: number;
}