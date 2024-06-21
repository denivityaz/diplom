import type { defaultParams } from "./Default";
export interface CourseComment extends defaultParams{
    comment_text: string;
    user_id: number;
    course_id: number;
  }