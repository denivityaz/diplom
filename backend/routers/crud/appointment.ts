import {Router} from 'express'

const router = Router();
import pg from '../../database/postgresql'
import type {Request, Response} from 'express'
import type { Appointment } from '../../types/models/Appointment';


router.post("/", async (req:Request, res:Response) => {
    const body = <Appointment>req.body;
    await pg.createAppointment(body);
    return res.status(201).json({
        message: 'Appointment created successfully',
    });
})
router.get("/", async (req:Request, res:Response) => {
    const data = await pg.getAppointment();
    return res.status(200).json(data);
})
router.put("/", async (req:Request, res:Response) => {
    const body = <Appointment>req.body;
    body.updated_at = new Date()
    if(body.id)
    await pg.updateAppointment(body.id, body);
    return res.status(201).json({
        message: 'Appointment update successfully',
    });
})
router.delete("/", async (req:Request, res:Response) => {
    const body = <Appointment>req.body;
    if(body.id)
    await pg.deleteAppointment(body.id);
    return res.status(201).json({
        message: 'Appointment delete successfully',
    });
})
export default router;
