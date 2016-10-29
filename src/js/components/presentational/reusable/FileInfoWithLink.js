import React from 'react';
import { Link } from 'react-router';

//class FileInfoWithLink extends React.Component {
function FileInfoWithLink(props) {
	return (
		<div className='fileInfo'>
			<Link to={'/gist/' + props.id}>{props.filename}</Link>
		</div>
	);
	
	
}

export default FileInfoWithLink;

