const express = require('express')
const cors = require('cors')
const path = require('path')
const proxy = require('http-proxy-middleware')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//my proxy server
app.use('/intro/bundle.js',proxy({target:'http://localhost:3001/', pathRewrite:{'^/intro':'/'}}))
app.use('/menu/bundle.js',proxy({target:'http://localhost:3002/', pathRewrite:{'^/menu':'/'}}))

//serving static files
app.use(express.static(path.resolve(__dirname, "../static")))

//listening on port 3000
app.listen(PORT, ()=> console.log("Server is up and running on", PORT))