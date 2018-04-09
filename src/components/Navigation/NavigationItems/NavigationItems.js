import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import { withRouter } from 'react-router-dom';

const navigationItems = (props) => {
	let auth = <NavigationItem link='/' clicked={props.logout}>Log Out</NavigationItem>;
	let orders = null;
	if (props.token === null) {
		auth = <NavigationItem link='/auth' >Sign Up/In</NavigationItem>;
	} else {
		orders = <NavigationItem link='/orders' >My Order</NavigationItem>;
	}
	return (
		<ul className={classes.NavigationItems}>
		<NavigationItem link='/'>Burger Builder</NavigationItem>
		{orders}
		{auth}
		</ul>
		);
}

const mapStateToProps = state => {
	return {
		token:state.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout:() => dispatch({type:actionTypes.DELETE_TOKEN})
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navigationItems));