import { Router } from "express";

const router = Router();
import pg from "../../database/postgresql";
import type { Request, Response } from "express";
import type { Course } from "../../types/models/Course";
import authMiddleware from "../../middleware/auth";

router.post(
  "/",
  authMiddleware.authenticateToken,
  async (req: Request, res: Response) => {
    const body = <Course>req.body;
    //@ts-ignore
    const user = <User>req.user;
    if (!user.isadmin)
      return res.status(404).json({ message: "you are not admin" });
    await pg.createCourse(body);
    return res.status(201).json({
      message: "Course created successfully",
    });
  }
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const user = <User>req.user;
    if (!user) {
      let data;
      data = await pg.getCourses(false);
      return res.status(200).json(data);
    }
    const userAllPurchase = await pg.getAllPurchaseByUser(user.id);

    let data;
    if (!user.isadmin) data = await pg.getCourses(false);
    else data = await pg.getCourses(true);

    data.map((item) => {
      const id = item.id;
      const PurchaseCourse = userAllPurchase.find(
        (purchase) => purchase.course_id === id
      );
      if (PurchaseCourse) item.userHave = true;
      else item.userHave = false;
      return item;
    });
    return res.status(200).json(data);
  }
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const user = <User>req.user;

    if (!user) {
      const data = await pg.getCoursesByID(+req.params.id);
      const response = {
        title: data.title,
        price: data.price,
        description: data.description,
        img_path: data.img_path,
        demo_path: data.demo_path,
      };
      return res.status(200).json(response);
    }

    const userHaveCourse = await pg.getPurchaseByUser(user.id, +req.params.id);

    const data = await pg.getCoursesByID(+req.params.id);
    let response;
    if (!userHaveCourse) {
      response = {
        title: data.title,
        price: data.price,
        description: data.description,
        img_path: data.img_path,
        demo_path: data.demo_path,
      };
    } else {
      response = {
        title: data.title,
        price: data.price,
        description: data.description,
        full_path: data.full_path,
        img_path: data.img_path,
      };
    }
    return res.status(200).json(response);
  }
);
router.put(
  "/",
  authMiddleware.authenticateToken,
  async (req: Request, res: Response) => {
    const body = <Course>req.body;

    //@ts-ignore
    const user = <User>req.user;
    if (!user.isadmin)
      return res.status(404).json({ message: "you are not admin" });

    if (body.id) await pg.updateCourse(body.id, body);
    return res.status(201).json({
      message: "Course update successfully",
    });
  }
);
router.delete(
  "/",
  authMiddleware.authenticateToken,
  async (req: Request, res: Response) => {
    const body = <Course>req.body;

    //@ts-ignore
    const user = <User>req.user;
    if (!user.isadmin)
      return res.status(404).json({ message: "you are not admin" });

    if (body.id) await pg.deleteCourse(body.id);
    return res.status(201).json({
      message: "Course delete successfully",
    });
  }
);
export default router;
