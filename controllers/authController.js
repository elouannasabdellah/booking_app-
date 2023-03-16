
const UserModel = require('../models/UserModel');


var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

 const { createError} = require('../Utility/error');

 exports.register= async(req,res,next)=>{

    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync( req.body.password, salt);

        const newUser= new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save();
        res.status(200).json("User has been created.");

    } catch(e) {
        next(e)
    }


}



//login

 exports.login= async(req,res,next)=>{

    try{

        const user= await UserModel.findOne({username: req.body.username});
        if(!user) return next( createError(404, "User not found")  );

        const isPasswordCorrect= await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) return next(createError(400, "wrong password or username"))

        const token = jwt.sign({id:user._id  , isAdmin:user.isAdmin} , process.env.JWT )

        const {password, isAdmin, ...otherDetails}= user._doc;

        res.cookie("access_token", token ).status(200).json({...otherDetails});

    } catch(e) {
        next(e)
    }


}