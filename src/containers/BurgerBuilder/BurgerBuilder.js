import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerController from '../../components/Burger/BurgerController/BurgerController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';



class BurgerBuilder extends Component {
	state = {
		purchasing : false,
		loading: false,
	}



	checkPurchasable = (ingredients) => {
		const sum = Object.keys(ingredients)
					.map((ingredient) => {
						return ingredients[ingredient];
					})
					.reduce((sum, el) => {
						return sum + el;
					}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.token !== null) {
			this.setState({purchasing:true});
		} else {
			this.props.history.push('/auth');
		}
	}

	cancelPurchasing = () => {
		this.setState({purchasing:false})
	}

	continuePurchasing = () => {
		this.props.history.push('/checkout');
	}



	render() {
		const disabledInfo = {...this.props.ingredients};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = <OrderSummary ingredients={this.props.ingredients}
										cancel={this.cancelPurchasing}
										continue={this.continuePurchasing}
										price={this.props.total_price}/>;
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
			<Modal show={this.state.purchasing}
					hide={this.cancelPurchasing}>{orderSummary}</Modal>
			<div><Burger ingredients={ this.props.ingredients }/></div>
			<div><BurgerController add={this.props.addIngredient} 
									remove={this.props.removeIngredient} 
									disabled={disabledInfo}
									purchasable={this.checkPurchasable(this.props.ingredients)} 
									purchase={this.purchaseHandler}
									price={this.props.total_price}
									is_auth={this.props.token!==null}/></div>
			</Aux>
			);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients:state.ingredients,
		total_price:state.total_price,
		token:state.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredient:(name) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:name}),
		removeIngredient:(name) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:name})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
