function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg       = document.querySelector(".bground");
const modalBtn      = document.querySelectorAll(".modal-btn");
const formData      = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

// DOM Form Elements
const formFirstName   = document.getElementById("first");
const formLastName    = document.getElementById("last");
const formEmail       = document.getElementById("email");
const formQuantity    = document.getElementById("quantity");
const formTournaments = document.getElementsByName("location");
const formCGU         = document.getElementById("checkbox1");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalCloseBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Validate radio buttons
function validateRadioButtons(tournaments) {
  for (let tournament of tournaments) {
    if (tournament.checked === true)
      return true;
  } 

  return false;
}

// Validate form
function validate() {
  let nbErrors = 0;

  if (formFirstName.value == '') {
    nbErrors++;
    console.log('Prénom non renseigné');
  }

  if (formFirstName.value.length < formFirstName.getAttribute('minlength')) {
    nbErrors++;
    console.log('Prénom trop court');
  }

  if (formLastName.value == '') {
    nbErrors++;
    console.log('Nom non renseigné');
  }

  if (formLastName.value.length < formLastName.getAttribute('minlength')) {
    nbErrors++;
    console.log('Nom trop court');
  }

  if (formEmail.value == '') {
    nbErrors++;
    console.log('Email non renseigné');
  }

  // Email validation
  // @see https://www.w3resource.com/javascript/form/email-validation.php
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value)) {
    nbErrors++;
    console.log('Format de l’email incorrect');
  }

  if (formQuantity.value == '') {
    nbErrors++;
    console.log('Quantité non renseignée');
  }

  if (!Number.isInteger(parseInt(formQuantity.value))) {
    nbErrors++;
    console.log('Ce n’est pas un nombre');
  }

  if (!validateRadioButtons(formTournaments)) {
    nbErrors++;
    console.log('Aucun tournoi sélectionné');
  }

  if (!formCGU.checked) {
    nbErrors++;
    console.log('CGU non coché');
  }

  if (nbErrors <= 0) {
    console.log('Formulaire valide');
  } else {
    console.log('Formulaire invalide');
  }

  return false;
}