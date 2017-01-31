import React from 'react';

function UserInfo(props) {
	return (
		<div className='user-info col-lg-4'>
			<img className='user-avatar' src={props.avatarUrl} />
			<p>{props.userLogin}</p> <i class="fa fa-caret-down" />
		</div>
	);
}

export default UserInfo;
