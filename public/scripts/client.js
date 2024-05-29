//#region Menu
const nav = document.querySelector("nav.categories-nav"),
      menuButton = document.querySelector(".menu-button"),
      header2 = document.querySelector(".header2"),
      header3 = document.querySelector(".header3"),
      progressBar = document.querySelector("#myBar"),
      forms = document.querySelectorAll("form#like-form"),
      popup = document.querySelector(".author-popup"),
      content = document.querySelector(".article-content"),
      excerpt = document.querySelector(".article-excerpt"),
      moreInfo = document.querySelector(".meer-info"),
      darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)"),
      lightIcon = document.getElementById("light-icon"),
      root = document.querySelector(":root"),
      darkIcon = document.getElementById("dark-icon");

let darkMode = darkModeMediaQuery.matches;

darkModeMediaQuery.addEventListener("change", (e) => {
  if (e.matches) {
    darkMode = true;
  } else {
    darkMode = false;
  }
});

// Set dark-mode class on body if darkMode is true and pick icon
if (darkMode) {
  root.classList.add("dark-mode");
  darkIcon.setAttribute("display", "none");
} else {
  lightIcon.setAttribute("display", "none");
}

// Toggle dark mode on button click
function toggleDarkMode() {
  // Toggle darkMode variable
  darkMode = !darkMode;

  // Toggle dark-mode class on body
  document.body.classList.toggle("dark-mode");

  // Toggle light and dark icons
  if (darkMode) {
    lightIcon.setAttribute("display", "block");
    darkIcon.setAttribute("display", "none");
  } else {
    lightIcon.setAttribute("display", "none");
    darkIcon.setAttribute("display", "block");
  }
}

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

// #region Code voor nieuwsbrief popup
  const checkbox = document.getElementById('popup-checkbox');
  const popupNieuwsbrief = document.querySelector('.newsletter-popup');

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      popupNieuwsbrief.classList.add('open');
    }
    else {
      popupNieuwsbrief.classList.remove('open');
    }
  });
// #endregion Code voor nieuwsbrief popup

// #region author popup
content.addEventListener("click", uncheck)
excerpt.addEventListener("click", uncheck)
moreInfo.addEventListener("click", scroll)

function uncheck() {
  if(moreInfo.checked){
    moreInfo.checked = false;
  }
}

function scroll() {
  if (moreInfo.checked) {
    popup.scrollIntoView({behavior: "smooth"});
  } 
}
// #endregion author popup


