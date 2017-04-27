import React from 'react';
import Header from './features/header/components/HeaderView'
import Notifications from './features/notification/components/Notification';

function Root(props) {
	return (
		<div className='content'>
			<Header loggedIn={props.route.loggedIn} />
			<Notifications />
			{props.children}
		</div>
	);
}

export default Root;
