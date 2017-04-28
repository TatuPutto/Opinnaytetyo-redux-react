import React from 'react';
import {Link} from 'react-router';

function FileInfoWithLink(props) {
	const indicatorClass = 'is-minimized-indicator fa fa-chevron-down ' +
			props.minimized;

	return (
		<div className='file-info'>
			<h3>{props.filename}</h3>
			<button className={'minimize-editor'} onClick={props.minimizeEditor}>
				<i className={indicatorClass} />
			</button>
			<button className='copy-source' onClick={props.copySource}>
				<i className='fa fa-copy' />Copy
			</button>
		</div>
	);
}

export default FileInfoWithLink;
