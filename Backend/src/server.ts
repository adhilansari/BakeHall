import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from "cors"
import foodRouter from './routers/food.router'
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import adminRouter from "./routers/admin.router"
import { dbConnect } from './configs/database.config';
import { Server } from "socket.io";
// import { db } from './configs/database.config';

dbConnect();


const app =express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods",foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin",adminRouter)


const port=5000
const server = app.listen(port,()=>{
    console.log("Website Served on http://localhost:"+port);
});

const io = new Server(server);


// db.on("error", (error) => {
//     console.error(error);
//   });
  
//   db.once("open", () => {
//     console.log("Connected to database");
//   });

  
  
  // io.on("connection", (socket) => {
  //   console.log("A user has connected");
  
  //   socket.on("disconnect", () => {
  //     console.log("A user has disconnected");
  //   });
  // });