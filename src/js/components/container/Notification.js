import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import {closeNotification} from '../../actions/actions';

class Notification extends React.Component {
	componentDidUpdate() {
		$('.notification-time-left').animate({
			width: '100%'
		}, 4000, 'linear', () => this.props.close());
	}

	render() {
		const messageType = 'success';

		return (
			<div>
				{this.props.isOpen &&
					<div className='notification'>
						<div className='notification-headline'>
							<i className='fa fa-remove close-notification' />
						</div>
						<div className='notification-message'>
							<p>{this.props.message}</p>
						</div>
						<div className={'notification-timer ' + messageType}>
							<div className='notification-time-left'></div>
						</div>
					</div>
				}
			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		isOpen: state.notifications.isOpen,
		message: state.notifications.message
	};
}

function mapDispatchToProps(dispatch) {
	return {close: () => dispatch(closeNotification())};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
