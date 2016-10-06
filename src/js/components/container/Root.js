import React from 'react';  

import PassInfoToHeader from './PassInfoToHeader';




class Root extends React.Component {
	
	render() {
		return (
			<div className='content'>
				<PassInfoToHeader />
				{this.props.children}
			</div>
		);
	}	
	
}	


export default Root;





