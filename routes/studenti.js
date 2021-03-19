const express= require('express');
const router=express.Router();
const db=require('../models');

router.post('/',async(req,res)=>{
    studenti=req.body.studenti;
    let poruka=[];
    for(let i=0; i<studenti.length;i++){
        let student=await db.Student.findOne({where:{ime:studenti[i].ime , index:studenti[i].index}})
        if(student!=null){
            student.GrupaId=req.body.grupa
            continue;
        }
        student=await db.Student.findOne({where:{index:studenti[i].index}})
        if(student!=null){
            poruka.push(`Student ${ studenti[i].ime} nije kreiran jer postoji student ${student.ime}  sa istim indexom ${ student.index}`);
            continue;
        }
        await db.Student.create({ime:studenti[i].ime , index:studenti[i].index,GrupaId:req.body.grupa});
    }
    console.log(poruka)
    res.send(poruka);
});

module.exports=router;