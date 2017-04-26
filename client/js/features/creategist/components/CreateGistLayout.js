import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import GistFile from '../../../sharedcomponents/GistFile';

class CreateGistLayout extends React.Component {
	constructor() {
		super();
		this.addFile = this.addFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.getGistInfo = this.getGistInfo.bind(this);
		this.state = {
			editorsCreated: 1,
			editors: ['editor0'],
		};
	}

	componentDidMount() {
		$('.header-content').addClass('narrow');
	}

	addFile() {
		this.setState({
			editors: this.state.editors.concat(['editor' + this.state.editorsCreated]),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}

	removeFile(id) {
		if(confirm('Haluatko varmasti poistaa tämän kentän?')) {
			let editors = this.state.editors;
			editors.splice(editors.indexOf(id), 1);

			this.setState({editors});
		}
	}

	getGistInfo(isPublic) {
		let gist = {};
		let files = {};
		const description = $('.description').val();
		const fileFields = $('.gist-file');
		const editors = this.state.editors;

		for(let i = 0; i < fileFields.length; i++) {
			const filename = $(fileFields[i]).find('input:text').val();
			const content = ace.edit(editors[i]).getValue();
			const file = {filename, content};
			files[filename] = file;
		}

		gist['description'] = description;
		gist['ispublic'] = isPublic;
		gist['files'] = files;

		this.props.create(gist, isPublic);
	}


	render() {
		const editors = this.state.editors;
		const {isCreatingSecret, isCreatingPublic} = this.props;

		const creationStatusSecret = this.props.isCreatingSecret ?
				'Luodaan salaista gistiä...' : 'Luo salainen gist';
		const creationStatusPublic = this.props.isCreatingPublic ?
				'Luodaan julkista gistiä...' : 'Luo julkinen gist';
		const isCreating = isCreatingSecret || isCreatingPublic ?
				true : false;
				console.log(this.props);

		// Jos tiedosto-kenttiä on enemmän kuin 1,
		// mahdollistetaan kenttien poistaminen
		const isRemovable = editors.length === 1 ? false : true;

		// Luodaan jokaista tilaan tallennettua editori id:tä kohden yksi tiedostokenttä.
		const fileFields = editors.map((editorId) => {
			return (
				<GistFile
					key={editorId}
					isRemovable={isRemovable}
					remove={this.removeFile}
					editorId={editorId}
					isReadOnly={false}
				/>
			);
		}, this);


		return (
			<div className='create'>
				<div className='wrapper'>
					<input type='text' className='description' placeholder='kuvaus' />

					<div className='files'>
						{fileFields}
					</div>

					<div className='buttons'>
						<button
							id='add-file'
							onClick={this.addFile}
							disabled={isCreating}
						>
							<i className='fa fa-file-text-o'></i> Lisää tiedosto
						</button>

						<button
							id='create-secret-gist'
							onClick={() => this.getGistInfo(false)}
							disabled={isCreating}
						>
							<i className={isCreatingSecret ?
									'fa fa-spinner fa-spin' : 'fa fa-paper-plane'} />
									&nbsp;{creationStatusSecret}
						</button>

						<button
							id='create-public-gist'
							onClick={() => this.getGistInfo(true)}
							disabled={isCreating}
						>
							<i className={isCreatingPublic ?
									'fa fa-spinner fa-spin' : 'fa fa-paper-plane-o'} />
									&nbsp;{creationStatusPublic}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateGistLayout;
