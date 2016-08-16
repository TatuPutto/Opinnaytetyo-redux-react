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
		this.createGist = this.createGist.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.state = {
			editorsCreated: 1,
			editors: ['editor0']
		};
		
	}
	
	
	addFile() {
		this.setState({
			editors: this.state.editors.concat(
					['editor' + this.state.editorsCreated]),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}
	
	
	removeFile(id) {
		var updatedEditors = this.state.editors;
		updatedEditors.splice(updatedEditors.indexOf(id), 1);
		
		this.setState({
			editors: updatedEditors
		});
	}
	
	
	
	createGist(isPublic) {
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
		
		{this.props.create(JSON.stringify(gist))};
	}
	
	
	
	render() {
		var removable = this.state.editors.length === 1 ? false : true;
		var fileFields = this.state.editors.map((editor, index) => {
			return (
				<div className='gistFile' key={'file' + editor} >
					<FileInfo key={'info' + editor} id={editor}
							removable={removable} remove={this.removeFile} />
								
					<Editor key={editor} editorId={editor} isReadOnly={false}/>
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

export default CreateGist; 