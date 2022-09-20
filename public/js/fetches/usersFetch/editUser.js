function editUser(idUser) {

    const userName = user_name.value;
    const userEmail = user_email.value;
    const userPassword = user_password.value;
    const carg = user_office.value;

   
    if (userEmail == undefined) {
        console.log('userName is not defined')
    } else if (userPassword == undefined) {
     
        console.log('userPassowrd is not defined')
    } else if (carg == undefined){
        console.log('user Carg is not defined')


    }else if(userName == undefined){
        console.log('userName is not defined')
    }else {


        fetch(`/users/editUser/${idUser}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userNameServer: userName,
                userEmailServer: userEmail,
                userPasswordServer: userPassword,
                cargServer: carg
              
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