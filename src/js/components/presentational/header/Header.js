import React from 'react';
import $ from 'jquery';

import UserInfo from './UserInfo';
import NavMenu from './NavMenu';

class Header extends React.Component {
	
	render() {
		return (
			<div className='header'>
				<div className='headerContent'>
					<UserInfo userLogin={this.props.userLogin} 
							avatarUrl={this.props.avatarUrl} />
					<NavMenu login={this.props.login}/>
				</div>	
			</div>	
		);
	}

}

export default Header;
