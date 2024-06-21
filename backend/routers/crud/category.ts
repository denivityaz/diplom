import {Router} from 'express'

const router = Router();
import pg from '../../database/postgresql'
import type {Request, Response} from 'express'
import type { Category } from '../../types/models/Category';


router.post("/", async (req:Request, res:Response) => {
    const body = <Category>req.body;
    await pg.createCategory(body);
    return res.status(201).json({
        message: 'Category created successfully',
    });
})
router.get("/", async (req:Request, res:Response) => {
    const data = await pg.getCategory();
    return res.status(200).json(data);
})
router.put("/", async (req:Request, res:Response) => {
    const body = <Category>req.body;
    body.updated_at = new Date()
    if(body.id)
    await pg.updateCategory(body.id, body);
    return res.status(201).json({
        message: 'Category update successfully',
    });
})
router.delete("/", async (req:Request, res:Response) => {
    const body = <Category>req.body;
    if(body.id)
    await pg.deleteCategory(body.id);
    return res.status(201).json({
        message: 'Category delete successfully',
    });
})
export default router;
