import React from 'react';
import { Link } from 'react-router';


import Editor from './Editor';
import FileInfoWithLink from './FileInfoWithLink';


class ReadOnlyGistFile extends React.Component {

	
	render() {
		const { editorId, filename, id, value } = this.props;
		
		return (
			<div className='gistFile'>
				<div className='fileInfo'>
					<Link to={'/gist/' + id}>{filename}</Link>
				</div>
						
				<Editor editorId={editorId} isReadOnly={true} value={value} />
         	</div>
	    );	
	}
	
}

export default ReadOnlyGistFile;