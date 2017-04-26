import React from 'react';
import {Link} from 'react-router';

function FileInfoWithLink(props) {
	return (
		<div className='file-info'>
			<h3>{props.filename}</h3>
			<button className='copy-source' onClick={props.copySource}>
				<i className='fa fa-copy' /> Kopioi
			</button>
			<button className={'minimize-editor'} onClick={props.minimizeEditor}>
				<i className={'is-minimized-indicator fa fa-chevron-down ' + props.minimized} />
				{props.isMinimized ? ' Avaa' : ' Sulje'}
			</button>
		</div>
	);
}

export default FileInfoWithLink;
