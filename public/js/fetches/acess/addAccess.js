
function addAccess() {

  const type = access_type_select.value;
  const name = access_name.value;
  const process = access_path.value;
  const company = sessionStorage.COMPANY_USER;

  console.log('type')
  console.log(type)


  console.log('name')
  console.log(name)

  console.log('process: ' + process)

  console.log('company' + company)
  if (type == undefined) {

    console.log('type')
    console.log(type)
  } else if (name == undefined) {
    console.log('name')
    console.log(name)
  } else if (process == undefined) {
    console.log('process: ' + process)
  } else if (company == undefined) {
    console.log('company' + company)
  } else {
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

          fetch("/acess/addAccessCompany", {
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
                
                showAcess();
                formView(false);
    
              } else {
                throw "There was an error while you´re add a machine!";
              }
            })
            .catch((error) => {
              console.log(error);
            });

          return false;


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
