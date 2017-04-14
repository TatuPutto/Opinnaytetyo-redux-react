import React from 'react';

export default function UserInfo(props) {
	return (
		<div className='user-info'>
			<div className='user-info-details'>
				<img className='user-avatar' src={props.avatarUrl} />
				<p>{props.userLogin}</p>
				<a href="/logout">Kirjaudu ulos</a>
			</div>
		</div>
	);

}
