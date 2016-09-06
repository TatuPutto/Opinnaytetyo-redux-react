import React from 'react';
import AceEditor from 'react-ace';

class Editor extends React.Component {
	
	componentDidMount() {
	    var editor = ace.edit(this.props.editorId);
	    editor.$blockScrolling = Infinity
	    editor.setTheme('ace/theme/cobalt');
		editor.getSession().setMode('ace/mode/java');
	    editor.setShowPrintMargin(false);
	    editor.setReadOnly(this.props.isReadOnly);
	    editor.setOptions({minLines: 20});
	    editor.setOptions({maxLines: 60});
	    
	    
	    if(this.props.value != null) {
	    	editor.setValue(this.props.value);
		 	editor.selection.moveTo((this.props.value.split("\n").length + 1), 0);
	    }    
	}
	
	render() {
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
		
		return <div id={this.props.editorId}></div>;
	}
	
}

export default Editor;