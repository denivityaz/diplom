import {Router} from 'express'

const router = Router();
import pg from '../../database/postgresql'
import type {Request, Response} from 'express'
import type { CourseComment } from '../../types/models/CourseComment';


router.post("/", async (req:Request, res:Response) => {
    const body = <CourseComment>req.body;
    await pg.createCourseComment(body);
    return res.status(201).json({
        message: 'CourseComment created successfully',
    });
})
router.get("/", async (req:Request, res:Response) => {
    const data = await pg.getCourseComment();
    return res.status(200).json(data);
})
router.put("/", async (req:Request, res:Response) => {
    const body = <CourseComment>req.body;
    body.updated_at = new Date()
    if(body.id)
    await pg.updateCourseComment(body.id, body);
    return res.status(201).json({
        message: 'CourseComment update successfully',
    });
})
router.delete("/", async (req:Request, res:Response) => {
    const body = <CourseComment>req.body;
    if(body.id)
    await pg.deleteCourseComment(body.id);
    return res.status(201).json({
        message: 'CourseComment delete successfully',
    });
})
export default router;
