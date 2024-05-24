//#region Menu
const nav = document.querySelector("nav.categories-nav"),
      menuButton = document.querySelector(".menu-button"),
      header2 = document.querySelector(".header2"),
      header3 = document.querySelector(".header3"),
      progressBar = document.querySelector("#myBar"),
      forms = document.querySelectorAll("form#like-form"),
      iframe = document.querySelector(".article-content iframe"),
      imageContainer = document.querySelector(".article-featured-image-container");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("closed");
})

//#region Code voor sticky header3 
const observer = new IntersectionObserver(([{isIntersecting}], _) => { //Dit gebeurd wanneer header2 het scherm binnenkomt of verlaat
    if (isIntersecting) { // Als header2 zichtbaar is
        header3.classList.remove("fixed") //Zet header3 op geen fixed
        progressBar.classList.remove("fixed") //Zet progressBar op geen fixed
    } else { //Als header2 weggaat
        header3.classList.add("fixed") //Zet header3 op fixed
        progressBar.classList.add("fixed") //Zet progressBar op fixed
    }
})

observer.observe(header2) // Kijk naar header2
//#endregion Code voor sticky header3 
//#endregion Menu

// #region Progress bar
window.onscroll = function() {scrollBar()}; // Als je scrolled voer functie srollBar uit

function scrollBar() {
  let winScroll = document.documentElement.scrollTop; //Kijkt naar hoeveel pixels content er boven je zijn op de pagina.
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight; //Hoeveel content totaal - de viewport van het apparaat
  let scrolled = (winScroll / height) * 100; //hoeveel px boven je /(:) totaal aantal px. Keer 100 zodat je percentage krijgt. 
  
  progressBar.style.width = scrolled + "vw"; // Verander de width in css naar scrolled vw
}
// #endregion Progress bar

// Code voor fade-in effect
document.querySelectorAll('.fade-in').forEach(function(fadeElement) {
    new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }).observe(fadeElement);
});

// Code voor podcast
if (iframe) {
  imageContainer.firstElementChild.remove(); //remove img
  imageContainer.appendChild(iframe); //give img container new child iframe
}

// #region Code voor post form
forms.forEach(function(form) {
  form.addEventListener('submit', function (event) {
    document.getElementById("like-count").classList.add("loading");
    const data = new FormData(this);
    // data.append('enhanced', true);

    fetch(this.action, {
      method: this.method,
      body: new URLSearchParams(data)
    })
    .then(function(response) {
      return response.text();
    })
    .then(function(responseHTML) {
      const parser = new DOMParser();
      const responseDOM = parser.parseFromString(responseHTML, 'text/html');
      const likeCount = responseDOM.querySelector('span#like-count');

      const currentLikeCount = document.querySelector('span#like-count');
      if (currentLikeCount && likeCount) {
        currentLikeCount.innerHTML = likeCount.innerHTML;
      }
      document.getElementById("like-count").classList.remove("loading");
      document.getElementById("like-count").classList.add("success");
      document.getElementById("like-icon").classList.add("success");
    });
    event.preventDefault();
  });
});
// #endregion Code voor post form
