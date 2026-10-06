const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

// De velden ophalen
const naam = document.querySelector("#naam");
const email = document.querySelector("#email");
const bericht = document.querySelector("#bericht");

// De foutmeldingen ophalen
const naamError = document.querySelector("#naam-error");
const emailError = document.querySelector("#email-error");
const berichtError = document.querySelector("#bericht-error");


// Naam controleren
function checkNaam() {

    //Laat alleen letters toe 
      const alleenLetters = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!alleenLetters.test(naam.value)){
        naamError.textContent = "Naam mag alleen letters bevatten";
        naam.setAttribute("aria-invalid", "true");
        return false;
    }

    if (naam.value.trim().length < 2) {
        naamError.textContent = "Vul minimaal 2 tekens in.";
        naam.setAttribute("aria-invalid", "true");
        return false;
    }

  

    naamError.textContent = "";
    naam.setAttribute("aria-invalid", "false");
    return true;
}


// E-mail controleren
function checkEmail() {

    if (!email.checkValidity()) {
        emailError.textContent = "Vul een geldig e-mailadres in.";
        email.setAttribute("aria-invalid", "true");
        return false;
    }

    emailError.textContent = "";
    email.setAttribute("aria-invalid", "false");
    return true;
}


// Bericht controleren
function checkBericht() {

    if (bericht.value.trim().length < 10) {
        berichtError.textContent = "Schrijf minimaal 10 tekens.";
        bericht.setAttribute("aria-invalid", "true");
        return false;
    }

    berichtError.textContent = "";
    bericht.setAttribute("aria-invalid", "false");
    return true;
}


// Controleren terwijl je typt
naam.addEventListener("input", checkNaam);
email.addEventListener("input", checkEmail);
bericht.addEventListener("input", checkBericht);


// Formulier controleren bij versturen
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const naamGoed = checkNaam();
    const emailGoed = checkEmail();
    const berichtGoed = checkBericht();

    // Alles is correct
    if (naamGoed && emailGoed && berichtGoed) {

        status.textContent = "Bedankt! Je bericht is succesvol verzonden.";
        status.classList.add("success");

        form.reset();

        // Na reset de foutstatus weer terugzetten
        naam.setAttribute("aria-invalid", "false");
        email.setAttribute("aria-invalid", "false");
        bericht.setAttribute("aria-invalid", "false");

    } else {

        status.textContent = "Controleer de foutmeldingen.";
        status.classList.remove("success");
    }
});