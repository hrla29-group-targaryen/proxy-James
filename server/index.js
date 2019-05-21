const express = require('express')
const cors = require('cors')
const proxy = require('http-proxy-middleware')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/test', (req,res)=> {
	res.send({msg:"test"})
})

app.use('/api/intro', proxy({ target: 'http://localhost:3001', changeOrigin: true }))

app.use('/api/menu', proxy({ target: 'http://localhost:3002', changeOrigin: true }))

app.listen(PORT, ()=> console.log("Server is up and running on", PORT))