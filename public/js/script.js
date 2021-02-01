const form = document.querySelector("#form");
const name = document.querySelector("#name");
const last_name = document.querySelector("#last_name");
const email = document.querySelector("#email");
const avatar = document.querySelector("#avatar");
const password = document.querySelector("#password");
const errorsElement = document.querySelector(".error");

form.addEventListener("submit", function(event) {
    
    console.log("asdddddddd");

    const errors = [];

    errorsElement.innerHTML = ''

    if (name.value.trim().length <= 2) {
        errors.push('Complete el nombre')
    }

    if (errors.length) {
        for(const error of errors) {
            errorsElement.innerHTML += `<li>${error}</li>` 
        }
        event.preventDefault();
    }


    
})