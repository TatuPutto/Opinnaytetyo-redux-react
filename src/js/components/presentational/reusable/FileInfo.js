import React from 'react';
import $ from 'jquery';

class FileInfo extends React.Component {

	render() {
		/*if(this.props.isRemovable === false || this.props.filename == '') {
			console.log('haloo')
			return (
					<div className='fileInfo'>
						<input 
							type='text'
							className='filename'
							placeholder='Tiedostonimi, esim. File.java' 
						/>
				
						<input type='button' className='removeFile' value='Poista' 
								onClick={() => this.props.remove(this.props.id)} /> 
					</div>
				);
		}*/
		if(this.props.isRemovable === false) {
			return(
					<div className='fileInfo'>
						<input 
							type='text'
							className='filename'
							placeholder='Tiedostonimi, esim. File.java'
							value={this.props.filename}
						/>
					</div>
			);
		}
		else {
			console.log(this.props.filename)
			return (
				
				<div className='fileInfo'>
					<input 
						type='text'
						className='filename'
						placeholder='Tiedostonimi, esim. File.java' 
						value={this.props.filename}
						onChange={this.props.onChange}
					/>
			
					<input type='button' className='removeFile' value='Poista' 
							onClick={() => this.props.remove(this.props.id)} /> 
				</div>
			);
		}
			
	}
	
}

export default FileInfo;