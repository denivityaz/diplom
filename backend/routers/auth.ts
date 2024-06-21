import { Router } from "express" 
const router = Router();
import authMiddleware from "../middleware/auth" 
import pg from '../database/postgresql'
import hashPassword from "../utils/bcrypt";
interface Auth {
    email: string
    password: string
}
router.post("/", async (req, res) => {

    const {email, password} = <Auth>req.body
  const data = await pg.getUsersByEmail(email)
  const passHash = await hashPassword(password)

  if (data == false) {
    res.json({ error: "Не верный email" });
  } else if (passHash == data.hashed_password) {
    res.json({
      result: true,
      user: {
        email: data.email,
        isadmin: data.isadmin,
        id: data.id
      },
      token: authMiddleware.generateAccessToken({
        email: req.body.email,
        isadmin: data.isadmin,
        id: data.id
      }),
    });
  } else {
    res.json({ error: "Не верный пароль" });
  }
});

export default router;
