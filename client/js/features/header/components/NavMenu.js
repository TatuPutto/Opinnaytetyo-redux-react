import React from 'react';
import {Link} from 'react-router';


function NavMenu(props) {
	return (
		<div className='nav-menu'>
			<ul>
				<li className={props.loggedIn ? '' : 'disabled'}>
					<Link to='/'>Own gists</Link>
				</li>
				<li className={props.loggedIn ? '' : 'disabled'}>
					<Link to='/create'>Create new gist</Link>
				</li>
				<li><Link to='/discover'>Discover</Link></li>
			</ul>
		</div>
	);
}

export default NavMenu;
