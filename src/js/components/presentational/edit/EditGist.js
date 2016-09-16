import React from 'react';
import $ from 'jquery';

import FileInfo from '../Reusable/FileInfo';
import Editor from '../Reusable/Editor';

require('../../../../css/Header.css');
require('../../../../css/CreateGist.css');

class EditGist extends React.Component {
	
	/**
	 * 
	 */
	constructor() {
		super();
		this.addFile = this.addFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.state = {
			editorsCreated: 0,
			files: null,
			unmodifiedFiles: null,
		};
		
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.gist != null) {
			let files = nextProps.gist.files;
			let unmodifiedFiles = [];
			
			files.forEach((file, i) => {
				files[i].editorId = 'editor' + i;
				files[i].fileId = 'file' + i;
			});
			
			this.setState({
				unmodifiedFiles,
				files,
				editorsCreated: files.length
			});
		}
	}

	handleOnChange() {}

	addFile() {
		this.setState({
			files: this.state.files.concat({
				filename: '', 
				content: '', 
				fileId: 'file' + this.state.editorsCreated,
				editorId: 'editor' + this.state.editorsCreated
			}),
			editorsCreated: this.state.editorsCreated + 1
		});
	}
	
	
	
	removeFile(id) {
		if (confirm('Haluatko varmasti poistaa tämän kentän?')) {
			let filesAfterDelete = this.state.files;
			
			for(let i = 0; i < filesAfterDelete.length; i++) {
				for(let key in filesAfterDelete[i]) {
					if(key === 'fileId') {
						let containsId = filesAfterDelete[i][key].indexOf(id)
						
						if(containsId !== -1) {
							filesAfterDelete.splice(i, 1);
						}
					}
				}	
			}
			
			this.setState({
				files: filesAfterDelete
			});
		}	
	}
	
	render() {
		const { gist, isFetching } = this.props;
		const { unmodifiedFiles, files } = this.state
	
	
		if(isFetching || gist == null || 
				unmodifiedFiles == null) {
			return <div className='loading'></div>; 
		}
		else {
			let fileFields = files.map((file, index) => {
				return (
					<div className='gistFile' key={file.fileId}>
						<FileInfo 
							key={'info' + file.fileId}
							id={file.fileId}
							isRemovable={true}
							remove={this.removeFile} 
							filename={file.filename}
							onChange={this.handleOnChange}>
						</FileInfo>
									
						<Editor 
							key={file.editorId} 
							editorId={file.editorId} 
							isReadOnly={false}
							value={file.content}>
						</Editor>
					</div>			
				);
			}, this);
			
		
			return (		
				<div className='create'>
					<div className='wrapper'>
						<input type='text'
							className='description' 
							placeholder='Kuvaus' 
							defaultValue={gist.description}>
						</input>
						
						<div className='files'>
							{fileFields}
						</div>
						
						<input
							type='button' 
							id='addFile' 
							value='Lisää tiedosto' 
							onClick={this.addFile}>
						</input>
						{/*<input type='button' id='createSecret' value='Luo salainen gist' 
								onClick={() => this.createGist(false)} />
						<input type='button' id='createPublic' value='Luo julkinen gist'
								onClick={() => this.createGist(true)} />*/}
						<input 
							type='button' 
							id='createSecret' 
							value='Luo salainen gist' 
							onClick={() => this.editGist(false)}>
						</input>
					</div>					
				</div>
			);
		}
		
	}
	
	

	
	
}

export default EditGist; 