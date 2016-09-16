import React from 'react';
//import AceEditor from 'react-ace';

class Editor extends React.Component {
	
	componentDidMount() {
		const { editorId, value, isReadOnly } = this.props;
		
		console.log(editorId)
		
	    let editor = ace.edit(editorId);
	    editor.$blockScrolling = Infinity
	    editor.setTheme('ace/theme/cobalt');
		editor.getSession().setMode('ace/mode/java');
	    editor.setShowPrintMargin(false);
	    editor.setReadOnly(isReadOnly);
	    editor.setOptions({minLines: 20});
	    editor.setOptions({maxLines: 60});
	    
	    
	    if(value != null) {
	    	editor.setValue(value);
		 	editor.selection.moveTo((value.split("\n").length + 1), 0);
	    }    
	}
	
	render() {
		return <div id={this.props.editorId}></div>;
	}
	
}

export default Editor;