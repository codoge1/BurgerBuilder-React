import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredients = Object.keys(props.ingredients)
						.map((ingredient) => {
							return <li key={ingredient}><span style={{textTransform:'capitalize'}}>{ingredient}</span> : {props.ingredients[ingredient]}</li>
						});

	return (
		<Aux>
		<h3>Your Order</h3>
		<p>A DIY burger with the following ingredients:</p>
		<ul>
		{ingredients}
		</ul>
		<p>Continue to Checkout?</p>
		<p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
		<Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
		<Button btnType='Success' clicked={props.continue}>Continue</Button>
		</Aux>
		);
}

export default orderSummary;