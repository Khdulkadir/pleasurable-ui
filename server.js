/*** Express setup & start ***/
import fetchJson from './helpers/fetch-json.js'

import express, { request, response } from 'express'

const app = express()

app.set('view engine', 'ejs')

app.set('views', './views')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/*** Variabelen ***/ 
const redpersUrl = 'https://redpers.nl/wp-json/wp/v2/',
      directusUrl = 'https://fdnd-agency.directus.app/items/redpers_shares',
      postsUrl = redpersUrl + 'posts',
      categoriesUrl = redpersUrl + 'categories',
      authorUrl = redpersUrl + 'users',
      categoriesData = [
        {"id": 9, "name": "Binnenland", "slug": "binnenland"},
        {"id": 1010, "name": "Buitenland", "slug": "buitenland"}, 
        {"id": 7164, "name": "Column", "slug": "column"},
        {"id": 6, "name": "Economie", "slug": "economie"},
        {"id": 4, "name": "Kunst & Media", "slug": "kunst-media"},
        {"id": 3211, "name": "Podcasts", "slug": "podcast"},
        {"id": 63, "name": "Politiek", "slug": "politiek"},
        {"id": 94, "name": "Wetenschap", "slug": "wetenschap"},
      ];

/*** Routes & data ***/

//Index route
app.get('/', (request, response) => {
  Promise.all([
    Promise.all(categoriesData.map(category =>
      fetchJson(`${postsUrl}?per_page=3&categories=${category.id}`)
    )),
    fetchJson(`${postsUrl}?per_page=4`)
  ]).then(([postData, featuredData]) => {
    response.render('index', { categories: categoriesData, posts: postData, featured: featuredData });
  })
})

//Artikel route
app.get("/artikel/:slug", (request, response) => {
  const slugdirectus = encodeURIComponent(request.params.slug)
  Promise.all([
    fetchJson(`${postsUrl}/?slug=${request.params.slug}&_fields=date,slug,title,author,content,excerpt,categories,yoast_head_json,yoast_head_json.author,yoast_head_json.twitter_misc,yoast_head_json.og_image`),
    fetchJson(`${directusUrl}?filter={"slug":"${slugdirectus}"}`),
    fetchJson(`${authorUrl}?_fields=id,slug,name,description,avatar_urls&per_page=100`),
    fetchJson(`${categoriesUrl}?_fields=id,name,slug&per_page=100`)
  ]).then(([articleData, likeData, authorData, categoryData]) => {

    let filterCategorie = categoryData.filter(category => {
      return category.id == articleData[0].categories[0]
    })

    let filterAuthor = authorData.filter(author =>{
      return author.id == articleData[0].author
    })

    response.render("article", {article: articleData, like: likeData.data, categories: categoriesData, category: filterCategorie, author: filterAuthor})
  })
})

app.post('/artikel/:slug', (request, response) => {
  fetchJson(`${directusUrl}?filter[slug][_eq]=${request.params.slug}`)
    .then(({ data }) => {
      return fetchJson(`${directusUrl}/${data[0]?.id ? data[0].id : ''}`, {
        method: data[0]?.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: request.params.slug,
          shares: data.length > 0 ? data[0].shares + 1 : 1,
        }),
      });
    })
    .then(() => {
      response.redirect(301, `/artikel/${request.params.slug}`);
    })
    .catch(error => {
      console.error('Error:', error);
      response.status(500).send('Internal Server Error');
    });
});

//Categorie route
app.get('/categorie/:slug', function (request, response) {
  const category = categoriesData.find((category) => category.slug == request.params.slug)

  Promise.all([
    fetchJson(`${postsUrl}?categories=${category.id}&_fields=date,slug,title,yoast_head_json.og_image, yoast_head_json.og_image,jetpack_featured_media_url&per_page=20`), 
    fetchJson(`${categoriesUrl}/?slug=${request.params.slug}&_fields=name,yoast_head`)
  ]).then(([postData, category]) => {

    response.render('category', {posts: postData, category: category, categories: categoriesData});
  })
})

//Auteur route
app.get('/auteur/:slug', function (request, response) {
  Promise.all([fetchJson(authorUrl + '?slug=' + request.params.slug), 
    fetchJson(postsUrl + '?_fields=date,slug,title,author,yoast_head_json.twitter_misc,yoast_head_json.og_image,jetpack_featured_media_url&per_page=100')]).then(([authorData, postData]) => {

      let filterPost = postData.filter(post =>{
        return post.author == authorData[0].id
      })

      response.render('author', {author: authorData, posts: filterPost, categories: categoriesData })
    })
})  

// Search
app.get('/search', (request, response) => {
  const searchterm = request.query.q
  fetchJson(`${postsUrl}?search=${searchterm}`).then((posts) => {
      response.render('search', {posts, categories: categoriesData, searchterm})
  })
})