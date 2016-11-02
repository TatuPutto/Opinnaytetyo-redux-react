import React from 'react';

function UserInfo(props) {
	return (
		<div className='userInfo'>
			<img src={props.avatarUrl} />
			<p>{props.userLogin}</p>
		</div>		
	);	
}

export default UserInfo;
