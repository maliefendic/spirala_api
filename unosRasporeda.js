var aktivnosti;

function umetniPredmet(naziv){
    var node=document.createElement("LI");
    var textnode=document.createTextNode(naziv);
    node.appendChild(textnode);
    document.getElementById("predmeti").appendChild(node);
}

const UcitajAktivnosti=()=>{
    fetch("http://localhost:8080/v2/aktivnost")
        .then(res=> res.json())
         .then( data=>{
            console.log(data);
            aktivnosti=data;
            for(let i=0;i<aktivnosti.length; i++){
            umetniPredmet(aktivnosti[i].Predmet.naziv+aktivnosti[i].Grupa.naziv+" - "+aktivnosti[i].Tip.naziv);
        }})
}


UcitajAktivnosti();

const unos= function(){
    const naziv1= document.getElementById("naziv").value;
    const aktivnost1= document.getElementById("aktivnost").value;  
    const timePocetka1= document.getElementById("timePocetka").value;
    const timeKraja1=document.getElementById("timeKraja").value;
    const dan1=document.getElementById("dan").value;
   console.log(aktivnosti)
    let rez= aktivnosti.filter((ak)=>{
        console.log(ak.Predmet.naziv+ak.Grupa.naziv)
        return ak.Predmet.naziv+ak.Grupa.naziv===naziv1;
    })

    if(rez.length!=0){
        alert("Predmet je vec upisan");
        return;
    }

    let poc=parseFloat(timePocetka1.split(":")[0])+parseFloat(timePocetka1.split(":")[1])/parseFloat(60);
    let kraj=parseFloat(timeKraja1.split(":")[0])+parseFloat(timeKraja1.split(":")[1])/parseFloat(60);
    let obj={
        "naziv": naziv1,
        "aktivnost":aktivnost1,
        "timePocetka":poc,
        "timeKraja":kraj,
        "dan":dan1
    };
    console.log(obj)
   
    fetch('http://localhost:8080/v2/predmet',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(obj)
    }).then(res=>console.log(res));


}



function obrisano(error){
    if(!error){
        alert("Aktivnosti se preklapaju, predmet nije dodan")  
    }
    else
    console.log(error);
  
}

const posaljiZahtjev=function(atributi,callback){
    console.log(atributi);
    const request= new XMLHttpRequest();
    request.open('POST',"http://localhost:8080/v2/predmet",true);
    request.onreadystatechange=function(){
        if (request.readyState == 4 && request.status == 200)
             callback(null,atributi,request.responseText);
        else if (request.readyState == 4)
             callback(request.status,null);
    }
    request.setRequestHeader("Content-Type", "application/json"); 

    request.send(JSON.stringify(atributi));
}

function UpiasanNaztiv(error,atributi,data){
    if(!error){
       
        UpdateAktivnosti(data, atributi, IpsisUpdate);   
    }
    else
    console.log("ispisi error"); 
}

function IpsisUpdate(error,data,atributi){
    if(!error){
        console.log(data)
       if(data==="akivnost postoji"){
           
        ObrisiAktivnost(atributi,obrisano)
       }else{
           alert("Predmet je dodan")
       }
    }
    else
    console.log(data);
}

function UpdateAktivnosti(data,atributi,callback){

    console.log(data);
    console.log(atributi)
    const request= new XMLHttpRequest();
    request.open('POST',"http://localhost:8080/v2/kreiraj",true);
    request.onreadystatechange=function(){
        if (request.readyState == 4 && request.status == 200)
             callback(null,request.responseText,data);
         
        
        else if (request.readyState == 4)
             callback(request.status,null,null);
    }
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send(JSON.stringify(atributi));
}

function ObrisiAktivnost(data,callback){
    let l=JSON.parse(data);
    console.log(l.id)
    const request= new XMLHttpRequest();
    request.open('DELETE',"http://localhost:8080/v2/predmet/"+l.id,true);
    request.onreadystatechange=function(){
        if (request.readyState == 4 && request.status == 200)
             callback(null,request.responseText);
        else if (request.readyState == 4)
             callback(request.status,null);
    }
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send();
}




