const Restaurant = require ('../models/Restaurant');

module.exports = {
    addRestaurant: async(req,res)=>{
        const newRestaurant = new Restaurant(req.body);

        try {
            await newRestaurant.save()
            res.status(201).json({status: true, message:'Restaurant created successfully'})
        } catch (error) {
            res.status(500).json({status: false, message:"Error creating restaurant"});            
        }
    },

    serviceAvailability:async(req, res)=>{
        const restaurantId = req.params.id;

        try {
            const restaurant = await Restaurant.findById(restaurantId);

            if(!restaurant){
                return res.status(403).json({status:false, message: 'Restaurant not found'})
            }
            restaurant.isAvailable = !restaurant.isAvailable
            await restaurant.save()
            res.status(200).json({status: true, message: "Availability successfully changed", isAvailable: restaurant.isAvailable});
        } catch (error) {
            res.status(500).json({status:false, message: "error creating restaurant"})
        }
    },

    deleteRestaurant:async(req,res) => {
        const restaurantId = req.params.id;

        try {
            const restaurant = await Restaurant.findById(restaurantId);
            if(!restaurant){
                return res.status(403).json({status:false, message: 'Restaurant not found'})
            }
            await Restaurant.findByIdAndDelete(restaurantId);
            res.status(200).json({status:true, message:'Restaurant deleted'})
        } catch (error) {
            res.status(500).json({status:false, message:'An error occurred'})
        }
    },

    getRestaurant : async(req,res) =>{
        const restaurantId = req.params.id

        try {
            const restaurant = await Restaurant.findById(restaurantId);
            if(!restaurant){
                return res.status(403).json({status:false, message:"Not found"})
            }
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({status:false, message:"Server error"})
        }
    },

    getRandomRestaurant:async (req,res)=>{
        try{
            let randomRestaurant = [];

            if(req.params.code){
                randomRestaurant = await Restaurant.aggregate([
                    {$match: {code: req.params.code}},
                    {$sample: {size: 5}},
                    {$project:{__v: 0}}
                ]);
            }

            if(!randomRestaurant.length){
                randomRestaurant = await Restaurant.aggregate([
                    {$sample:{size: 5}},
                    {$project:{__v: 0}}
                ])
            }
        }
        catch (error) {
            res.status(500).json({status:false, message:'Error occurred'})
        }
    },
}