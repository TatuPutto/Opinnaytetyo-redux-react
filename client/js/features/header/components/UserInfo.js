import React from 'react';

function UserInfo(props) {
	return (
		<div className='user-info'>
			<div className='user-info-details'>
				<img className='user-avatar' src={props.avatarUrl} />
				<p>{props.username}</p>
				<a href="/logout">Kirjaudu ulos</a>
			</div>
		</div>
	);
}

export default UserInfo;
