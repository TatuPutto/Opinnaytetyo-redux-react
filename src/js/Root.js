import React from 'react';
import {connect} from 'react-redux';
import Header from './features/header/components/HeaderLayout'
import Notifications from './features/notification/components/Notification';

function Root(props) {
	return (
		<div className='content'>
			<Header />
			<Notifications />
			{props.children}
		</div>
	);
}

export default Root;
