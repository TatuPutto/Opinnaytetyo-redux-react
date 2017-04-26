import React from 'react';
import UserInfo from './UserInfo';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

function HeaderLayout(props) {
	return (
		<div className='header'>
			<div className='header-content'>
				<SearchBar />
				<NavMenu />
				<UserInfo
					id={props.id}
					username={props.username}
					avatarUrl={props.avatarUrl}
				/>
			</div>
		</div>
	);
}

export default HeaderLayout;
