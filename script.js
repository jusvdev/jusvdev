"use strict";

// Gallery

class Example {
  constructor(options) {
    this.root = options.root;
    this.init();
    setTimeout(this.showImages.bind(this), 1000);
  }
  init() {
    this.scroll = new LocomotiveScroll({
      el: this.root,
      direction: 'horizontal',
      smooth: true,
      lerp: 0.05,
      tablet: {
        smooth: true
      },
      smartphone: {
        smooth: true
      }
    });
    this.images = this.root.querySelectorAll('.image');
    [].forEach.call(this.images, image => {
      image.addEventListener('click', () => {
        image.classList.add('-clicked');
        this.hideImages();
      });
    });
  }
  showImages() {
    [].forEach.call(this.images, image => {
      image.classList.remove('-clicked');
      image.classList.add('-active');
    });
  }
  hideImages() {
    [].forEach.call(this.images, image => {
      image.classList.remove('-active');
    });
    setTimeout(this.showImages.bind(this), 2000);
  }
}
window.addEventListener('DOMContentLoaded', event => {
  const example = new Example({
    root: document.querySelector('.scroll-animations-example')
  });
});

// CONTACT FORM

// Récupération des éléments du formulaire
const form = document.querySelector('form');
const firstNameInput = document.querySelector('#fname');
const lastNameInput = document.querySelector('#lname');
const emailInput = document.querySelector('#email');
const countryInput = document.querySelector('#country');
const subjectInput = document.querySelector('#subject');

// Fonction de validation du formulaire
function validateForm(event) {
  event.preventDefault(); // Empêche le formulaire d'être soumis automatiquement

  // Vérification des champs du formulaire
  if (firstNameInput.value.trim() === '') {
    alert('Veuillez entrer votre prénom');
    firstNameInput.focus();
    return false;
  }

  if (lastNameInput.value.trim() === '') {
    alert('Veuillez entrer votre nom de famille');
    lastNameInput.focus();
    return false;
  }

  if (emailInput.value.trim() === '') {
    alert('Veuillez entrer votre adresse email');
    emailInput.focus();
    return false;
  }

  if (countryInput.value === 'Rien') {
    alert('Veuillez sélectionner votre profil');
    countryInput.focus();
    return false;
  }

  if (subjectInput.value.trim() === '') {
    alert('Veuillez entrer un message');
    subjectInput.focus();
    return false;
  }

  // Si tous les champs sont valides, le formulaire peut être soumis
  form.submit();
}

// Ajout de l'écouteur d'événement pour soumettre le formulaire
form.addEventListener('submit', validateForm);




// TITRE MORPHING

"use strict";

/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = ["Why", "is", "this", "so", "satisfying", "to", "watch?"];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;
let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;
elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];
function doMorph() {
  morph -= cooldown;
  cooldown = 0;
  let fraction = morph / morphTime;
  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }
  setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
  // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}
function doCooldown() {
  morph = 0;
  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";
  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
  requestAnimationFrame(animate);
  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;
  cooldown -= dt;
  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }
    doMorph();
  } else {
    doCooldown();
  }
}

// Start the animation.
animate();

