const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//testing purpose
app.get('/', (req,res)=> {
	res.send("Welcome! This is Nav_Intro section")
})

//serving static files
app.use("/restaurants/nav_intro", express.static(path.resolve(__dirname, '../static')))

//this request is comming from the proxy server.
app.get('/api/data/:id', (req,res)=> {
	const {id} = req.params
	let myMSG = `DB response, Nav/Intro, ID = ${id}`
	res.send({msg: myMSG})
})

app.listen(PORT, ()=> console.log("Server is up and running on", PORT))
