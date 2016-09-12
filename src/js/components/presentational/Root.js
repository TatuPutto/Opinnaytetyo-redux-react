import React from 'react';  

import PassInfoToHeader from '../container/PassInfoToHeader';
import PassGistsToListingPage from '../container/ConnectListingPage';
import ListingPage from './listing/ListingPage';



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





