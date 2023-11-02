
const myUsername = document.querySelector("#username");
const myEmail = document.querySelector("#email");
const myPassword = document.querySelector("#password");
const conPassword = document.querySelector("#confirm-password")

const myUsers = JSON.parse(localStorage.getItem('users')) || [];


function checkUsername(inputUsername){
    if(inputUsername.length !== 0){
        if (myUsers.some(user => user.username === inputUsername)){
            document.querySelector("#check-username").innerHTML=`${inputUsername} is not available. `;
            myUsername.style.borderColor = "red";
            return false;
        }else{
            document.querySelector("#check-username").innerHTML="";
            myUsername.style.borderColor = "green";
            return true;
        }
    }else{
        document.querySelector("#check-username").innerHTML="Username shouldn't be empty";
        myUsername.style.borderColor = "red";
        return false;
    }
}

function validateEmail(inputEmail){

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

        if (inputEmail.length !== 0){
            if (inputEmail.match(emailRegex)){
                if ((myUsers.some(user => user.email === inputEmail))){
                    document.querySelector("#valid-email").innerHTML=`${inputEmail} is already taken.`;
                    myEmail.style.borderColor = "red";
                    return false;
                }else{
                    document.querySelector("#valid-email").innerHTML="";
                    myEmail.style.borderColor = "green";
                    return true;
                }
            }else{
                document.querySelector("#valid-email").innerHTML=`Email is not a valid email. `;
                myEmail.style.borderColor = "red";
                return false;
            }
        }else{
            document.querySelector("#valid-email").innerHTML="Email cannot be empty.";
            myEmail.style.borderColor = "red";
            return false;
        }
}

function validPassword(inputPassword){
    if (inputPassword.length !== 0){
        if(inputPassword.length < 8 ){
            document.querySelector("#valid-password").innerHTML="Minimum 8 characters";
            myPassword.style.borderColor = "red";
            return false;
        }else{
            document.querySelector("#valid-password").innerHTML="";
            myPassword.style.borderColor = "green";
            return true;
        }
    }else{
        document.querySelector("#valid-password").innerHTML="Password must not be empty.";
        myPassword.style.borderColor = "red";
        return false;
    }
}

function confirmPassword(value){

    let password = myPassword.value;

    if (value === password){
        document.querySelector("#valid-con-password").innerHTML="";
        conPassword.style.borderColor = "green";
        return true;
    }else {
        document.querySelector("#valid-con-password").innerHTML=`Password doesn't a match `;
        conPassword.style.borderColor = "red";
        return false;
    }
}



function handleSubmit(e){   
    e.preventDefault();


    let password = myPassword.value;
    let username = myUsername.value;
    let email = myEmail.value;
    let cPassword = conPassword.value;
    
    
    if (checkUsername(username) && validateEmail(email) && validPassword(password) && confirmPassword(cPassword)){
        myUsers.push({username, email, password});
        localStorage.setItem('users', JSON.stringify(myUsers));
        alert('Registration Successful');
        window.location="login.html";
    }else{
        document.querySelector("#valid-con-password").innerHTML=`Registration not successful`;
    }   

}



