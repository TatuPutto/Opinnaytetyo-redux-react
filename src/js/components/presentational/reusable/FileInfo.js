import React from 'react';
import $ from 'jquery';

class FileInfo extends React.Component {

	render() {
		const { id, filename, isRemovable, remove, onChange } = this.props; 
		
		let filenameField;
		if(filename) {
			filenameField = <input 
				type='text' 
				className='filename'
				placeholder='Tiedostonimi, esim. File.java' 
				value={filename} onChange={onChange}>
			</input>
		}
		else {
			filenameField = <input 
				type='text' 
				className='filename'
				placeholder='Tiedostonimi, esim. File.java' 
				onChange={onChange}>
			</input>
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

export default FileInfo;