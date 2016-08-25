import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import FileInfo from '../Reusable/FileInfo';
import Editor from '../Reusable/Editor';
import { createGist } from '../../../actions/actions';


require('../../../../css/Header.css');
require('../../../../css/CreateGist.css');

class CreateGist extends React.Component {
	
	/**
	 * 
	 */
	constructor() {
		super();
		this.addFile = this.addFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.createGist = this.createGist.bind(this);
		this.state = {
			editorsCreated: 1,
			editors: ['editor0'],
			readyToRender: false
		};
		
	}
	
	
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				readyToRender: true
			});
		}, 200);	
	}
	
	//Lisätään uusi tiedosto-kenttä
	addFile() {
		this.setState({
			editors: this.state.editors.concat(
					['editor' + this.state.editorsCreated]),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}
	
	
	//Poistetaan valittu tiedosto-kenttä
	removeFile(id) {
		var updatedEditors = this.state.editors;
		updatedEditors.splice(updatedEditors.indexOf(id), 1);
		
		this.setState({
			editors: updatedEditors
		});
	}
	
	
	//Koostetaan tiedot yhdeksi olioksi ja lähetetään se eteenpäin 
	createGist(isPublic) {
		var gist = {};
		var files = {};
		var description = $('.description').val();
		var fileFields = $('.gistFile');
		
		//Kerätään tiedostonimet ja lähdekoodit tiedosto-kentistä
		for(var i = 0; i < fileFields.length; i++) {
			var filename = $(fileFields[i]).find('input:text').val();
			var source = ace.edit(this.state.editors[i]).getValue();
				
			var file = {filename: filename, content: source};
			files[filename] = file;
		}
	
		//Koostetaan olio
		gist['description'] = description;
		gist['ispublic'] = isPublic;
		gist['files'] = files;
		
		//Lähetetään koostettu olio JSON-muodossa containerille
		{this.props.create(JSON.stringify(gist))};
	}
	
	
	
	render() {
		if(this.state.readyToRender === false) {
			return <div className='loading'></div>
		}
		else {
			var isRemovable = this.state.editors.length === 1 ? false : true;
			var fileFields = this.state.editors.map((editor, index) => {
				return (
					<div className='gistFile' key={'file' + editor} >
						<FileInfo 
							key={'info' + editor} id={editor}
							isRemovable={isRemovable} 
							remove={this.removeFile}
						/>
									
						<Editor 
							key={editor} 
							editorId={editor} 
							isReadOnly={false}
						/>
					</div>	
				);
			}, this); 
		
	
			return (
				<div className='create'>
					<div className='wrapper'>
						<input type='text' className='description' placeholder='Kuvaus' />
						
						<div className='files'>
							{fileFields}
						</div>
						
						<div className='buttons'>
							<input type='button' id='addFile' value='Lisää tiedosto' 
									onClick={this.addFile} />
							<input type='button' id='createSecret' value='Luo salainen gist' 
									onClick={() => this.createGist(false)} />
							<input type='button' id='createPublic' value='Luo julkinen gist'
									onClick={() => this.createGist(true)} />
						</div>
					</div>
				</div>
			);	
		}
	}
	
}

export default CreateGist; 