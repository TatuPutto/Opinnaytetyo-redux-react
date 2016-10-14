import React from 'react';

import Editor from './Editor';
import FileInfoWithLink from './FileInfoWithLink';


class ReadOnlyGistFile extends React.Component {

	constructor() {
		super();
		this.expandEditor = this.expandEditor.bind(this);
		this.state = {
			isAbridged: false
		}
	}
	
	
	componentWillMount() {
		let value = this.props.value;
		const lines = value.split('\n');
		let isAbridged = false;
		let shortValue;
		
		//Näytetään aluksi vain 200 riviä
		if(lines.length >= 50) {
			isAbridged = true;
			
			for(let i = 0; i < 50; i++) {
				shortValue += lines[i] + '\n';
			}
			
			this.setState({
				value: shortValue,
				isAbridged: true
			});
		} 
		else {
			this.setState({
				value,
			});
		}
		
		
	}
	
	expandEditor() {
		console.log('täällä');
		this.setState({
			value: this.props.value,
			isAbridged: false
		});	
	}
	
	
	render() {
		const { editorId, filename } = this.props;
		let { value, isAbridged } = this.state;

		return (
			<div className='gistFile'>
				<FileInfoWithLink filename={filename} />
						
				<Editor editorId={editorId} isReadOnly={true} value={value} />
				
				{isAbridged && 
					<div onClick={this.expandEditor}>Näytä koko koodileike</div>
				}
         	</div>
	    );	
	}
	
}

export default ReadOnlyGistFile;