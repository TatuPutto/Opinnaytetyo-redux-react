import React from 'react';  
import { connect } from 'react-redux';

import Header from './Header';
import Notification from './Notification';

function Root(props) {
	return (
		<div className='content'>
			<Header />
			<Notification message={'Testi msg.'}/>
			{props.children}
		</div>
	);
}	

export default Root;





