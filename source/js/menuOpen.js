const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");
navToggle.addEventListener("click",() => {
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

moreProjButton.addEventListener("click",(e) => {
    itemsContainer.classList.toggle("photo__wrapper--hide");

    e.preventDefault();
});


