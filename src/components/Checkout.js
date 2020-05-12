import React from "react";

class Checkout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fullname: '',
			address: '',
			phone: '',
			email: '',
			shippingFee: 2
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let data = Object.assign({}, this.state, this.props);
		fetch("http://pizza.local/api/orders", {method: "POST", body: JSON.stringify(data)})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
			})
			.done();
	};

	handleChange = (event) => {
		console.log(event);
		this.setState({[event.target.name]: event.target.value});
	};

	render() {
		let total = this.props.total.toFixed(2);
		let shippingFree = this.state.shippingFee;
		let totalIncShip = (+total + +shippingFree).toFixed(2);
		return (
			<div className="checkout">
				<div className="row">
					<span className="col-6">Total price: </span>
					<span className="col-6 text-right">${total}</span>
				</div>
				<div className="row">
					<span className="col-6">Shipping fee: </span>
					<span className="col-6 text-right">${shippingFree}</span>
				</div>
				<div className="row">
					<span className="col-6">Total inc shipping fee: </span>
					<span className="col-6 text-right">${totalIncShip}</span> 
				</div>
				<div className="row">
					<form onSubmit={this.handleSubmit} className="col-6">
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.fullname} onChange={this.handleChange} name="fullname" placeholder="Fullname" />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.address} onChange={this.handleChange} name="address" placeholder="Address" />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.phone} onChange={this.handleChange} name="phone" placeholder="Phone number" />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email" />
						</div>
						<div className="form-group hidden">
							<input type="hidden" className="form-control" name="order" value={this.state.order} />
							<input type="hidden" className="form-control" name="total" value={total} />
							<input type="hidden" className="form-control" name="total_inc_ship" value={totalIncShip} />
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Checkout
