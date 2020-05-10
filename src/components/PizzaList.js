import React from "react";
import Pizza from "./Pizza";
import Total from "./Total";
import axios from "axios";

class PizzaList extends React.Component {
	constructor(props) {
		console.log(props);
		super(props);

		this.state = {
			total: 0,
			pizzaList: ""
		};
	}

	componentDidMount() {
		axios.get('http://pizza.local/pizzas')
			.then(response => {
				this.setState({ pizzaList: response.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}


	calculateTotal = (price, qty) => {
		this.setState({
			total: this.state.total + (price * qty)
		});
	};

	render() {
		
		if(this.state.pizzaList instanceof Array) {
			let _this = this;
			var pizzas = this.state.pizzaList.map(function (pizza) {
				return (
					<Pizza
						key={pizza.id}
						id={pizza.id}
						name={pizza.name}
						image={pizza.image}
						price={pizza.price}
						content={pizza.content}
						calTotal={_this.calculateTotal}
					/>
				);
			});
		}

		return (
			<div>
				<h1>Pizzas List</h1>
				<table className="table table-bordered">
					<thead>
					<tr>
						<td>ID</td>
						<td>Pizza Title</td>
						<td>Image</td>
						<td>Price</td>
						<td>Pizza Content</td>
						<td>Quantity</td>
					</tr>
					</thead>
					<tbody>
						{pizzas}
					</tbody>
				</table>
			<Total total={this.state.total} />
			</div>
		);
	}
}

export default PizzaList
