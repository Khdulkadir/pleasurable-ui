const nav = document.querySelector("nav.categories-nav"),
menuButton = document.querySelector(".menu-button"),
searchForm = document.getElementById("search-form"),
searchInput = document.getElementById("search-input");


menuButton.addEventListener("click", () => {
    nav.classList.toggle("closed");
})

searchForm.addEventListener("submit", (event) => {
    if (searchInput.classList.contains("hidden") || searchInput.value === "") {
        event.preventDefault()
        searchInput.classList.remove("hidden")
        searchInput.focus()
    }
})
