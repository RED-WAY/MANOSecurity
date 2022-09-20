
function addUser() {

    const userName = user_name.value;
    const userEmail = user_email.value;
    const userPassword = user_password.value;
    const carg = user_office.value;
    const company = sessionStorage.COMPANY_USER;
    const maneger = sessionStorage.ID_USER;
    if (userEmail == undefined) {
        console.log('userName is not defined')
    } else if (userPassword == undefined) {
     
        console.log('userPassowrd is not defined')
    } else if (carg == undefined){
        console.log('user Carg is not defined')


    }else if(userName == undefined){
        console.log('userName is not defined')
    }else {


        fetch(`/users/addUser/${company}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userNameServer: userName,
                userEmailServer: userEmail,
                userPasswordServer: userPassword,
                cargServer: carg,
                manegerServer: maneger
            }),
        })
            .then(function (result) {
                console.log("resposta: ", result);

                if (result.ok) {
                    setTimeout(() => {

                        formView(false);
                        showUsers();
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