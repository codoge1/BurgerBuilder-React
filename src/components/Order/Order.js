import React from 'react';
import classes from './Order.css';

const order = (props) => {
	//The const declaration creates a read-only reference to a value.
	//It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.
	const ingredients=[];
	for (let ingredient in props.ingredients) {
		ingredients.push({
			name:ingredient,
			amount:props.ingredients[ingredient]
		});
	}

	const ingredientsOutput = ingredients.map(ingredient => {
		return <span key={ingredient.name} style={{
			textTransform:'capitalize',
			display:'inline-block',
			margin:'0 8px',
			border:'1px solid #ccc',
			padding:'5px'
		}}>
			{ingredient.name} {ingredient.amount}
			</span>
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients:{ingredientsOutput}</p>
			<p><strong>Price:USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
		);
}

export default order;