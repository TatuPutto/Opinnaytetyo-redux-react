import React from 'react';

import GistListItem from './GistListItem';


//Ladataan värikoodit ohjelmointikielille
const COLORS = require("../../../../static/colors.json");

class GistList extends React.Component {

	constructor() {
		super();
		this.getColorCode = this.getColorCode.bind(this);
	}

	
	/**
	 * Haetaan kielelle määrietty värikoodi
	 */
	getColorCode(language) {
		try {
			var colorCode = COLORS[language].color;
		}
		catch(error) {
			var colorCode = '#D0D0D0';
		}
		
		return colorCode;
	}
	
	
	
	render() {
		//Renderöidään latausindikaattori jos lataus on kesken
		if(this.props.isLoading === true || this.props.gists == null) {
    		return <div className='loading'></div>; 
		}
    	else {
    		//Käydään gistien tiedot sisältävä taulukko läpi ja 
    		//luodaan jokaista gistiä kohden yksi GistListItem-komponentti
    		const gists = this.props.gists.map(gist => {
    			return (
					<GistListItem 
						key={gist.id} 
						id={gist.id}
						name={gist.files[0].filename} 
						description={gist.description} 
						language={gist.files[0].language}
						color={this.getColorCode(gist.files[0].language)}
						updatedAt={gist.formattedTime}
						url={gist.viewUrl}
						owner={gist.owner.login} 
						activeGistId={this.props.activeGistId}
						setActive={() => this.props.setActive(gist.id)}
					/>
    			);
    		}, this); 
			
    		//Renderöidään lista ja asetetaan <li>-elementit listan sisällöksi
			return (
				<ul className='listGists'>
					{gists}
				</ul>
			);
    	}	    
	}
		
}

export default GistList;
