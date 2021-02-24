const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const small = document.querySelector(".smallError");

loginForm.addEventListener("submit", function(event){
    
    event.preventDefault();
    checkInputs();
})


function checkInputs (){

    let error = false;

    const emailValue = (email.value.trim());
    const passwordValue = (password.value.trim().length >= 8);

    if (emailValue == ''){
        error = true;
        setErrorFor(email, "Debe ingresar un email válido");
    } else if (isEmail(emailValue)){
        error = true;
        setErrorFor(email, 'No ingresó un email válido');
    } else {
        setSuccesFor(email);
    }
    if (passwordValue == ''){
        error = true;
        setErrorFor(password, "La contraseña debe tener al menos 8 caracteres")
    } else {
        setSuccesFor(password);
    }

    if(!error){
        loginForm.submit();
    }
}
function isEmail(email) {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3,4})+$/.test(email);
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