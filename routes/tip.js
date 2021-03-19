const express=require('express');
const router=express.Router();
const db=require('../models');

router.get('/',async(req,res)=>{
    try{
         const Tip=await db.Tip.findAll();
         res.send(Tip);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.get('/:id',async(req,res)=>{
    try{
         const Tip=await db.Tip.findOne({where:{id:req.params.id }});
         res.send(Tip);
    }catch(err){
         res.statsus(500).json(err);   
    }

});

router.post('/',async(req,res)=>{
    try{
         const Tip=await db.Tip.create({naziv: req.body.naziv});
         res.send(Tip);
    }catch(err){
         res.statsus(500).json(err);   
    }

});

router.put('/:id',async(req,res)=>{
    try{
         const Tip=await db.Tip.update( 
                { naziv: req.body.naziv},
                 { where:{id:req.params.id}});
         res.send(Tip);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.delete('/:id',async(req,res)=>{
    try{
         const Tip=await db.Tip.findOne({where:{ id:req.params.id  }});
         Tip.destroy();
         res.send("obrisan");
    }catch(err){
         res.statsus(500).json(err);   
    }

});


module.exports=router;
