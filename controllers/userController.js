

const UserModel = require('../models/UserModel');

// update User

 exports.updateUser= async(req,res,next)=>{


   try{
   
       const updateUser= await UserModel.findByIdAndUpdate(req.params.id, { $set:req.body }, {new:true} )

       res.status(201).json(updateUser);

   } catch (e){
       res.status(400).json(e.message);
   }


}

 exports.deleteUser= async(req,res,next)=>{


   try{
   
       const deleteuser= await UserModel.findByIdAndDelete(req.params.id)

       res.status(201).json("user has been deleted");

   } catch (e){
       res.status(400).json(e.message);
   }


}

// get User by id

 exports.getOnUser= async(req,res,next)=>{


   try{
   
       const getOnUser= await UserModel.findById(req.params.id)
   
       res.status(201).json(getOnUser);
   
   } catch (e){
       res.status(400).json(e.message);
   }


}
  //Get All

  exports.getUsers= async(req,res,next)=>{

       try{
       
           const Users= await UserModel.find()

           res.status(201).json({data:Users, numberUsers: Users.length});

       } catch (e){
       // res.status(400).json(e.message);
       next(e)
       }


  }

