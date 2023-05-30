import { Router, json } from "express";
import { Food } from "../models/food.model";

const router =Router();



const stripe = require('stripe')(process.env.STRIPE_SECRET);

  router.post("/", async (req,res,next)=>{
  
    // console.log(req.body.items.items.map((item:any) => (item)))
    const products:Array<any> = req.body.items.items

      

    
    try {
        const session = await stripe.checkout.sessions.create({
          
            payment_method_types: ['card'],
            // shipping_address_collection: {
            // allowed_countries: ['US', 'IN'],
            // },

                shipping_options: [
                {

                    shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'INR',
                    },
                    display_name: 'Free shipping',
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                        unit: 'business_day',
                        value: 5,
                        },
                        maximum: {
                        unit: 'business_day',
                        value: 7,
                        },
                    }
                    }
                },
                {
                    shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'INR',
                    },
                    display_name: 'Next day air',
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                        unit: 'business_day',
                        value: 1,
                        },
                        maximum: {
                        unit: 'business_day',
                        value: 1,
                        },
                    }
                    }
                },
                ],
               line_items:  products.map((item:any) => ({
                
                
                price_data: {
                  currency: 'INR',
                  product_data: {
                    name: item.food.name,
                    images: [item.food.imageUrl]
                  },
                  unit_amount:item.price *100,
                },
                quantity: item.quantity,
                
              })),

               mode: "payment",
               success_url: "https://bake-hall.onrender.com/success.html",
               cancel_url: "https://bake-hall.onrender.com/cancel.html",

            });

            
    
            res.status(200).json(session);

            

    } catch (error) {
        next(error)
    }
  })




export default router;
