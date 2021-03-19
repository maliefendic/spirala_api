const express=require('express');
const router=express.Router();
const db=require('../models');

router.get('/',async(req,res)=>{
    try{
         const Predmet=await db.Predmet.findAll();
         res.send(Predmet);
    }catch(err){
         res.status(500).json(err);   
    }

});
router.get('/:id',async(req,res)=>{
    try{
         const Predmet=await db.Predmet.findOne({where:{id:req.params.id }});
         res.send(Predmet);
    }catch(err){
         res.status(500).json(err);   
    }

});

router.post('/',async(req,res)=>{
    try{
         const ProvjeraPredmet=await db.Predmet.findOne({where:{id:req.body.naziv }});
         if(ProvjeraPredmet==null){
         const Predmet=await db.Predmet.create({naziv: req.body.naziv});
         res.send(req.body);
         }else{
          res.statsus(500).json(req.body);
         }
    }catch(err){
         res.statsus(500).json(err);   
    }

});

router.put('/:id',async(req,res)=>{
    try{
         const Predmet=await db.Predmet.update( 
                { naziv: req.body.naziv},
                 { where:{id:req.params.id}});
         res.send(Predmet);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.delete('/:id',async(req,res)=>{
    try{
         const Predmet=await db.Predmet.findOne({where:{ id:req.params.id  }});
         Predmet.destroy();
         res.send("obrisan");
    }catch(err){
         res.statsus(500).json(err);   
    }

});


module.exports=router;
