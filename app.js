// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get('/search', (req, res) => {
  //console.log('req.query', req.query)
  //const keyword = req.query.keyword
  restaurantSearch = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurantSearch, keyword: req.query.keyword })
})

app.get('/restaurant/:restaurant_id', (req, res) => {
  console.log('req.params.movie_id', req.params.restaurants_id)
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})