import React from 'react';

import GistInfo from '../reusable/GistInfo';
import GistFile from '../reusable/GistFile';

class ShowActiveGist extends React.Component {
	

	render() {
		
		if(this.props.isLoadingList === false && 
				this.props.isLoadingSelectedGist === true) {	
			return <div className="loading"></div>;	
		}
		else if(this.props.gist !== null &&
				this.props.isLoadingList === false &&
				this.props.isLoadingSelectedGist === false) {	
			const gist = this.props.gist; 
	
			var files = this.props.gist.files.map((file, index) => {
				return (
					<GistFile 
						key={file.filename} 
						filename={file.filename} 
						content={file.content}
						editorId={'editor' + index} 
					/>
				);
			});
			
			return (
				<div className='showActiveGist'>
					<GistInfo 
						id={this.props.id} 
						name={gist.files[0].filename} 
						description={gist.description} 
						editUrl={gist.editUrl} 
						deleteUrl={gist.deleteUrl}
						owner={gist.owner.login} 
						avatarUrl={gist.avatarUrl} 
					/>
		
					<div className='gistFiles'>
						{files}
					</div>
				</div>
	   	 	);
		}
		else {
			return <div className='contentRight'></div>;
		}
	}
	
}

export default ShowActiveGist;