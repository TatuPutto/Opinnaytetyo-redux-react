import React from 'react';

import Editor from './Editor';
import FileInfoWithLink from './FileInfoWithLink';


class ReadOnlyGistFile extends React.Component {

	render() {
		const { editorId, filename, value } = this.props;
		
		return (
			<div className='gistFile'>
				<FileInfoWithLink filename={filename} />
						
				<Editor editorId={editorId} isReadOnly={true} value={value} />
         	</div>
	    );	
	}
	
}

export default ReadOnlyGistFile;