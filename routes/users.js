
const express= require('express');

const router= express.Router();

const { updateUser, deleteUser, getOnUser ,getUsers } = require('../controllers/userController');

 const { verifyToken, verifyUser , verifyAdmin }= require('../Utility/verifyToken');


    // router.get('/checkauthentication',  verifyToken, (req,res,next)=>{

    //     res.send('hello user , you are logged in')

    // } )

    // router.get('/checkuser/:id', verifyUser, (req,res,next)=>{

    //     res.send('hello user , you are logged in and you can delete you account ');

    // } )

    // router.get('/checkAdmin/:id', verifyAdmin, (req,res,next)=>{

    //     res.send('hello admin , you are logged in  and you can delete allaccounts ');

    // } )


    //UPDATE 

    router.put('/:id' , verifyUser, updateUser)

    // delete 

    router.delete('/:id' , verifyUser, deleteUser)

    // Get on hote by id 
    
    router.get('/:id' ,verifyUser, getOnUser);

    //Get All
    router.get('/' ,verifyAdmin, getUsers) ;





module.exports= router  