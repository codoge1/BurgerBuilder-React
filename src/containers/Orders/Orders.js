import React ,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/OrderAxios/OrderAxios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class Orders extends Component {
	state = {
		orders:[],
		loading:false,
	}

	componentDidMount = () => {
		this.setState({loading:true});
		let data = [];
		const queryParams = '?auth=' + this.props.token + '&orderBy="user_id"&equalTo="' + this.props.user_id + '"';
		axios.get('orders.json' + queryParams)
				.then(response => {
					for (let key in response.data) {
						data.push({
							...response.data[key],
							id:key
						})
					}
					this.setState({loading:false, orders:data});
				})
				.catch(error => {
					this.setState({loading:false});
				});

	}

	render() {
		let orders = (
			<div>
				{this.state.orders.map(order => {
					return (
						<Order 
							key={order.id} 
							ingredients={order.ingredients}
							price={order.price}/>
						);
				})}
			</div>
			);
		if (this.state.loading) {
			orders = <Spinner />
		}
		return (
			<div>
				{orders}
			</div>
			);
	}
}


const mapStateToProps = state => {
	return {
		token : state.token,
		user_id:state.user_id
	}
}

export default connect(mapStateToProps)(Orders);