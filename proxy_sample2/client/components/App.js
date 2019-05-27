import React from 'react';
import './App.css'
import axios from 'axios';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state={
			data: null
		}
		this.getRestaurantData=this.getRestaurantData.bind(this)
	}

	componentDidMount(){
		this.getRestaurantData()
	}

	getRestaurantData(){
		const id = window.location.href.split("id=")[1]
		console.log("from 3002/bundle.js : " , window.location.href)
	  	axios.get(`http://localhost:3002/api/data/${id}`)
	  	.then(({data}) => this.setState({data}))
	  	.catch(e=>console.log(e))
	}

	render(){
		return(
			<section className="james">
				Server 3002
				{
					(this.state.data) &&
					(
					<div>
						{this.state.data.msg}
					</div>
					)
				}
			</section>
			)
	}
}

export default App;