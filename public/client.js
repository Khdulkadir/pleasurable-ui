const nav = document.querySelector("nav.categories-nav"),
menuButton = document.querySelector(".menu-button"),
searchForms = document.querySelectorAll(".search-form"),
searchInputs = document.querySelectorAll(".search-input"),
searchterm = document.getElementById("searchterm"),
header2 = document.querySelector(".header2"),
header3 = document.querySelector(".header3");


menuButton.addEventListener("click", () => {
    nav.classList.toggle("closed");
})

// Code voor sticky header3 
const observer = new IntersectionObserver(([{isIntersecting}], _) => { //Dit gebeurd wanneer header2 het scherm binnenkomt of verlaat
    if (isIntersecting) { // Als header2 zichtbaar is
        header3.classList.remove("fixed") //Zet header3 op geen fixed
    } else { //Als header2 weggaat
        header3.classList.add("fixed") //Zet header3 op fixed
    }
})

observer.observe(header2) // Kijk naar header2
