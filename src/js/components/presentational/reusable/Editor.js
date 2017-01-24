import React from 'react';
//import AceEditor from 'react-ace';

class Editor extends React.Component {

	//Muodostetaan editori <div>-elementtiin,
	//mikäli komponentti liitettiin onnistuneesti DOM:iin
	componentDidMount() {
		const {editorId, value, isReadOnly} = this.props;

	    const editor = ace.edit(editorId);
	    editor.$blockScrolling = Infinity;
	    editor.setTheme('ace/theme/cobalt');
		editor.getSession().setMode('ace/mode/java');
	    editor.setShowPrintMargin(false);
	    editor.setReadOnly(isReadOnly);


	    if(value) {
	    	const lines = value.split("\n").length;
	    	editor.setValue(value);

		 	if(isReadOnly) {
		 		editor.setOptions({maxLines: lines});
		 	} else {
		 		editor.setOptions({minLines: 10});
				editor.setOptions({maxLines: 60});
		 	}
		 	editor.selection.moveTo(0);
	    } else {
	    	editor.setOptions({minLines: 10});
			editor.setOptions({maxLines: 60});
	    }
	}

	render() {
		return <div id={this.props.editorId}></div>;
	}

}

export default Editor;
