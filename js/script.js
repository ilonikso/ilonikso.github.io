var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");
navToggle.addEventListener("click", function() {
    if (navMain.classList.contains("main-nav--closed")) {
        navMain.classList.remove("main-nav--closed");
        navMain.classList.add("main-nav--opened");
    } else {
        navMain.classList.add("main-nav--closed");
        navMain.classList.remove("main-nav--opened");
    }
});

const moreProjButton = document.querySelector("#more-proj-button");
const itemsContainer = document.querySelector(".photo__wrapper");

moreProjButton.addEventListener("click", function(e) {
    itemsContainer.classList.toggle("photo__wrapper--hide");

    e.preventDefault();
});
