
const HotelModel= require('../models/HotelModel');

 exports.createHotel= async(req,res,next)=>{

    try{
    
        const { name,type, city, adress, distance, desc, cheapestPrice}= req.body;
        console.log(req.body);

        const Hotel= await HotelModel.create({name, type,city,adress,distance,desc, cheapestPrice });

        res.status(201).json(Hotel);

    } catch (e){
        res.status(400).json(e.message);
    }

}

// update hotel

 exports.updateHotel= async(req,res,next)=>{


    try{
    
        const updateHotel= await HotelModel.findByIdAndUpdate(req.params.id, { $set:req.body }, {new:true} )

        res.status(201).json(updateHotel);

    } catch (e){
        res.status(400).json(e.message);
    }


 }

 exports.deleteHotel= async(req,res,next)=>{


    try{
    
        const deleteHotel= await HotelModel.findByIdAndDelete(req.params.id)

        res.status(201).json("hotel has been deleted");

    } catch (e){
        res.status(400).json(e.message);
    }


 }

 // get hotel  by id 

 exports.getOneHotel= async(req,res,next)=>{


    try{
    
        const gteOnHotel= await HotelModel.findById(req.params.id)
    
        res.status(201).json(gteOnHotel);
    
    } catch (e){
        res.status(400).json(e.message);
    }


 }
   //Get All

   exports.getHotels= async(req,res,next)=>{

        const {min,max, ...others}= req.query;

        try{
        
            const Hotels= await HotelModel.find({...others , 
                cheapestPrice:{$gt:min || 1 , $lt:max || 999 }
            }).limit(req.query.limit)

            res.status(201).json({data:Hotels.data, numberHotels: Hotels.length});
            

        } catch (e){
        // res.status(400).json(e.message);
        next(e)
        }


   }

   // hotels/countByCity?cities=agadir,marrakech,tanger :  =>par exemple

   exports.contByCity= async(req,res,next)=>{

    const cities= req.query.cities.split(",")
    try{
    
        const List= await Promise.all(cities.map((city)=>{
            return HotelModel.countDocuments({city:city})
        }))

        res.status(201).json( List );

    } catch (e){
    // res.status(400).json(e.message);
    next(e)
    }


}


 exports.contByType= async(req,res,next)=>{

    try{
    
    const hotelCount= await HotelModel.countDocuments({type:"hotel"});
    const appartementCount= await HotelModel.countDocuments({type:"apartment"});
    const resortCount= await HotelModel.countDocuments({type:"resort"});
    const villaCount=  await HotelModel.countDocuments({type:"villa"});
    const cabinCount= await HotelModel.countDocuments({type:"cabin"});

        res.status(201).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: appartementCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},

        ]);

    } catch (e){
    // res.status(400).json(e.message);
    next(e)
    }


}

