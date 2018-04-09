import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactInfo.css';
import axios from '../../../axios/OrderAxios/OrderAxios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

class ContactInfo extends Component {
	state = {
		orderForm:{
			name:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Name'
				},
				value:'',
				validation:{
					required:true,
				},
				isValid:false,
				touched:false,
			},
			street:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Address'
				},
				value:'',
				validation:{
					required:true,
				},
				isValid:false,
				touched:false,
			},
			zipCode:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'ZIP Code'
				},
				value:'',
				validation:{
					required:true,
					min_length:5,
					max_length:5,
				},
				isValid:false,
				touched:false,
			},
			country:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Country'
				},
				value:'',
				validation:{
					required:true,
				},
				isValid:false,
				touched:false,
			},
			email:{
				elementType:'input',
				elementConfig:{
					type:'email',
					placeholder:'Your Email'
				},
				value:'',
				validation:{
					required:true,
				},
				isValid:false,
				touched:false,
			},
			deliveryMethod:{
				elementType:'select',
				elementConfig:{
					options:[{value:'fastest', displayValue:'Fastest'},
							 {value:'cheapest', displayValue:'Cheapest'}]
				},
				value:'fastest',
				isValid:true,
			},
		},
		formValid:false,
		loading:false,

	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading:true});
		const formData = {};
		for (let key in this.state.orderForm) {
			formData[key] = this.state.orderForm[key].value;
		}
		const order = {
			ingredients:this.props.ingredients,
			price:this.props.price,
			contact_info:formData,
			user_id:this.props.user_id
		}
		axios.post('orders.json?auth=' + this.props.token, order)
			 .then(response => {
				this.setState({loading:false});
				this.props.clearBurger();
			 	this.props.history.push('/');
			 	})
			 .catch(error => {
			 	console.log(error);
			 	this.setState({loading:false});
			 });
	}

	inputChangeHandler = (event, identifier) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedFormElement = {
			...updatedOrderForm[identifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.isValid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[identifier] = updatedFormElement;

		let formValid = true;
		for (let key in updatedOrderForm) {
			formValid = formValid && updatedOrderForm[key].isValid;
		}
		this.setState({orderForm:updatedOrderForm, formValid:formValid});

	}

	checkValidation = (value, rule) => {
		let isValid = true;
		if (!rule) {
			return isValid;
		}
		if (rule.required) {
			isValid = isValid && value.trim() !== '';
		}
		if (rule.min_length) {
			isValid = isValid && value.length >= rule.min_length;
		}
		if (rule.max_length) {
			isValid = isValid && value.length <= rule.max_length;
		}
		return isValid;
	}

	render() {
		const formElements = [];
		for (let key in this.state.orderForm) { 
			formElements.push({
				id:key,
				config:this.state.orderForm[key]
			});
		}

		let form = (
				<form onSubmit={this.orderHandler}>
					{formElements.map(element => {
						return (
							<Input 	key={element.id}
									elementType={element.config.elementType}
									elementConfig={element.config.elementConfig}
									value={element.config.value}
									invalid={!element.config.isValid}
									shouldValidate={element.config.validation}
									touched={element.config.touched}
									changed={(event) => this.inputChangeHandler(event, element.id)}/>
						);
					})}
					<Button btnType='Success' disabled={!this.state.formValid}>ORDER</Button>
				</form>
			);

		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				<h4>Please Enter Your Contact Information:</h4>
				{form}
			</div>
			);
	}
}


const mapStateToProps = (state) => {
	return {
		ingredients:state.ingredients,
		price:state.total_price,
		token:state.token,
		user_id:state.user_id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearBurger:() => dispatch({type:actionTypes.CLEAR_BURGER})
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);