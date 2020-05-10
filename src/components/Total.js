import React, {Component} from 'react';
class Total extends Component {
	render() {
		let total = this.props.total.toFixed(2);
		let shippingFree = 2;
		let totalIncShip = (+total + +shippingFree).toFixed(2);
		return (
			<div className="total">
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
			</div>
		);
	}
}

export default Total