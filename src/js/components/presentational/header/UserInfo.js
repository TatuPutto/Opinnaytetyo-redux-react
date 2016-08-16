import React from 'react';

class UserInfo extends React.Component {

	render() {
		return (
			<div className='userInfo'>
				<img src={this.props.avatarUrl} />
				<p>{this.props.login}</p>
			</div>		
		);
	}
	
}
 
export default UserInfo;