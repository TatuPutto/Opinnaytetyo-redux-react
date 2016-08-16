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
		this.editGist = this.editGist.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.state = {
			editorsCreated: 0,
			files: null
		};
		
	}

	addFile() {
		this.setState({
			files: this.state.files.concat({filename: '', content: ''}),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}
	
	
	removeFile(id) {
		var updatedEditors = this.state.files;
		updatedEditors.splice(updatedEditors.indexOf(id), 1);
		
		this.setState({
			editors: updatedEditors
		});	
	}
	
	
	
	editGist(isPublic) {
		var gist = {};
		var files = {};
		var description = $('.description').val();
		var fileFields = $('.gistFile');
		
		
		for(var i = 0; i < fileFields.length; i++) {
			var filename = $(fileFields[i]).find('input:text').val();
			var source = ace.edit(this.state.editors[i]).getValue();
				
			var file = {filename: filename, content: source};
			files[filename] = file;
		}
		
	
		gist['description'] = description;
		gist['ispublic'] = isPublic;
		gist['files'] = files;
		console.log(JSON.stringify(gist));
		
		
		
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.activeGist !== null) {
			this.setState({
				unmodifiedFiles: nextProps.activeGist.files,
				files: nextProps.activeGist.files,
				editorsCreated: nextProps.activeGist.files.length
			});
		}
	}
	
	render() {
		if(this.props.isLoading === true || this.props.activeGist === null || this.state.unmodifiedFiles === null) {
			return <div className='loading'></div>; 
		}
		else {
			console.log(this.state.files)
			//var fileFields = this.state.editors.map((editor, index) => {
			var fileFields = this.state.files.map((file, index) => {
				
				return (
					<div className='gistFile' key={'file' + index} >
						<FileInfo 
							key={'info' + index}
							id={'editor' + index}
							remove={this.removeFile} 
							filename={file.filename}
						/>
									
						<Editor 
							key={'editor' + index} 
							editorId={'editor' + index} 
							isReadOnly={false}
							value={file.content}
						/>
					</div>	
				);
			}, this); 
		
	
			return (		
				<div className='create'>
					<input type='text' className='description' placeholder='Kuvaus' />
					<div className='files'>
						{fileFields}
					</div>
					
					<input type='button' id='addFile' value='Lisää tiedosto' 
							onClick={this.addFile} />
					<input type='button' id='createSecret' value='Luo salainen gist' 
							onClick={() => this.createGist(false)} />
					<input type='button' id='createPublic' value='Luo julkinen gist'
							onClick={() => this.createGist(true)} />
				</div>
			);
		}
	}
	
	

	
	
}

export default EditGist; 