const express=require('express');
const router=express.Router();
const db=require('../models');

router.get('/',async(req,res)=>{
    try{
         const aktivnost=await db.Aktivnost.findAll();
         res.send(aktivnost);
    }catch(err){
         res.status(500).json(err);   
    }

});

router.get('/:id',async(req,res)=>{
    try{
         const aktivnost=await db.Aktivnost.findOne({where:{id:req.params.id }});
         res.send(aktivnost);
    }catch(err){
         res.status(500).json(err);   
    }

});

router.post('/',async(req,res)=>{
    try{
          const predmet= await db.Predmet.find({where:{naziv:req.body.naziv}});
     
          if(predmet!=null){
               res.status(500).send(req.body);
               return;
          }

          predmet=await db.create({naziv:req.body.naziv});
       
          const aktivnost=await db.Aktivnost.create(
               {naziv: req.body.aktivnost,
                pocetak:req.body.pocetak,
                kraj:req.body.kraj,
                PredmetId: req.body.predmetId});
          const tip= await db.findOrCreate({naziv:req.body.aktivnost, AktivnostId: aktivnost.id});
          const dan= await db.findOrCreate({naziv:req.body.dan, AktivnostId: aktivnost.id});
        
         
         res.send(aktivnost);
    }catch(err){
         res.status(500).json(err);   
    }

});

router.post('/:id',async(req,res)=>{
    try{
         const aktivnost=await db.Aktivnost.update( 
                {naziv: req.body.naziv,
                 pocetak:req.body.pocetak,
                 kraj:req.body.kraj,
                 PredmetId: req.body.predmetId,
               },
                 { where:{id:req.params.id}});
         res.send(aktivnost);
    }catch(err){
         res.status(500).json(err);   
    }

});
router.delete('/:id',async(req,res)=>{
    try{
         const aktivnost=await db.Aktivnost.findOne({where:{ id:req.params.id  }});
         aktivnost.destroy();
         res.send("obrisan");
    }catch(err){
         res.status(500).json(err);   
    }

});


module.exports=router;