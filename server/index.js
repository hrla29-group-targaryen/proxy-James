const express = require('express')
const cors = require('cors')
const path = require('path')
const proxy = require('http-proxy-middleware')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//
//=================================================================>
//

// app.use('/api', proxy ({
//  target:'http://localhost:3000',
//  router: {
//    '/intro/*': 'http://localhost:3001',
//    '/menu/*': 'http://localhost:3002',
//  },
//  changeOrigin: true
// }))
// app.use(express.static(path.resolve(__dirname, "../static")))

//
//=================================================================>
//



let restaurantID

app.use('/api/intro', proxy({
	target:'http://localhost:3000/',
	changeOrigin: true,
	router: (req) => {
    return `http://localhost:3001/api/intro/?id=${restaurantID}`;
	}
}))

app.use('/api/menu', proxy({
	target:'http://localhost:3000/',
	changeOrigin: true,
	router: (req) => {
    return `http://localhost:3002/api/menu/?id=${restaurantID}`;
	}
}))

const middleware = (req,res,next) => {
	const { id } = req.query
	console.log("middleware got a query : ", id)
	restaurantID = id
	next()
}

//serving static files
app.get('/', middleware, express.static(path.resolve(__dirname, "../static")))

//listening on port 3000
app.listen(PORT, ()=> console.log("Server is up and running on", PORT))




// my proxy server
// app.use('/api/intro',proxy({target:'http://localhost:3001/'}))
// app.use('/api/menu',proxy({target:'http://localhost:3002/'}))

// app.use('/api', proxy ({
//  target:'http://localhost:3000',
//  router: {
//    '/intro': 'http://localhost:3001',
//    '/menu': 'http://localhost:3002',
//  },
//  changeOrigin: true
// }))

