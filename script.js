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







// FORM
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
