

const express= require('express');

const router= express.Router();

const {  createRoom ,updateRoom, deleteRoom, getOneRoom, getRooms } = require('../controllers/roomCotroller');

const { verifyToken, verifyUser , verifyAdmin }= require('../Utility/verifyToken');


    router.post('/:hotelid', verifyAdmin, createRoom );

    router.put('/:id', verifyAdmin, updateRoom );

    router.delete('/:id/:hotelid', verifyAdmin, deleteRoom );

    router.get('/:id',getOneRoom );

    router.get('/',getRooms );





module.exports= router  