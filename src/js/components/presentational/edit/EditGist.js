import React from 'react';
import $ from 'jquery';

import FileInfo from '../Reusable/FileInfo';
import Editor from '../Reusable/Editor';

require('../../../../css/Header.css');
require('../../../../css/CreateGist.css');


var i = 0;
class EditGist extends React.Component {
	
	/**
	 * 
	 */
	constructor() {
		super();
		this.addFile = this.addFile.bind(this);
		//this.editGist = this.editGist.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.saveFilename = this.saveFilename.bind(this);
		this.saveCurrentValuesOfForm = this.saveCurrentValuesOfForm.bind(this);
		this.state = {
			editorsCreated: 0,
			files: null,
			renderInitialFiles: true,
			editors: []
		};
		
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.activeGist !== null) {
			let files = nextProps.activeGist.files
			let unmodifiedFiles = [];
			let editors = [];
			
			for(let i = 0; i < files.length; i++) {
				files[i].editorId = 'editor' + i;
				
				unmodifiedFiles.push({
					filename: files[i].filename,
					content: files[i].content
				});
			}

			
			
			this.setState({
				unmodifiedFiles,
				files,
				//editors,
				editorsCreated: files.length
			});
		}
	}
	
	
	
	saveCurrentValuesOfForm() {
		console.log('jop')
		var fileFields = $('.gistFile');
		var filesAfterDelete = [];
		//Kerätään tiedostonimet ja lähdekoodit tiedosto-kentistä
		for(var i = 0; i < fileFields.length; i++) {
			let editor = $(fileFields[i]).find('div')[1];
			var source = ace.edit($(editor).attr('id')).getValue();
			var filename = $(fileFields[i]).find('input:text').val();
			/*var filename = $(fileFields[i]).find('input:text').val();
			var source = ace.edit($(fileFields[i].attr('id'))).getValue();
				
			*/var file = {filename: filename, content: source, editorId: 'editor' + i};
			filesAfterDelete.push(file);
		}
		
		console.log(filesAfterDelete)
		
		
		this.setState({
			files: filesAfterDelete
		});	
		
	}
	
	
	
	
	addFile() {
		this.saveCurrentValuesOfForm();
		
		this.setState({
			files: this.state.files.concat({filename: ' ', content: ' ', editorId: 'editor' + this.state.editorsCreated}),
			editors: this.state.editors.concat(
					{editor: 'editor' + this.state.editorsCreated}),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}
	
	
	removeFile(id) {
		this.saveCurrentValuesOfForm();
		var filesAfterDelete = this.state.files;
			
		for(let i = 0; i < filesAfterDelete.length; i++) {
			for(let key in filesAfterDelete[i]) {
				if(key === 'editorId') {
					console.log(filesAfterDelete[i][key])
					let containsId = filesAfterDelete[i][key].indexOf(id) !== -1
					console.log(containsId)
					if(containsId) {
						console.log(filesAfterDelete[i])
						
						filesAfterDelete.splice(i, 1);
						console.log('löytyi');
					}
				}
			}	
		}
		
		this.setState({
			files: filesAfterDelete
		});	
	}
	
	
	saveFilename() {
		console.log('kii');
		this.setState({
			files
		});	
	}
	

	
	render() {
		if(this.props.isLoading === true || this.props.activeGist === null ||
				this.state.unmodifiedFiles === null) {
			return <div className='loading'></div>; 
		}
		else {
			let fileFields = this.state.files.map((file, index) => {
				return (
					<div className='gistFile' key={'file' + index} >
						<FileInfo 
							key={'info' + index}
							id={file.editorId}
							remove={this.removeFile} 
							filename={file.filename}
							onChange={this.saveFilename}
						/>
									
						<Editor 
							key={file.editorId} 
							editorId={file.editorId} 
							isReadOnly={false}
							value={file.content}
						/>
					</div>			
				);
			}, this);
			
		
			return (		
				<div className='create'>
					<div className='wrapper'>
						<input type='text'
							className='description' 
							placeholder='Kuvaus' 
							defaultValue={this.props.activeGist.description}
						/>
						
						<div className='files'>
							{fileFields}
						</div>
						
						<input
							type='button' 
							id='addFile' 
							value='Lisää tiedosto' 
							onClick={this.addFile} 
						/>
						{/*<input type='button' id='createSecret' value='Luo salainen gist' 
								onClick={() => this.createGist(false)} />
						<input type='button' id='createPublic' value='Luo julkinen gist'
								onClick={() => this.createGist(true)} />*/}
						<input 
							type='button' 
							id='createSecret' 
							value='Luo salainen gist' 
							onClick={() => this.editGist(false)} 
						/>
					</div>					
				</div>
			);
		}
	}
	
	

	
	
}

export default EditGist; 