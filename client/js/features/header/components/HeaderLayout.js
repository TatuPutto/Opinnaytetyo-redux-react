import React from 'react';
import {Link} from 'react-router';
import UserInfo from './UserInfo';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

function HeaderLayout(props) {
	return (
		<div className='header'>
			<div className='header-content'>
				<SearchBar />
				<NavMenu loggedIn={props.loggedIn} />
				{props.loggedIn ?
					<UserInfo
						id={props.id}
						username={props.username}
						avatarUrl={props.avatarUrl}
					/>
					:
					<a href={'/authorize'}>
						<button className='login'>
							<i className='fa fa-github' />
							&nbsp;&nbsp;Sign in via GitHub
						</button>
					</a>
				}
			</div>
		</div>
	);
}

export default HeaderLayout;
