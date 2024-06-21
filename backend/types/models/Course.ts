import type { defaultParams } from "./Default";
export interface Course extends defaultParams{
    title: string;
    price: number;
    description: string;
    demo_path?: string;
    full_path?: string;
    img_path?: string;
    category_id: number;
    userHave?: boolean
}