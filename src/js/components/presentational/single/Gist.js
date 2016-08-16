import React from 'react';

import GistInfo from '../reusable/GistInfo';
import GistFile from '../reusable/GistFile';

import { fetchUserInfo, fetchGists, fetchSelectedGist } from '../../../actions/actions';

class Gist extends React.Component {

	componentWillMount() {
		//{this.props.getGist()}
	}
	
	render() {
		const gist = this.props.activeGist;
		
		if(this.props.isLoading === true || gist === null) {	
			return <div className='loading'></div>; 
		}
		else {
			var files = gist.files.map(function(file, index) { 
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
						name={gist.files[0].filename} 
						description={gist.description} 
						viewUrl={gist.viewUrl} 
						editUrl={gist.editUrl}
						owner={gist.owner.login} 
						avatarUrl={gist.avatarUrl} 
					/>
					
					<div className='gistFiles'>
						{files}
					</div>
				</div>
	   	 	);
		}

	}
	
}

export default Gist;