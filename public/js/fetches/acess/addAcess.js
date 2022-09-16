function addAcess(){

   const  type = acess_type.value;
   const name = acess_name.value;
   const process = acess_path.value;
   const company = sessionStorage.USER_COMPANY;

   if(type == undefined){
     return false;
   }else if(name == undefined){
     return false;
   }else if(process == undefined){
     return false
   }else if(company == undefined){
      return false;
   }else{
    fetch("/acess/addAcess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           typeServer: type,
           nameServer: name,
           processServer: process,
           companyServer: company
        }),
      })
        .then(function (result) {
          console.log("resposta: ", result);
  
          if (result.ok) {
             
          } else {
            throw "There was an error while you´re add a machine!";
          }
        })
        .catch((error) => {
          console.log(error);
        });
  
      return false;
    }
     
   }
