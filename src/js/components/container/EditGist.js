import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import GistFile from '../presentational/reusable/GistFile';
//import FileInfo from '../Reusable/FileInfo';
//import Editor from '../Reusable/Editor';

import FileInfoWithInput from '../presentational/reusable/FileInfoWithInput';
import Editor from '../presentational/reusable/Editor';



require('../../../css/Header.css');
require('../../../css/CreateGist.css');

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
			files: [],
			unmodifiedFiles: []
		};
		
	}

	componentDidMount() {
		console.log('täällä2');
		const { gist } = this.props;
	
		if(gist.hasOwnProperty('id')) {
			console.log('täälllä')
			let files = gist.files;
			let unmodifiedFiles = [];
			
			files.forEach((file, i) => {
				files[i].editorId = 'editor' + i;
				files[i].fileId = 'file' + i;
				
				unmodifiedFiles.push({filename: file.filename, content: file.content })
			});
			
			this.setState({
				unmodifiedFiles,
				files,
				editorsCreated: files.length
			});		
		}	
	}
	
	
	componentWillReceiveProps(nextProps) {
		console.log('täällä');
		
		if(nextProps.gist.hasOwnProperty('id')) {
			let files = nextProps.gist.files;
			let unmodifiedFiles = files;
			
			
			
			files.forEach((file, i) => {
				files[i].editorId = 'editor' + i;
				files[i].fileId = 'file' + i;
				unmodifiedFiles[i].fileId = 'file' + i;
				unmodifiedFiles[i].removed = false;
			});
			console.log(unmodifiedFiles);
			
			this.setState({
				files,
				unmodifiedFiles,
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
					if(key === 'editorId') {
						let containsId = filesAfterDelete[i][key].indexOf(id)
						
						if(containsId > -1) {
						
							filesAfterDelete.splice(i, 1);
						}
					}
				}	
			}
			
			/*let unmofied = this.state.unmodifiedFiles;
			console.log(unmofied);
			for(let i = 0; i < unmofied.length; i++) {
				for(let key in unmofied[i]) {
					console.log(key);
					if(key === 'fileId') {
						let containsId = unmofied[i][key].indexOf(id)
						console.log(containsId);
						if(containsId !== -1) {
							unmofied[i].removed = true;
							
							console.log(unmofied);
						}
					}
				}	
			}
			*/
			console.log(filesAfterDelete);
			this.setState({
				//unmodifiedFiles: unmofied,
				files: filesAfterDelete,
				
			});
		}	
	}
	
	
	editGist(isPublic) {
		console.log(this.state.unmodifiedFiles);
		
		 let gist = {};
		 let files = {};
		 let description = $('.description').val();
		 let filenames = document.getElementsByClassName('filename');
		 	/*	
		 for(let i = 0; i < fileFields.length; i++) {
			 let filename = $(fileFields[i]).find('input:text').val();
			 let source = ace.edit(this.state.files[i].editorId).getValue();
			 
			 let file = {filename: filename, content: source};
			 files[filename] = file;
		 }*/
		 	
		 var filesToBeEdited = {};
		 
		 
		 var i = 0;				            
		 const unmodifiedFiles = this.state.unmodifiedFiles;
		
			for(var property in unmodifiedFiles) {
				var nameChanged = false;
				var contentChanged = false;
				
				var filenameUnmodified = unmodifiedFiles[property]['filename'];
				var contentUnmodified = unmodifiedFiles[property]['content'];
				
			
				
				var filenameOnUpdate = filenames[i].value;
				var contentOnUpdate = ace.edit(this.state.files[i].editorId).getValue();
				
				console.log(filenameOnUpdate + contentOnUpdate);
				
				
				//Tarkistetaan onko tiedostonimiä muokattu
				if(filenameUnmodified !== filenameOnUpdate) {
					nameChanged = true;
				}
				//Tarkistetaan onko tiedoston koodia muokattu
				if(contentUnmodified !== contentOnUpdate) {
					contentChanged = true;
				}
				console.log(nameChanged + contentChanged);
				
				//Riippuen muutoksista, lisätään päivitetty tiedostonimi ja/tai koodi
				//Jos tiedostoon ei ole tehty muutoksia ei lisätä mitään
				if(nameChanged && contentChanged && !filenameOnUpdate && !contentOnUpdate) {
				}
				else if(nameChanged && contentChanged) {
					filesToBeEdited[filenameUnmodified] = {filename: filenameOnUpdate, content: contentOnUpdate};
				}
				else if(nameChanged) {
					filesToBeEdited[filenameUnmodified] = {filename: filenameOnUpdate};
				}
				else if(contentChanged) {
					filesToBeEdited[filenameUnmodified] = {content: contentOnUpdate};
				}
					
				i++;
			}
			
			//Lisätään uudet tiedostot
			var amountOfFiles = Object.keys(unmodifiedFiles).length;
			console.log(amountOfFiles);
			
			for(var i = amountOfFiles; i < filenames.length; i++) {
				filesToBeEdited[filenames[i].value] = {filename: filenames[i].value, content: ace.edit(this.state.files[i].editorId).getValue()};
			}
			
			//Muodostetaan lähetettävän datan sisältävä olio
			//data['id'] = gistId;
			
			let data = {};
			data['description'] = description;

			if(Object.keys(filesToBeEdited).length > 0) {
				data['files'] = filesToBeEdited;
				//files =  {filesToBeEdited};
			}
		 
		 
		 
		/* gist['description'] = description;
		 gist['ispublic'] = isPublic;
		 gist['files'] = files;*/
		 console.log(JSON.stringify(data));
	}
	

	render() {
		const { gist, isFetching } = this.props;
		const { unmodifiedFiles, files } = this.state;
	
		
		if(isFetching || !gist.hasOwnProperty('id') || 
				unmodifiedFiles.length < 1) {
			return <div className='loading'></div>; 
		}
		else {
			let fileFields = files.map((file, index) => {
				return (/*
					<GistFile 
						key={'file' + index}
						filename={file.filename}	
						isRemovable={true} 
						remove={this.removeFile}
						onChange={this.handleOnChange}
						editorId={file.editorId} 
						isReadOnly={false}
						value={file.content}>
					</GistFile>	*/
						
					
					<div className='gistFile'>		
						<FileInfoWithInput id={file.editorId} 
								filename={file.filename} isRemovable={true} 
								remove={this.removeFile} 
								onChange={this.handleOnChange} />
	
						<Editor editorId={file.editorId} isReadOnly={false} 
								value={file.content} />		
					</div>
				);
			}, this);
			
		
			return (		
				<div className='create'>
					<div className='wrapper'>
						<input type='text' className='description' 
							placeholder='Kuvaus' 
							defaultValue={gist.description} />
						
						<div className='files'>
							{fileFields}
						</div>
						
						<input type='button' id='addFile' value='Lisää tiedosto' 
								onClick={this.addFile} />
					
						<input type='button' id='createSecret'
								value='Päivitä' 
								onClick={() => this.editGist(false)} />
					</div>					
				</div>
			);
		}
		
	}
}


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isFetching: state.activeGist.isFetchingSelectedGist
	};
}


export default connect(mapStateToProps)(EditGist); 