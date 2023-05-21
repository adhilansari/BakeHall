import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from 'express-async-handler'
import { FoodModel } from "../models/food.model";
const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) {
            res.send("seed is already done!");
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("seed id done!")
    }
));

//get all
router.get('/', asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find()
        res.send(foods)
    }
));

//get searched items
router.get("/search/:searchKey", asyncHandler(
    async (req, res) => {
        const searchRegEx = new RegExp(req.params.searchKey , "i" )        
        const foods = await FoodModel.find({ name: { $regex: searchRegEx} })
        res.send(foods)
    }
));

//get favorites
router.get("/favorites/:isFavorite", asyncHandler(
    async (req, res) => {

        const foods = await FoodModel.find({ favorite: true })

        res.send(foods)
    }
));

//get tags
router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all)

        res.send(tags)
    }
));

//get by tags name
router.get("/tags/:tagName", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find({ tags: req.params.tagName })
        res.send(foods)
    }
));

//get by id
router.get("/:foodId", asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId)
        res.send(food)
    }
));


router.put('/',asyncHandler(
    async (req,res)=>{        
        const favFood = await FoodModel.findOneAndUpdate({_id:req.body.id},[{$set:{favorite:{$not:"$favorite"}}}])        
        res.send(favFood)
    }
))

export default router;