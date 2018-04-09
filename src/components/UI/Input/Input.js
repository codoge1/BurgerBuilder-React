import React from 'react';
import classes from './Input.css';

const input = (props) => {
	let inputElement = null;
	const newClasses = [classes.InputElement];
	if (props.shouldValidate && props.invalid && props.touched) {
		newClasses.push(classes.Invalid);
	}
	switch(props.elementType) {
		case ('input'):
			inputElement = <input className={newClasses.join(' ')} 
									{...props.elementConfig} 
									value={props.value}
									onChange={props.changed}/>;
			break;
		case ('textarea'):
			inputElement = <textarea className={newClasses.join(' ')} 
									{...props.elementConfig} 
									value={props.value} 
									onChange={props.changed}/>;
			break;
		case ('select'):
			inputElement = (
				<select className={newClasses.join(' ')}
						value={props.value}
						onChange={props.changed}
						>
					{props.elementConfig.options.map((option,index) => {
						return (
							<option key={index} value={option.value}>{option.displayValue}</option>
						);
					})}
				</select>
				);
			break;
		default:
			inputElement = <input className={newClasses.join(' ')} 
									{...props.elementConfig} 
									value={props.value}
									onChange={props.changed}/>;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
		);
}

export default input;