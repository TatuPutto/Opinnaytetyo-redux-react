import React from 'react';


class GistFile extends React.Component {

	//Kun komponentti on liitetty DOM:iin onnistuneesti
	//Luodaan ACE-editori renderöityyn <div>-elementtiin
	//ja asetetaan editorin arvoksi tiedoston lähdekoodi
	componentDidMount() {
		const lines = this.props.content.split('\n').length;
	    const editor = ace.edit(this.props.editorId);
		
		editor.$blockScrolling = Infinity;
	    editor.setTheme('ace/theme/cobalt');
		editor.getSession().setMode('ace/mode/java');
	    editor.setShowPrintMargin(false);
	    editor.setReadOnly(true);
	    editor.setOptions({maxLines: lines});
	    editor.setValue(this.props.content);
	    editor.selection.moveTo(0);
	}

	render() {
		return (
			<div className='gistFile'>
				<div className='fileInfo'>
					<a className='filename' href=''>{this.props.filename}</a>
				</div>
			
				<div id={this.props.editorId}></div>
         	</div>
	    );
	}
	
}

export default GistFile;