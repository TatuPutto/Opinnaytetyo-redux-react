import React from 'react';
import $ from 'jquery';

import UserInfo from './UserInfo';
import NavMenu from './NavMenu';

class Header extends React.Component {

	constructor() {
		super();
	}
/*
	componentWillMount() {
		this.getUserInfo = $.ajax({
			headers: { 
	        	'Accept': 'application/json',
	       		'Content-Type': 'application/json' 
	   		},
			type: "GET",
			url: "http://localhost:8080/Opinnaytetyo_spring_react/userinfo",
			contentType: "application/json",
			dataType: 'json',
			success: function(result) {
		     	this.setState({
					login: result[0],
					avatarUrl: result[1]
				});		
	  		}.bind(this)			
		});
		
	}

	componentWillUnmount() {
		this.getUserInfo.abort();
	}
*/

	render() {
		return (
			<div className='header'>
				<div className='headerContent'>
					<UserInfo login={this.props.userLogin} 
							avatarUrl={this.props.avatarUrl} />
					<NavMenu />
				</div>	
			</div>	
		);
	}

}

export default Header;
