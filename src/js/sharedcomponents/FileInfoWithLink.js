import React from 'react';
import {Link} from 'react-router';

function FileInfoWithLink(props) {
	return (
		<div className='file-info'>
			<h3>{filename}</h3>
			<button className='copy-source' onClick={this.copySource}>
				<i className='fa fa-copy' /> Kopioi
			</button>
			<button className={'minimize-editor'} onClick={this.minimizeEditor}>
				<i className={'is-minimized-indicator fa fa-chevron-down ' + minimized} />
				{isMinimized ? ' Avaa' : ' Sulje'}
			</button>
		</div>
	);
}

export default FileInfoWithLink;
