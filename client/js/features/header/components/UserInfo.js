import React from 'react';

class UserInfo extends React.Component {
	constructor() {
		super();
		this.state = {detailsOpen: false};
		this.toggleDetails = this.toggleDetails.bind(this);
	}

	toggleDetails() {
		this.setState({detailsOpen: !this.state.detailsOpen});
	}

	render() {
		return (
			<div className='user-info' onClick={this.toggleDetails}>
				<img className='user-avatar' src={this.props.avatarUrl} />
				<i className='fa fa-caret-down' />
				{this.state.detailsOpen &&
					<div className='user-info-details'>
						<div className='user-avatar-container'>
							<img className='user-avatar-large' src={this.props.avatarUrl} />
						</div>
						<div className='user-info-text-container'>
							{this.props.username}<br/>
							{'tatuputto@gmail.com'}
						</div>
						<div className='user-info-actions'>
							<i className='fa fa-sign-out' />&nbsp;
							<a href="/logout">Sign out</a>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default UserInfo;
