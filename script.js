"use strict";
const login = document.querySelector(".login_btn");
const learnMore = document.querySelector(".learn_more");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const loginSection = document.querySelector(".login__section");
const signSection = document.querySelector(".sign__section");
const closeBtn = document.querySelector(".close_btn");
const introduceSection = document.querySelector(".introduce__section");
const btnRight = document.querySelector(".btn_right");
const btnLeftt = document.querySelector(".btn_left");
const member = document.querySelector(".member");
const loginMember = document.querySelector(".login_member");
const signInMember = document.querySelector(".sign_in");
const signupFacebook = document.querySelector(".signup__facebook");
const signupGoogle = document.querySelector(".signup__google");
const signupEmail = document.querySelector(".signup__email");
const toggleSign = document.querySelectorAll(".btnn");
const closeModal = function () {
  body.style.overflow = "visible";
  header.classList.remove("hidden");
  signSection.classList.add("hidden");
};

document.querySelector("#map").addEventListener("click", function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([51.5, -0.09])
          .addTo(map)
          .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
          .openPopup();
      },
      function () {
        alert("Could not get your position");
      }
    );
});

login.addEventListener("click", function () {
  body.style.overflow = "hidden";
  header.classList.add("hidden");
  signSection.classList.remove("hidden");
});
closeBtn.addEventListener("click", function () {
  closeModal();
});

//Close modal with esc key
window.onkeyup = function (event) {
  if (event.keyCode == 27) {
    closeModal();
  }
};

learnMore.addEventListener("click", function () {
  introduceSection.scrollIntoView({ behavior: "smooth" });
});
const slider = function () {
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  let curSLide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector(".dots");
  // slider.style.overflow = 'visible';
  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * i}%)`;
  // });
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>
`
      );
    });
  };
  createDots();
  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }
  goToSlide(0);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };
  activateDot(0);
  const nextSlide = function () {
    if (curSLide === maxSlide - 1) {
      curSLide = 0;
    } else {
      curSLide++;
    }

    goToSlide(curSLide);
    activateDot(curSLide);
  };

  const previousSlide = function () {
    if (curSLide === 0) {
      curSLide = maxSlide - 1;
    } else {
      curSLide--;
    }

    goToSlide(curSLide);
    activateDot(curSLide);
  };
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  // Slides with Arrowkeys

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") previousSlide();
  });
};

slider();

toggleSign.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    signSection.classList.toggle("hidden");
    loginSection.classList.toggle("hidden");
  });
});
