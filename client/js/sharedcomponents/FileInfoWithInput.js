import React from 'react';

function FileInfoWithInput(props) {
	const {id, filename, isRemovable, remove, onChange} = props;
	let filenameField;

	if(filename) {
		filenameField = <input
			type='text'
			className='filename'
			placeholder='Filename with ext e.g. index.html'
			defaultValue={filename}
			onChange={onChange}
		/>;
	} else {
		filenameField = <input
			type='text'
			className='filename'
			placeholder='Filename with ext e.g. index.html'
			onChange={onChange}
		/>;
	}

	return (
		<div className='file-info'>
			{filenameField}

			{isRemovable &&
				<button className='remove-file' onClick={() => remove(id)}>
					<i className='fa fa-trash'></i> Delete
				</button>
			}
		</div>
	);
}

export default FileInfoWithInput;
