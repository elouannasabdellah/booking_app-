

const express= require('express');

const HotelModel= require('../models/HotelModel');
const  createError  = require('../Utility/error');

 const { createHotel, updateHotel , deleteHotel , getOneHotel ,getHotels ,contByCity ,contByType} = require('../controllers/hotelsController');

 const { verifyToken, verifyUser , verifyAdmin }= require('../Utility/verifyToken');
 

const router= express.Router();

    // CREATE
    router.post('/' , verifyAdmin, createHotel);

    //UPDATE DELETE GET , GET ALL 

    router.put('/:id' ,verifyAdmin, updateHotel)

    // delete 

    router.delete('/:id' ,verifyAdmin, deleteHotel)

    // Get on hote by id 
    
    router.get('/find/:id' , getOneHotel);

    //Get All
    router.get('/' ,getHotels) ;

    router.get('/contByCity' ,contByCity) ;
    router.get('/contByType' ,contByType) ;





// router.get("/",(req,res)=>{
//     res.send('hotels');
// });






module.exports= router  