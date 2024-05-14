const nav = document.querySelector("nav.categories-nav"),
menuButton = document.querySelector(".menu-button");


menuButton.addEventListener("click", () => {
    nav.classList.toggle("closed");
})