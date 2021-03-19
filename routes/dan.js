const express=require('express');
const router=express.Router();
const db=require('../models');

router.get('/',async(req,res)=>{
    try{
         const Dan=await db.Dan.findAll();
         res.send(Dan);
    }catch(err){
         res.status(500).json(err);   
    }

});
router.get('/:id',async(req,res)=>{
    try{
         const Dan=await db.Dan.findOne({where:{id:req.params.id }});
         res.send(Dan);
    }catch(err){
         res.status(500).json(err);   
    }

});

router.post('/',async(req,res)=>{
    try{
         const Dan=await db.Dan.create({naziv: req.body.naziv});
         res.send(Dan);
    }catch(err){
         res.status(500).json(err);   
    }

});

router.put('/:id',async(req,res)=>{
    try{
         const Dan=await db.Dan.update( 
                { naziv: req.body.naziv},
                 { where:{id:req.params.id}});
         res.send(Dan);
    }catch(err){
         res.status(500).json(err);   
    }

});
router.delete('/:id',async(req,res)=>{
    try{
         const Dan=await db.Dan.findOne({where:{ id:req.params.id  }});
         Dan.destroy();
         res.send("obrisan");
    }catch(err){
         res.status(500).json(err);   
    }

});


module.exports=router;
