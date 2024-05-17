const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;
const anchors = document.querySelectorAll('a');
const categories = document.querySelector('.categories');
const articleContainers = document.querySelectorAll('div.article-content-container');
const subarticleContainers = document.querySelectorAll('article.sub-article');
const excerpt = document.querySelector('span.excerpt');
const articleTitle = document.querySelector('h2.article-title');
const subarticleTitle = document.querySelectorAll('h2.sub-article-title');
const articleAuthor = document.querySelectorAll('p.author');
const logoRedpers = document.querySelectorAll('.logo');
const arrowIcon = document.querySelectorAll('svg.heading-link-icon');
  
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    categories.classList.toggle('dark-mode');
    excerpt.classList.toggle('dark-mode');
  articleTitle.classList.toggle('dark-mode');
  articleAuthor.forEach(author => {
    author.classList.toggle('dark-mode');
  });
    anchors.forEach(anchor => {
        anchor.classList.toggle('dark-mode');
    });
    articleContainers.forEach(articleContainer => {
        articleContainer.classList.toggle('dark-mode');
    });
    subarticleContainers.forEach(subarticleContainer => {
        subarticleContainer.classList.toggle('dark-mode');
    });
  subarticleTitle.forEach(subarticleTitle => {
    subarticleTitle.classList.toggle('dark-mode');
  });
  logoRedpers.forEach(logoRedper => {
    logoRedper.classList.toggle('dark-mode');
  });
  arrowIcon.forEach(arrowIcon => {
    arrowIcon.classList.toggle('dark-mode');
  });
});