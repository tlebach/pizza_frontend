import React, {Component} from 'react';
import axios from 'axios';

class Pizza extends Component {
	constructor(props) {
		super(props);
		this.state = {value: '', pizzas: ''};
	}
	componentDidMount() {
		axios.get('http://pizza.local/pizzas')
			.then(response => {
				this.setState({ pizzas: response.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	renderList() {
		if(this.state.pizzas instanceof Array){
			return this.state.pizzas.map(function(object, i){
				return (
					<tr key={i}>
						<td>
							{ i }
						</td>
						<td>
							{ object.name }
						</td>
						<td>
							<img style={{width: "60px"}} src={ object.image } alt={ object.name }/>
						</td>
						<td>
							{ object.price } EUR
						</td>
						<td>
							{ object.content }
						</td>
						<td>
							<form>
								<input type="submit" value="Buy" className="btn btn-success"/>
							</form>
						</td>
					</tr>
				);
			})
		}
	}

	render() {
		return (
			<div>
				<h1>Pizzas List</h1>
				<table className="table table-hover">
					<thead>
					<tr>
						<td>ID</td>
						<td>Pizza Title</td>
						<td>Image</td>
						<td>Price</td>
						<td>Pizza Content</td>
						<td width="200px">Actions</td>
					</tr>
					</thead>
					<tbody>
					{ this.renderList() }
					</tbody>
				</table>
			</div>
		)
	}
}

export default Pizza