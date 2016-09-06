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
		let editors = this.state.editors;
		editors.splice(editors.indexOf(id), 1);
		
		this.setState({
			editors
		});
	}
	
	
	//Koostetaan tiedot yhdeksi olioksi ja lähetetään se eteenpäin 
	createGist(isPublic) {
		let gist = {};
		let files = {};
		const description = $('.description').val();
		const fileFields = $('.gistFile');
		
		//Kerätään tiedostonimet ja lähdekoodit tiedosto-kentistä
		for(var i = 0; i < fileFields.length; i++) {
			const filename = $(fileFields[i]).find('input:text').val();
			const source = ace.edit(this.state.editors[i]).getValue();
				
			const file = {filename: filename, content: source};
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
			//Jos tiedosto-kenttiä on enemmän kuin 1,
			//mahdollistetaan kenttien poistaminen
			const isRemovable = this.state.editors.length === 1 ? false : true;
			
			//Luodaan jokaista tilaan tallennettua editori id:tä kohden yksi tiedosto-kenttä
			const fileFields = this.state.editors.map((editorId, index) => {
				return (
					<div className='gistFile' key={'file' + index}>
						<FileInfo 
							key={'info' + index}
							id={editor}
							isRemovable={isRemovable} 
							remove={this.removeFile}
						/>	
						<Editor 
							key={editorId} 
							editorId={editorId} 
							isReadOnly={false}
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
					
					<div className='buttons'>
						<input type='button' id='addFile' value='Lisää tiedosto' 
								onClick={this.addFile} />
						<input type='button' id='createSecret' value='Luo salainen gist' 
								onClick={() => this.createGist(false)} />
						<input type='button' id='createPublic' value='Luo julkinen gist'
								onClick={() => this.createGist(true)} />
					</div>
				</div>
			);	
		}
	}
	
}

export default CreateGist; 