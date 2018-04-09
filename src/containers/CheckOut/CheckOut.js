import React, {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import {Route} from 'react-router-dom';
import ContactInfo from './ContactInfo/ContactInfo';
import { connect } from 'react-redux';

class CheckOut extends Component {

	checkOutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkOutContinueHandler = () => {
		this.props.history.push('/checkout/contact-info');
	}

	render() {
		
		return (
			<div>
			<CheckOutSummary ingredients={this.props.ingredients}
							cancel={this.checkOutCancelHandler}
							continue={this.checkOutContinueHandler}/>
			<Route path={this.props.match.path + '/contact-info'} 
					component={ ContactInfo } />
			</div>
			);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients:state.ingredients,
	}
}


export default connect( mapStateToProps )(CheckOut);