const express=require('express');
const router=express.Router();
const db=require('../models');

router.get('/',async(req,res)=>{
    try{
         const grupa=await db.Grupa.findAll();
         res.send(grupa);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.get('/:id',async(req,res)=>{
    try{
         const grupa=await db.Grupa.findOne({where:{id:req.params.id }});
         res.send(grupa);
    }catch(err){
         res.statsus(500).json(err);   
    }

});

router.post('/',async(req,res)=>{
    try{
         const grupa=await db.Grupa.create({naziv: req.body.naziv,
          PredmetId:req.bodyPredmetId,
          AktivnostId:req.body.AktivnostId});
         res.send(grupa);
    }catch(err){
         res.statsus(500).json(err);   
    }

});

router.put('/:id',async(req,res)=>{
    try{
         console.log(req.body.PredmetId)
         const grupa=await db.Grupa.update( 
                { naziv: req.body.naziv,
                    PredmetId:req.body.PredmetId,
               },
                 { where:{id:req.params.id}});
         res.send(grupa);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.delete('/:id',async(req,res)=>{
    try{
         const grupa=await db.Grupa.findOne({where:{ id:req.params.id  }});
         grupa.destroy();
         res.send("obrisan");
    }catch(err){
         res.statsus(500).json(err);   
    }

});


module.exports=router;
