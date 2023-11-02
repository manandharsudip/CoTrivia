const email = document.querySelector("#email");
const password = document.querySelector("#password");

const myUsers = JSON.parse(localStorage.getItem('users')) || [];

function handleInput(inputEmail){
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    
    if (inputEmail.length !== 0){
        if (inputEmail.match(emailRegex)){
            document.querySelector("#valid-email").innerHTML="";
            email.style.borderColor = "green";
            return true;
        }else{
            document.querySelector("#valid-email").innerHTML="Email is not valid";
            email.style.borderColor = "red";
            return false;
        }
    }else{
        document.querySelector("#valid-email").innerHTML="Email shouldn't be empty.";
        email.style.borderColor = "red";
        return false;
    }
}

function handlePassword(inputPassword){
    const password = document.querySelector("#password");
    if (inputPassword.length !== 0){
        if(inputPassword.length < 8 ){
            document.querySelector("#valid-password").innerHTML="Minimum 8 characters";
            password.style.borderColor = "red";
            return false;
        }else{
            document.querySelector("#valid-password").innerHTML="";
            password.style.borderColor = "green";
            return true;
        }
    }else{
        document.querySelector("#valid-password").innerHTML="Password must not be empty.";
        password.style.borderColor = "red";
        return false;
    }
}

function handleSubmit() {
    const user = myUsers.find(user => user.email === email.value && user.password === password.value);
    
    if (handleInput(email.value) && handlePassword(password.value)){
        if (user){

            const loggedInUser = {username: user.username};
            sessionStorage.setItem('userdata', JSON.stringify(loggedInUser));

            window.location="home.html";
        } else {
            document.querySelector("#valid-password").innerHTML="Email or Password incorrect";
        }
    }

}

function handleLogout(){
    sessionStorage.clear()
    window.location="login.html";
}



