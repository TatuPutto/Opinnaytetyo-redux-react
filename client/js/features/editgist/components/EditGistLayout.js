import React from 'react';
import $ from 'jquery';
import GistFile from '../../../sharedcomponents/GistFile';
import Loading from '../../../sharedcomponents/Loading';

class EditGistLayout extends React.Component {
	constructor() {
		super();
		this.initializeFiles = this.initializeFiles.bind(this);
		this.addFile = this.addFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.state = {editorsCreated: 0, files: [], originalFiles: []};
	}


	// Gist on ladattu välimuistista näkymään saavuttaessa.
	componentDidMount() {
		$('.header-content').addClass('narrow');

		if(this.props.gist.hasOwnProperty('id')) {
			this.initializeFiles(this.props.gist.files);
		}
	}

	// Gist täytyy hakea -> viivytetään tiedostokenttien alustamista, kunnes haku on valmis.
	componentWillReceiveProps(nextProps) {
		if(nextProps.gist.id !== null) {
			this.initializeFiles(nextProps.gist.files);
		}
	}

	initializeFiles(files) {
		// Tallennetaan gistin tiedot renderöintiin käytettävään taulukkoon
		for(let i = 0; i < files.length; i++) {
			files[i].editorId = 'editor' + i;
			files[i].isActive = true;
			files[i].isOriginal = true;
		}

		// Tallennetaan tiedostot myös erilliseen taulukkoon
		// muokkausvaiheessa tehtävää vertailua varten.
		this.setState({files, originalFiles: files, editorsCreated: files.length});
	}

	handleOnChange() {}

	// Lisätään tiedostokenttä.
	addFile() {
		this.setState({
			files: this.state.files.concat({
				filename: '',
				content: '',
				editorId: 'editor' + this.state.editorsCreated,
				isActive: true,
				isOriginal: false,
			}),
			editorsCreated: this.state.editorsCreated + 1,
		});
	}

	// Poistetaan tiedostokenttä.
	removeFile(id) {
		if(confirm('Are you sure you want to delete this file?')) {
			let files = JSON.parse(JSON.stringify(this.state.files));

			for(let i = 0; i < files.length; i++) {
				if(files[i].editorId === id) {
					files[i].isActive = false;
				}
			}
			this.setState({files});
		}
	}


	getEditInfo(isPublic) {
		const {sendDataToEdit, gist} = this.props;
		const {files, originalFiles} = this.state;
		let description = $('.description').val();

		// Haetaan tiedostonimet DOM:sta.
		let filenames = document.getElementsByClassName('filename');
		let modifiedFiles = {};
		let offset = 0;

		for(let i = 0; i < files.length; i++) {
			// Uusi tiedostokenttä on luotu ja poistettu ennen muokkausta.
			if(!files[i].isOriginal && !files[i].isActive) {
				offset++;
			// Jos tiedosto on uusi, lisätään suoraan.
			} else if(!files[i].isOriginal) {
				modifiedFiles[filenames[(i - offset)].value] = {
					filename: filenames[(i - offset)].value,
					content: ace.edit(files[i].editorId).getValue(),
				};
			// Jos tiedosto on alkuperäinen ja poistettu.
			} else if(files[i].isOriginal && !files[i].isActive) {
				modifiedFiles[files[i].filename] = null;
				offset++;
			// Jos tiedosto on alkuperäinen, tarkistetaan onko siihen tehty muutoksia.
			} else {
				// Alkuperäinen tiedostonimi ja kooodileike.
				const originalFilename = originalFiles[i].filename;
				const originalContent = originalFiles[i].content;

				// Tiedostonimi ja koodileike muokkauksen jälkeen.
				const filenameOnUpdate = filenames[(i - offset)].value;
				const contentOnUpdate = ace.edit(files[i].editorId).getValue();

				const nameChanged = originalFilename !== filenameOnUpdate ? true : false;
				const contentChanged = originalContent !== contentOnUpdate ? true : false;

				// Riippuen muutoksista, lisätään päivitetty tiedostonimi ja/tai koodileike.
				if(nameChanged && contentChanged) {
					modifiedFiles[originalFilename] = {
						filename: filenameOnUpdate,
						content: contentOnUpdate,
					};
				} else if(nameChanged) {
					modifiedFiles[originalFilename] = {filename: filenameOnUpdate};
				} else if(contentChanged) {
					modifiedFiles[originalFilename] = {content: contentOnUpdate};
				}
			}
		}


		// Koostetaan olio.
		let data = {};
		data['description'] = description;

		if(Object.keys(modifiedFiles).length > 0) {
			data['files'] = modifiedFiles;
		}

		this.props.sendDataToEdit(gist.id, data);
	}


	render() {
		const {gist, isFetching, isEditing, fetchError} = this.props;
		const {originalFiles, files} = this.state;
		const editingStatus = isEditing ? 'Editing...' : 'Edit';

		if(isFetching || gist.id === null && !fetchError) {
			return (
				<div className='create'>
					<Loading />
				</div>
			);
		} else if(!isFetching && gist.id !== null) {
			// Luodaan tiedostokentät, jotka ovat aktiivisia.
			const fileFields = this.state.files.map((file) => {
				if(file.isActive) {
					return (
						<GistFile
							key={file.editorId}
							filename={file.filename}
							isRemovable={true}
							remove={this.removeFile}
							onChange={this.handleOnChange}
							editorId={file.editorId}
							isReadOnly={false}
							value={file.content}
						/>
					);
				}
			}, this);

			return (
				<div className='create'>
					<div className='wrapper'>
						<input
							type='text'
							className='description'
							placeholder='Description'
							defaultValue={gist.description}
						/>

						<div className='files'>
							{fileFields}
						</div>

						<div className='buttons'>
							<button
								id='add-file'
								onClick={this.addFile}
								disabled={isEditing}
							>
								<i className='fa fa-file-text-o'></i> Add file
							</button>

							<button
								id='update-gist'
								onClick={() => this.getEditInfo(false)}
								disabled={isEditing}
							>
								<i className={isEditing ?
										'fa fa-spinner fa-spin' : 'fa fa-edit'} />
									{editingStatus}
							</button>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className='create'>
					<div className='error'>
						The gist you were looking for does not exist or it could not be loaded.
					</div>
				</div>
			);
		}
	}
}

export default EditGistLayout;
