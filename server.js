/*** Express setup & start ***/
import fetchJson from './helpers/fetch-json.js'

import express, { response } from 'express'

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
