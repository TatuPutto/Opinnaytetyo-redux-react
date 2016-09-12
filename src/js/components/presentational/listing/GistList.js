import React from 'react';
import $ from 'jquery';
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
		const {gists, isLoading, activeGistId, setActive} = this.props;
		
		//Renderöidään latausindikaattori jos lataus on kesken
		if(isLoading === true || gists.length < 1) {
    		return <div className='loading'></div>; 
		}
    	else {
    		//Käydään gistien tiedot sisältävä taulukko läpi ja 
    		//luodaan jokaista gistiä kohden yksi GistListItem-komponentti
    		const listItems = gists.map(gist => {
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
						activeGistId={activeGistId}
						setActive={() => setActive(gist.id)}
					/>
    			);
    		}, this); 
			
    		//Renderöidään lista ja asetetaan <li>-elementit listan sisällöksi
			return (
				<ul className='listGists'>
					{listItems}
				</ul>
			);
    	}	    
	}
		
}

export default GistList;
