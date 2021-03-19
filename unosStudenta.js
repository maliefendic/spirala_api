
document.addEventListener('DOMContentLoaded', function() {
    ucitajGrupe(ispisiRezultat);
  }, false);

function ispisiRezultat(data){
    let select = document.getElementById('grupa'),
        option, i = 0,il = data.length;

    for (; i < il; i += 1) {
        option = document.createElement('option');
        option.text =data[i].naziv;
        option.value =data[i].id;
        select.add(option);
}
}

let ucitajGrupe=()=>{
 fetch('http://localhost:8080/v2/grupa').then(res=>res.json())
                                        .then(dat=>ispisiRezultat(dat))
                                        .catch(err=>console.log(err));
}

let unesiStudenta=function(){
    let studenti=csvJSON( document.getElementById("studenti").value);

    const grupa= document.getElementById("grupa").value;    
    studenti={studenti,"grupa":grupa}
    fetch('http://localhost:8080/v2/studenti',{
      method:'POST', 
      headers:{
         'Content-Type':'application/json'
     },

     body: JSON.stringify(studenti)
    }).then(res=>res.json())
      .then(data=>document.getElementById("studenti").value=data)
      .catch(err=>console.log(err));
}
function csvJSON(csv){
     var lines=csv.split("\n");
     var result = lines.map(res=>{
      return{  ime : res.split(",")[0],
              index : res.split(",")[1]}
    });
    return result; //JSON
    return JSON.stringify(result); //JSON
  }