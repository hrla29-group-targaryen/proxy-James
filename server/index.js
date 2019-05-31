const express = require('express')
const proxy = require('http-proxy-middleware')
const cors = require('cors')
const path = require('path')


const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//serving static files to the user's browser
app.use('/', express.static(path.resolve(__dirname, "../static")))

//proxing requests from index.html
app.use('/restaurants', proxy ({
  target:'https://grubhub-mock-james.herokuapp.com/',
  router: {
    '/time_sponsored': 'http://localhost:3400', // http://localhost:3400 // 'https://time-sponsored.herokuapp.com'
    '/menu_cart': 'https://menu-cart.herokuapp.com', // http://localhost:3100
    '/reviews_footer': 'https://reviews-footer.herokuapp.com',
    '/nav_intro': 'https://nav-about.herokuapp.com'
  },
  changeOrigin: true
 }))

//listening on port 3000
app.listen(PORT, ()=> console.log("Server is up and running on", PORT))