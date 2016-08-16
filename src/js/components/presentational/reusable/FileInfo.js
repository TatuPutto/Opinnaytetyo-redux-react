import React from 'react';


class FileInfo extends React.Component {
	
	render() {
		if(this.props.isRemovable === false) {
			return(
					<div className='fileInfo'>
						<input 
							type='text'
							placeholder='Tiedostonimi, esim. File.java'
							value={this.props.filename}
						/>
					</div>
			);
		}
		else {
			return (
				<div className='fileInfo'>
					<input 
						type='text'
						placeholder='Tiedostonimi, esim. File.java' 
						value={this.props.filename}
					/>
			
					<input type='button' className='removeFile' value='Poista' 
							onClick={() => this.props.remove(this.props.id)} /> 
				</div>
			);
		}
			
	}
	
}

export default FileInfo;