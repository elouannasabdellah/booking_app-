
    const RoomModel= require('../models/RoomModel');
    const HotelModel= require('../models/HotelModel');

    const { createError} = require('../Utility/error');


    exports.createRoom= async(req,res,next)=>{

        const hotelId= req.params.hotelid ;
        const newRoom= new RoomModel(req.body);

        try {

            const saveRoom= await newRoom.save();

            try{
                await HotelModel.findByIdAndUpdate( hotelId, {$push: {rooms:saveRoom._id } } )
            }catch(e) {
                next(e)
            }

            res.status(200).json(saveRoom);

        }
         catch(e){
            next(e);
        }

    }



    exports.updateRoom= async(req,res,next)=>{


        try{
        
            const updateRoom= await RoomModel.findByIdAndUpdate(req.params.id, { $set:req.body }, {new:true} )
    
            res.status(201).json(updateRoom);
    
        } catch (e){
            next(e);
        }
    
    
     }
    
     exports.deleteRoom= async(req,res,next)=>{
        
        const hotelId= req.params.hotelid ;
   
        try {

            await RoomModel.findByIdAndDelete(req.params.id);
          
            try {
                
                await HotelModel.findByIdAndUpdate( hotelId , {
                     $pull:{ rooms: req.params.id } } )

            } catch(error){
                next(error)
            }

            res.status(200).json("Room has been deleted width success");
            

        } catch (e){
            next(e);
        }
      
    
     }
    
     // get hotel  by id 
    
     exports.getOneRoom= async(req,res,next)=>{
    
    
        try{
        
            const gteOnRoom= await RoomModel.findById(req.params.id)
        
            res.status(201).json(gteOnRoom);
        
        } catch (e){
            next(e);
        }
    
    
     }
       //Get All
    
       exports.getRooms= async(req,res,next)=>{
    
            try{
            
                const Rooms= await RoomModel.find()
    
                res.status(201).json({data:Rooms, numberRooms: Rooms.length});
    
            } catch (e){
            // res.status(400).json(e.message);
            next(e)
            }
    
    
       }
    


