import React from 'react';
import { connect } from 'react-redux';

import { closeNotification } from '../../actions/actions';

class Notification extends React.Component {
	componentDidUpdate() {	
		setTimeout(() => this.props.close(), 2000);
	}
	
	render() {
		return (
			<div>
				{this.props.isOpen &&
					<div className='notification' onClick={this.props.close}>
						<p>{this.props.message}</p>	
					</div>
				}	
			</div>
		);
	}
	
}


function mapStateToProps(state) {
	return { 
		isOpen: state.notifications.isOpen,
		message: state.notifications.message};
}


function mapDispatchToProps(dispatch) {
	return {
		close: () => {
			dispatch(closeNotification());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
