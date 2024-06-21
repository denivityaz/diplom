import type { NextFunction, Response, Request } from "express";

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

function generateAccessToken(user:any) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "8640000s" });
}

function authenticateToken(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if(token == undefined && req.method == 'GET'){
    console.log(token, req.method == 'GET');
    
    next()
    return
}
console.log(123123123);

  if (token == null) return res.sendStatus(401);
    
  
  jwt.verify(token, process.env.TOKEN_SECRET, (err:any, user:any) => {
    if (err) return res.sendStatus(403);
    //@ts-ignore
    req.user = user;
    next();
  });
}
export = {
  generateAccessToken,
  authenticateToken,
};
