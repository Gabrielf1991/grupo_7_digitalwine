const form = document.querySelector("#form");
const name = document.querySelector("#name");
const last_name = document.querySelector("#last_name");
const email = document.querySelector("#email");
const avatar = document.querySelector("#avatar");
const password = document.querySelector("#password");
const errorsElement = document.querySelector(".error");
const small = document.querySelector(".smallError");

form.addEventListener("submit", function(event) {
    
    // console.log("asdddddddd");

    // const errors = [];

    // errorsElement.innerHTML = ''

    // if (name.value.trim().length <= 2) {
    //     //errors.push('Complete el nombre')
    //     small.innerHTML = ('Complete el nombre')
    // }

    // if (errors.length) {
    //     for(const error of errors) {
    //         errorsElement.innerHTML += `<li>${error}</li>` 
    //     }
    //     event.preventDefault();
    // }

    event.preventDefault();
    checkInputs();
    
})

function checkInputs (){
    
    const nameValue = (name.value.trim().length >= 2) ;
    const last_nameValue = (last_name.value.trim().length >= 2);
    const emailValue = (email.value.trim());
    const passwordValue = (password.value.trim().length >= 8);

    if (nameValue == ''){
        setErrorFor(name, "El nombre debe tener al menos 2 caracteres")
    } else {
        setSuccesFor(name);
    }

    if (last_nameValue == ''){
        setErrorFor(last_name, "El apellido debe tener al menos 2 caracteres")
    } else {
        setSuccesFor(last_name);
    }

    if (emailValue == ''){
        setErrorFor(email, "Debe ingresar un email");
    } else if (isEmail(emailValue)){
        setErrorFor(email, 'No ingresó un email válido');
    } else {
        setSuccesFor(email);
    }

    if (passwordValue == ''){
        setErrorFor(password, "La contraseña debe tener al menos 8 caracteres")
    } else {
        setSuccesFor(password);
    }


}

function isEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(email);
  }

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('.smallError');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccesFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

