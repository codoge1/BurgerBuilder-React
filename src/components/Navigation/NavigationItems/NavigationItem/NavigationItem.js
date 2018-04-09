import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
	let navLink = <NavLink to={props.link} exact activeClassName={classes.active} onClick={props.clicked}>{props.children}</NavLink>;
	if (props.children === 'Log Out') {
		navLink = <NavLink to={props.link} exact onClick={props.clicked}>{props.children}</NavLink>
	}
	return (
		<li className={classes.NavigationItem}>
			{navLink}
		</li>
		);
}

export default navigationItem;