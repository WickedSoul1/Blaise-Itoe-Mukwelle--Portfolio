const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const popup = document.getElementById("popup");

const counter = document.getElementById("count");

messageInput.addEventListener("input", () => {

counter.textContent = messageInput.value.length;

});

function showError(input, id, message){

document.getElementById(id).textContent = message;

input.classList.add("shake");

setTimeout(()=>{

input.classList.remove("shake");

},400);

}

function clearErrors(){

document.querySelectorAll("small").forEach(error=>{

error.textContent="";

});

}

form.addEventListener("submit",(e)=>{

e.preventDefault();

clearErrors();

let valid=true;

if(nameInput.value.trim()==""){

showError(nameInput,"nameError","Name is required");

valid=false;

}

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(emailInput.value)){

showError(emailInput,"emailError","Enter a valid email");

valid=false;

}

const phonePattern=/^[0-9]{10,15}$/;

if(!phonePattern.test(phoneInput.value)){

showError(phoneInput,"phoneError","Phone must contain only digits");

valid=false;

}

if(subjectInput.value.trim()==""){

showError(subjectInput,"subjectError","Subject is required");

valid=false;

}

if(messageInput.value.trim()==""){

showError(messageInput,"messageError","Message cannot be empty");

valid=false;

}

if(valid){

popup.classList.add("show");

form.reset();

counter.textContent="0";

setTimeout(()=>{

popup.classList.remove("show");

},3000);

}

});