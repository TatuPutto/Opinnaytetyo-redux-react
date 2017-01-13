import React from 'react';
import { Link } from 'react-router';
import clipboard from 'clipboard-js';

import Editor from './Editor';
import FileInfoWithLink from './FileInfoWithLink';


class ReadOnlyGistFile extends React.Component {

	constructor() {
		super();
		this.copySource = this.copySource.bind(this);
	}

	copySource() {
		clipboard.copy(this.props.value);
	}
	
	render() {
		const { editorId, filename, id, value } = this.props;
		
		return (
			<div className='gistFile'>
				<div className='fileInfo'>
					<Link to={'/gist/' + id}>{filename}</Link>
					<img src='/images/copy.png' className='copy' onClick={this.copySource} />
				</div>
						
				<Editor editorId={editorId} isReadOnly={true} value={value} />
         	</div>
	    );	
	}
	
}

export default ReadOnlyGistFile;