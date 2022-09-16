
function addCollection() {

    var collectionLevel = collection_level_select.value;
    var collectionName = collection_name.value;
    var company = sessionStorage.COMPANY_USER;

    if (collectionLevel == undefined) {
        console.log("deu ruim no addMachine")
        return false;
    } else if (collectionName == "") {

        console.log(collectionLevel)
        console.log(collectionName)
        console.log(company)

    } else {


        fetch("/collection/addCollection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                collectionLevelServer: collectionLevel,
                collectionNameServer: collectionName,
                companyServer: company
               
            }),
        })
            .then(function (result) {
                console.log("resposta: ", result);

                if (result.ok) {
                    setTimeout(() => {
                       
                        formView(false);
                        showCollections();
                    }, 500);
                } else {
                    throw "There was an error while you´re add a collection!";
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return false;
    }


}