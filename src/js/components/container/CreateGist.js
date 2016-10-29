import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';


import GistFile from '../presentational/reusable/GistFile';
import { createGist } from '../../actions/actions';

require('../../../css/Header.css');
require('../../../css/CreateGist.css');

class CreateGist extends React.Component {
	
	/**
	 * 
	 */
	constructor() {
		super();
		this.addFile = this.addFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.getGistInfo = this.getGistInfo.bind(this);
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
	
	//Lisätään uusi tiedostokenttä
	addFile() {
		this.setState({
			editors: this.state.editors.concat(
					['editor' + this.state.editorsCreated]),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}
	
	//Poistetaan valittu tiedostokenttä
	removeFile(id) {
		if(confirm('Haluatko varmasti poistaa tämän kentän?')) {
			let editors = this.state.editors;
			editors.splice(editors.indexOf(id), 1);
			
			this.setState({
				editors
			});
		}
	}
	
	
	//Koostetaan tiedot yhdeksi olioksi ja lähetetään se eteenpäin 
	getGistInfo(isPublic) {
		let gist = {};
		let files = {};
		const description = $('.description').val();
		const fileFields = $('.gistFile');
		const editors = this.state.editors;
		
		//Kerätään tiedostonimet ja lähdekoodit tiedostokentistä
		for(let i = 0; i < fileFields.length; i++) {
			const filename = $(fileFields[i]).find('input:text').val();
			const source = ace.edit(editors[i]).getValue();
				
			const file = {filename: filename, content: source};
			files[filename] = file;
		}	
	
		//Koostetaan olio
		gist['description'] = description;
		gist['ispublic'] = isPublic;
		gist['files'] = files;
		
		console.log(JSON.stringify(gist));
		
		//Lähetetään koostettu olio JSON-muodossa containerille
		{this.props.create(JSON.stringify(gist))};
	}
	
	
	
	render() {
		const { readyToRender, editors } = this.state;
		
		
		if(readyToRender === false) {
			return <div className='loading'></div>
		}
		else {
			//Jos tiedosto-kenttiä on enemmän kuin 1,
			//mahdollistetaan kenttien poistaminen
			const isRemovable = editors.length === 1 ? false : true;
			
			//Luodaan jokaista tilaan tallennettua editori id:tä kohden yksi tiedostokenttä
			const fileFields = editors.map(editorId => {
				return (
					<GistFile key={editorId} 
							isRemovable={isRemovable} remove={this.removeFile}
							editorId={editorId} isReadOnly={false} />
				);
			}, this); 
		
			return (
				<div className='create'>
					<input type='text' className='description' 
							placeholder='Kuvaus'></input>
					
					<div className='files'>
						{fileFields}
					</div>
	
					<div className='buttons'>
						<input type='button' id='addFile' value='Lisää tiedosto' 
								onClick={this.addFile}>
						</input>
						<input type='button' id='createSecret' 
								value='Luo salainen gist' 
								onClick={() => this.getGistInfo(false)}>
						</input>
						<input type='button' id='createPublic' 
								value='Luo julkinen gist'
								onClick={() => this.getGistInfo(true)}>
						</input>
					</div>
				</div>
			);	
		}
	}
	
}


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		create: (gistJson) => {
			dispatch(createGist(gistJson));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGist); 