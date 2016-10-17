import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import GistFile from '../presentational/reusable/GistFile';
import { editGist } from '../../actions/actions';

require('../../../css/Header.css');
require('../../../css/CreateGist.css');

class EditGist extends React.Component {
	
	/**
	 * 
	 */
	constructor() {
		super();
		this.initializeFiles = this.initializeFiles.bind(this);
		this.addFile = this.addFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.state = {
			editorsCreated: 0,
			files: [],
			originalFiles: []
		};
		
	}

	
	componentDidMount() {
		const { gist } = this.props;
	
		if(gist.hasOwnProperty('id')) {
			this.initializeFiles(gist.files);
		}	
	}
	
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.gist.hasOwnProperty('id')) {
			this.initializeFiles(nextProps.gist.files);
		}
	}

	
	initializeFiles(files) {
		
		
		//Tallennetaan gistin tiedot renderöintiin käytettävään tiedosto taulukkoon
		//ja tallennetaan myös gistin alkuperäiset tiedostot toiseen taulukkoon
		files.forEach((file, i) => {
			files[i].editorId = 'editor' + i;
			files[i].isActive = true;
			files[i].isOriginal = true;
			
			/*originalFiles.push({
				editorId: 'editor' + i,
				filename: file.filename, 
				content: file.content,
				isActive: true,
				isOriginal: true
			});*/
		});
	
		
		this.setState({
			files,
			originalFiles: files,
			editorsCreated: files.length
		});
		
		
	}
	
	handleOnChange() {}

	//Lisätään tiedostokenttä
	addFile() {
		this.setState({
			files: this.state.files.concat({
				filename: '', 
				content: '', 
				editorId: 'editor' + this.state.editorsCreated,
				isActive: true,
				isOriginal: false
			}),
			editorsCreated: this.state.editorsCreated + 1
		});
	}
	
	
	//Poistetaan tiedostokenttä
	removeFile(id) {
		if(confirm('Haluatko varmasti poistaa tämän kentän?')) {
			let { files, originalFiles } = this.state;
			
			for(let i = 0; i < files.length; i++) {
				for(let key in files[i]) {
					if(key === 'editorId') {
						let containsId = files[i][key].indexOf(id)
				
						if(containsId > -1) {
							//files.splice(i, 1);
							files[i].isActive = false;
						}			
					}
				}	
			}
			
			

			for(let i = 0; i < originalFiles.length; i++) {
				for(let key in originalFiles[i]) {
					if(key === 'editorId') {
						let containsId = originalFiles[i][key].indexOf(id)
						
						if(containsId > -1) {
							originalFiles[i].isActive = false;
						}			
					}
				}	
			}
			
			this.setState({
				originalFiles,
				files
				
			});
			
		}	
	}
	
	/*
	
	compareOriginalFiles() {
		const originalFiles = this.state.originalFiles;
		
		
	}*/
	
	
	getEditInfo(isPublic) {	
		const { sendDataToEdit, gist } = this.props;
		const { files, originalFiles } = this.state;
		let description = $('.description').val();
		let filenames = document.getElementsByClassName('filename');
		let modifiedFiles = {};
		let offset = 0;

		for(let i = 0; i < files.length; i++) {
			//Uusi tiedostokenttä on luotu ja poistettu ennen muokkausta
			if(!files[i].isOriginal && !files[i].isActive) {
				offset++;
			}
			//Jos tiedosto on uusi, lisätään suoraan 
			else if(!files[i].isOriginal) {
				modifiedFiles[filenames[(i - offset)].value] = {
					filename: filenames[(i - offset)].value, 
					content: ace.edit(files[i].editorId).getValue()
				};
			}
			//Jos tiedosto on alkuperäinen, 
			//tarkistetaan onko siihen tehty muutoksia
			else {
				for(let j = 0; j < originalFiles.length; j++) {			
					if(files[i].editorId === originalFiles[j].editorId) {
						//Tarkistetaan onko alkuperäisiä tiedostoja poistettu
						if(!originalFiles[j]['isActive']) {
							//Tyhjä olio tiedoston arvoksi == poistetaan
							let filename = originalFiles[j]['filename']
							modifiedFiles[filename] = null;  
							offset++;					
						}
						//Jos tiedostoa ei ole poistettu
						//tarkistetaan onko siihen tehty muutoksia
						else {			
							let nameChanged = false;
							let contentChanged = false;
							
							const originalFilename = originalFiles[j]['filename'];
							const originalContent = originalFiles[j]['content'];
							
							const filenameOnUpdate = filenames[(i - offset)].value;
							const contentOnUpdate = ace.edit(
									files[i].editorId).getValue();
						
							//Tarkistetaan onko tiedostonimiä muokattu
							if(originalFilename !== filenameOnUpdate) {
								nameChanged = true;
							}
							//Tarkistetaan onko tiedoston koodia muokattu
							if(originalContent !== contentOnUpdate) {
								contentChanged = true;
							}
						
	
							//Riippuen muutoksista, lisätään päivitetty tiedostonimi ja/tai koodi
							//Jos tiedostoon ei ole tehty muutoksia ei lisätä mitään
							if(nameChanged && contentChanged) {
								modifiedFiles[filenameUnmodified] = {
									filename: filenameOnUpdate, 
									content: contentOnUpdate
								};
							}
							else if(nameChanged) {
								modifiedFiles[originalFilename] = {
									filename: filenameOnUpdate
								};
							}
							else if(contentChanged) {
								modifiedFiles[originalFilename] = {
									content: contentOnUpdate
								};
							}				
						}	
					}
				}		
			}
		}
		
		let data = {};
		data['description'] = description;

		if(Object.keys(modifiedFiles).length > 0) {
			data['files'] = modifiedFiles;
		}
	
		{sendDataToEdit(gist.id, JSON.stringify(data))}
	}
	
	

	render() {
		const { gist, isFetching } = this.props;
		const { originalFiles, files } = this.state;
		
		if(isFetching || !gist.hasOwnProperty('id') || 
				originalFiles.length < 1) {
			return <div className='loading'></div>; 
		}
		else {		
			let fileFields = files.map((file, index) => {
				if(file.isActive) {
					return (
						<GistFile key={file.editorId} filename={file.filename}	
								isRemovable={true} remove={this.removeFile}
								onChange={this.handleOnChange}
								editorId={file.editorId} isReadOnly={false}
								value={file.content} />
					);
				}
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
					
						<input type='button' id='createSecret' value='Päivitä' 
								onClick={() => this.getEditInfo(false)} />
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

function mapDispatchToProps(dispatch) {
	return {
		sendDataToEdit: (id, gistJson) => {
			dispatch(editGist(id, gistJson));
		}
	};	
}


export default connect(mapStateToProps, mapDispatchToProps)(EditGist); 