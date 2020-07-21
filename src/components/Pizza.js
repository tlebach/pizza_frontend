import React, {Component} from 'react';
import _ from 'lodash';

class Pizza extends Component {
	changeQuantity = (event) => {
		this.setState({
			qty: event.target.value
		});
		this.props.calTotal(
			this.props.id,
			this.props.price,
			event.target.value
		);
	};

	render() {
		return (
			<tr>
				<td>
					{this.props.id}
				</td>
				<td>
					{this.props.name}
				</td>
				<td>
					<img style={{width: "60px"}} src={ this.props.image } alt={ this.props.name }/>
				</td>
				<td>
					${ this.props.price }
				</td>
				<td>
					{ this.props.content }
				</td>
				<td>
					<select className="form-control" onChange={this.changeQuantity} >
						{ _.range(0, 10).map(value => <option key={value} value={value}>{value}</option>) }
					</select>
				</td>
			</tr>
		)
	}
}

export default Pizza