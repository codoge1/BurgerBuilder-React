import React from 'react';
import classes from './BurgerController.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
	{label : 'Meat', type : 'meat'},
	{label : 'Cheese', type : 'cheese'},
	{label : 'Bacon', type : 'bacon'},
	{label : 'Salad', type : 'salad'},
]

const burgerController = (props) => {
	let btn = 'ORDER NOW';
	if (!props.is_auth) {
		btn='LOGIN TO ORDER';
	}
	return (
		<div className={classes.BuildControls}>
		<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
			{controls.map((control => {
				return <BurgerControl key={control.label} 
									label={control.label} 
									add={() => {
										return props.add(control.type)
									}}
									remove={() => {
										return props.remove(control.type)
									}}
									disabled={props.disabled[control.type]}/>
			}))}
		<button className={classes.OrderButton} 
		disabled={!props.purchasable}
		onClick={props.purchase}>{btn}</button>
		</div>
		)
}

export default burgerController;