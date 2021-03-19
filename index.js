const express = require('express');
const {sequelize,init}= require('./models');
const grupa = require('./routes/grupa');
const student= require('./routes/student');
const studenti= require('./routes/studenti');
const aktivnost= require('./routes/aktivnost');
const dan= require('./routes/dan');
const tip= require('./routes/tip');
const predmet= require('./routes/predmet');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const converter = require('json-2-csv');

var allowCrossDomain = function(req, res, next) {
     res.header('Access-Control-Allow-Origin', "*");
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
 }

const app=express();
app.use(express.json());
app.use(allowCrossDomain);

app.use('/v2/student',student);
app.use('/v2/studenti',studenti);
app.use('/v2/aktivnost',aktivnost);
app.use('/v2/grupa',grupa);
app.use('/v2/dan',dan);
app.use('/v2/tip',tip);
app.use('/v2/predmet',predmet);
app.use('/', express.static(__dirname));

function arrayToCSV (data) {
     let csvs = data.map(row => Object.values(row));
     csvs.unshift(Object.keys(data[0]));
     return csvs.join('\n');
   }
app.get('/ucitaj',async(res,req)=>{
   const array = await csv().fromFile('raspored.csv');
   fs.writeFile("raspored.csv",arrayToCSV(array),(err) => {if (err) throw err;});
})

app.listen(8080,async()=>{
     await init();
     await sequelize.sync();
     console.log("Server je pokrnut na portu 8080");
});