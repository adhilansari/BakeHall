
import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { Food, FoodModel } from "../models/food.model";


const router =Router();


//get all foods
router.get('/',asyncHandler(
    async (req,res)=>{
        const foods= await FoodModel.find()
        res.send(foods)
    }
));


//create food
router.post('/food',asyncHandler(
    async (req,res)=>{
        console.log(req.body+'req.body');
        
        const { name, cookTime, price, tags,origins,imageUrl } = req.body
        const newFood:Food={
            id:'',
            name,
            price,
            tags,
            favorite:false,
            stars:0,
            imageUrl,
            origins,
            cookTime
        };

        const dbFood= await FoodModel.create(newFood)
        res.send(dbFood)
    }
));

//delete food
router.delete('/food/:id',
    async (req,res)=>{
        const {id}=req.params
        console.log(id);
        
        const food = await FoodModel.findByIdAndDelete(id)
        
        if(!food){
			 res.status(404).json({message:`cannot find any Food with ID ${id}`});
		}
		res.status(200).json(food)
    }
);

// //update food
router.put('/food/:id',
    async (req,res)=>{
        const id=req.params.id
        console.log(id)
        console.log(req.params);
        console.log(req.body);
        
        
        const food = await FoodModel.findByIdAndUpdate(id,req.body)
        if(!food){
			 res.status(404).json({message:`cannot find any food with ID ${id}`});
		}
		const updatedFood = await FoodModel.findById(id)
		res.status(200).json(updatedFood)
    }
)


// router.put('/food/:id' , async (req,res)=>{
//           const id=req.params.id
//           console.log(id)
//           const food = await FoodModel.findByIdAndUpdate(id,req.body)
//           if(!food){
//                res.status(404).json({message:`cannot find any food with ID ${id}`});
//           }
//           const updatedFood = await FoodModel.findById(id)
//           res.status(200).json(updatedFood)
// })



export default router;
