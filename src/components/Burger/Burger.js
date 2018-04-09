import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js';

const burger = (props) => {
	const ingredients = [];
	const keys = Object.keys(props.ingredients);
	keys.map((key) => {
		for (let i = 0; i < props.ingredients[key]; i++) {
			ingredients.push(<BurgerIngredient type={key} key={key+i} />);
		}
		return null;
	});
	if (ingredients.length === 0) {
		ingredients.push(<p key='msg'>Please add some ingredients!</p>);
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{ ingredients }
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
}

export default burger;