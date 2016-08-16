import React from 'react';
import AceEditor from 'react-ace';

class Editor extends React.Component {
	
	componentDidMount() {
	    var editor = ace.edit(this.props.editorId);
	    //editor.setTheme('ace/theme/cobalt');
		//editor.getSession().setMode('ace/mode/java');
	    editor.setShowPrintMargin(false);
	    editor.setReadOnly(this.props.isReadOnly);
	    editor.setOptions({minLines: 20});
	    editor.setOptions({maxLines: 60});
	    editor.setValue(this.props.value);
	 	editor.selection.moveTo((this.props.value.split("\n").length + 1), 0);
	    
	}
	
	render() {
		return <div id={this.props.editorId}></div>;
	}
	
}

export default Editor;