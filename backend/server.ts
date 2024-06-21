import express from 'express'
import dotenv from 'dotenv'
import course from './routers/crud/courses'
import user from './routers/crud/user'
import auth from './routers/auth'
import appointment from './routers/crud/appointment'
import category from './routers/crud/category'
import courseComment from './routers/crud/courseComment'
import purchase from './routers/crud/purchase'
import fs from "fs"
import https from "https"
import path from "path"

import fileUpload from 'express-fileupload'
import morgan from "morgan"
import cors from "cors"
import compress from "compression"
dotenv.config()
const app  = express()
const port = process.env.PORT || 3000


app.use(fileUpload());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  express.json({
    limit: "25mb",
  })
);
app.use(
  express.urlencoded({
    limit: "25mb",
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(compress());

app.use("/api/appointment", appointment);
app.use("/api/category", category);
app.use("/api/course_comment", courseComment);
app.use("/api/course", course);
app.use("/api/purchase", purchase);
app.use("/api/user", user);
app.use("/api/login", auth);

// const httpsOptions = {
//   key: fs.readFileSync("/etc/letsencrypt/live/sponq.ru/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/sponq.ru/fullchain.pem"),
// };
app.use("/", express.static(path.join(__dirname, "/public/")));
app.listen(3333,()=>{
  console.log('start');
  
})
// https.createServer(httpsOptions, app).listen(3332, async () => {
//   try {
//     console.log("Start 3322");
//   } catch (e) {
//     console.log(e);
//   }
// });

