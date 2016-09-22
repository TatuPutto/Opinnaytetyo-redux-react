
import React from 'react';

class LinkWrapper extends React.Component {
	
	render() {
		return (
			<Link to={url}>
				<input type='button' id='editGist' value='Muokkaa'/>
			</Link> 
		);
	}
	
}

export default LinkWrapper;