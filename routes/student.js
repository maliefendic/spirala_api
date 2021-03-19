const express=require('express');
const router=express.Router();
const db=require('../models');

router.get('/',async(req,res)=>{
    try{
         const studenti=await db.Student.findAll();
         res.send(studenti);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.get('/:id',async(req,res)=>{
    try{
         const studenti=await db.Student.findOne({where:{id:req.params.id }});
         res.send(studenti);
    }catch(err){
         res.statsus(500).json(err);   
    }
});

router.post('/',async(req,res)=>{
    try{
         const studenti=await db.Student.create({ where:{ime:req.body.ime,index:req.body.index}});
         res.send(studenti);
    }catch(err){
         res.statsus(500).json(err);   
    }
});

router.post('/:id',async(req,res)=>{
    try{
         const studenti=await db.Student.update( 
                { ime: req.body.ime,
                 index:req.body.index},
                 { where:{id:req.params.id}});
         res.send(studenti);
    }catch(err){
         res.statsus(500).json(err);   
    }

});
router.delete('/:id',async(req,res)=>{
    try{
         const studenti=await db.Student.findOne({where:{ id:req.params.id  }});
         student.destroy();
         res.send("obrisan");
    }catch(err){
         res.statsus(500).json(err);   
    }

});


module.exports=router;
