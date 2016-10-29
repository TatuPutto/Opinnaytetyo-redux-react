import React from 'react';


class FileInfoWithInput extends React.Component {

	render() {
		const { id, filename, isRemovable, remove, onChange } = this.props; 
	
		let filenameField;
		if(filename) {
			filenameField = <input type='text' className='filename'
				placeholder='Tiedostonimi, esim. File.java' 
				defaultValue={filename} 
				onChange={onChange} />
		}
		else {
			filenameField = <input type='text' className='filename'
				placeholder='Tiedostonimi, esim. File.java' 
				onChange={onChange} />
		}
		
		return (
			<div className='fileInfo'>
				{filenameField}
			
				{isRemovable &&
					<input 
						type='button' 
						className='removeFile' 
						value='Poista' 
						onClick={() => remove(id)}>
					</input>
				}
			</div>
		);	
	}
}

export default FileInfoWithInput;