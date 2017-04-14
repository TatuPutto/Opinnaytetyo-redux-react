import React from 'react';
import UserInfo from './UserInfo';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

function HeaderLayout(props) {
	return (
		<div className='header'>
			<div className='header-content'>
				<SearchBar search={props.search} />
				<NavMenu />
				<UserInfo
					id={props.id}
					userLogin={props.userLogin}
					avatarUrl={props.avatarUrl}
				/>
			</div>
		</div>
	);
}

export default HeaderLayout;
