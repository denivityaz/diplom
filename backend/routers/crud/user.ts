import {Router} from 'express'

const router = Router();
import pg from '../../database/postgresql'
import type {Request, Response} from 'express'
import type { User } from '../../types/models/User';
import hashPassword from '../../utils/bcrypt';
import authMiddleware from "../../middleware/auth" 

router.post("/", async (req:Request, res:Response) => {
    const body = <User>req.body;
    const pass = await hashPassword(body.hashed_password)
    if(!pass) return res.status(400).json({
        err: 'err'
    })
    body.hashed_password = pass
    await pg.createUsers(body);
    return res.status(201).json({
        message: 'User created successfully',
    });
})


router.get("/", authMiddleware.authenticateToken, async (req:Request, res:Response) => {
    //@ts-ignore
    const user = <User>req.user
    
    if(user.isadmin){
        const data = await pg.getUsers();
        return res.status(200).json(data);
    }else
    {
        return res.status(404).json({message: 'you are not admin'});

    }
})
router.put("/", authMiddleware.authenticateToken, async (req:Request, res:Response) => {
    const body = <User>req.body;
    //@ts-ignore
    const user = <User>req.user
    if(user.id){
    await pg.updateUsers(user.id, body);
        return res.status(201).json({
            message: 'User update successfully',
        });
    }else{
        return res.status(401).json('Unauthorized')
    }
})
router.delete("/",authMiddleware.authenticateToken, async (req:Request, res:Response) => {
    const body = <User>req.body;
    //@ts-ignore
    const user = <User>req.user
    if(user.isadmin){
    if(body.id)
    await pg.deleteUsers(body.id);
    return res.status(201).json({
        message: 'User delete successfully',
    })
    }else {
        return res.status(404).json({message: 'you are not admin'});
    }
})
export default router;
