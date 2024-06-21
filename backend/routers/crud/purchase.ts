import {Router} from 'express'

const router = Router();
import pg from '../../database/postgresql'
import type {Request, Response} from 'express'
import type { Purchase } from '../../types/models/Purchase';


router.post("/", async (req:Request, res:Response) => {
    const body = <Purchase>req.body;
    await pg.createPurchase(body);
    return res.status(201).json({
        message: 'Purchase created successfully',
    });
})
router.get("/", async (req:Request, res:Response) => {
    const data = await pg.getPurchase();
    return res.status(200).json(data);
})
router.put("/", async (req:Request, res:Response) => {
    const body = <Purchase>req.body;
    body.updated_at = new Date()
    if(body.id)
    await pg.updatePurchase(body.id, body);
    return res.status(201).json({
        message: 'Purchase update successfully',
    });
})
router.delete("/", async (req:Request, res:Response) => {
    const body = <Purchase>req.body;
    if(body.id)
    await pg.deletePurchase(body.id);
    return res.status(201).json({
        message: 'Purchase delete successfully',
    });
})
export default router;
