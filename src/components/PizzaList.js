import React from "react";
import Pizza from "./Pizza";
import Checkout from "./Checkout";

class PizzaList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			total: 0,
			orderList: [],
			pizzaList: ""
		};
	}

	componentDidMount() {
		fetch('http://pizza.local/api/pizzas')
			.then(response => response.json())
			.then(data => this.setState({ pizzaList: data }));
	}

	calculateTotal = (id, price , qty) => {
		let order = {id, price , qty};
		let index = -1;
		if(this.state.orderList instanceof Array) {
			index = this.state.orderList.findIndex(x => x.id === id);
		}
		if(index >= 0){
			this.setState({
				total: this.state.total + price * (qty - this.state.orderList[index].qty)
			});
			this.state.orderList[index].qty = qty;
		}else{
			this.setState({
				total: this.state.total + (price * qty)
			});
			this.state.orderList.push({id, price , qty});
		}
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
				<h1>Pizza List</h1>
				<table className="table table-bordered">
					<thead>
					<tr>
						<td>ID</td>
						<td>Name</td>
						<td>Image</td>
						<td>Price</td>
						<td>Content</td>
						<td width="80px">Quantity</td>
					</tr>
					</thead>
					<tbody>
						{pizzas}
					</tbody>
				</table>
				<Checkout total={this.state.total} order={this.state.orderList} /><br/>
			</div>
		);
	}
}

export default PizzaList
