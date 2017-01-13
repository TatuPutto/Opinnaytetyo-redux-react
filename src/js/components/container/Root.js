import React from 'react';  
import { connect } from 'react-redux';

import Header from './Header';
import Notification from './Notification';


class Root extends React.Component {
	render() {
		return (
			<div className='content'>
				<Header />
				<Notification />
				{this.props.children}
			</div>
		);
	}
}	



export default Root;





