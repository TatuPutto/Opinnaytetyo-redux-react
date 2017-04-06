import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
//import Notifications from './components/container/Notification';
import Notification from '../../features/notification/components/Notification';



export default function Root(props) {
	return (
		<div className='content'>
			<Header />
			<Notification />
			{props.children}
		</div>
	);
}
