import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from "cors"
import foodRouter from './routers/food.router'
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import adminRouter from "./routers/admin.router"
import checkoutRouter from "./routers/checkout.router"

import { dbConnect } from './configs/database.config';
dbConnect();


const app =express();
app.use(express.json());
app.use(express.static('public'))

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods",foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin",adminRouter);
app.use("/checkout",checkoutRouter);

const port=5000
const server = app.listen(port,()=>{
    console.log("Website Served on http://localhost:"+port);
});