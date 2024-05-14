const nav = document.querySelector("nav.categories-nav"),
menuButton = document.querySelector(".menu-button"),
searchForms = document.querySelectorAll(".search-form"),
searchInputs = document.querySelectorAll(".search-input"),
header2 = document.querySelector(".header2"),
header3 = document.querySelector(".header3");


menuButton.addEventListener("click", () => {
    nav.classList.toggle("closed");
})

//Code voor search form
searchForms.forEach((searchForm, i) => { //Omdat er 2 search forms zijn doe ik ze in for each loop anders krijg je dubbele code
    searchForm.addEventListener("submit", (event) => {
        const searchInput = searchInputs[i] //Iteratie van de loop
        if (searchInput.classList.contains("hidden") || searchInput.value === "") { //Als search input hidden of leeg is
            event.preventDefault()
            searchInput.classList.remove("hidden")
            searchInput.focus()
        }
    })
})

// Code voor sticky header3 
const observer = new IntersectionObserver(([{isIntersecting}], _) => { //Dit gebeurd wanneer header2 het scherm binnenkomt of verlaat
    if (isIntersecting) { // Als header2 zichtbaar wordt
        header3.classList.remove("fixed") //Zet header3 op geen fixed
    } else { //Als header2 weggaat
        header3.classList.add("fixed") //Zet header3 op fixed
    }
})

observer.observe(header2) // Kijk naar header2
