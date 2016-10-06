import React from 'react';


class FileInfoWithLink extends React.Component {
	
	render() {
		return (
			<div className='fileInfo'>
				<a className='filename' href=''>{this.props.filename}</a>
			</div>
		);
	}
	
}

export default FileInfoWithLink;