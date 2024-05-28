const nav = document.querySelector("nav.categories-nav"),
menuButton = document.querySelector(".menu-button"),
header2 = document.querySelector(".header2"),
header3 = document.querySelector(".header3"),
forms = document.querySelectorAll('form#like-form');

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

//Code voor post form
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

// #region author popup
const popup = document.querySelector(".author-popup"),
      moreInfo = document.querySelector(".meer-info");

function scroll() {
  
}

console.log(target)
// #endregion author popup