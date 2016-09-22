import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';


import GistListItem from './GistListItem';
import { fetchSelectedGist } from '../../../actions/actions';



//Ladataan värikoodit ohjelmointikielille
const COLORS = require("../../../../static/colors.json");

class GistList extends React.Component {

	constructor() {
		super();
		this.getColorCode = this.getColorCode.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.activeGistId === '') {
			{this.props.setActive(nextProps.gists[0].id)}
		}		
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
		const { gists, isFetchingGists, activeGistId, setActive } = this.props;
		
		//Käydään gistien tiedot sisältävä taulukko läpi ja 
		//luodaan jokaista gistiä kohden yksi GistListItem-komponentti
		const listItems = gists.map(gist => {	
			return (
				<GistListItem 
					key={gist.id} 
					id={gist.id}
					filename={gist.files[0].filename} 
					description={gist.description} 
					language={gist.files[0].language}
					color={this.getColorCode(gist.files[0].language)}
					updatedAt={gist.formattedTime}
					owner={gist.owner.login} 
					activeGistId={activeGistId}
					setActive={() => setActive(gist.id)}>
				</GistListItem>
			);
		}, this); 
		
		//Renderöidään lista ja asetetaan <li>-elementit listan sisällöksi
		return (
			<div className='listGists'>
				{isFetchingGists && 
					<div className='loading'></div>
				}
			
				{!isFetchingGists && listItems.length === 0 &&
					<p>Hakuehtoja vastaavia gistejä ei löytynyt.</p>
				}	
				
				{!isFetchingGists && listItems.length > 0 &&
					<ul>
						{listItems}
					</ul>
				}	
			</div>	
		);   
	}
		
}


GistList.propTypes = {
	gists: PropTypes.array.isRequired,
	activeGistId: PropTypes.string.isRequired,
	isFetchingGists: PropTypes.bool.isRequired,
	setActive: PropTypes.func.isRequired
};


let activeId;
function mapStateToProps(state) {
	activeId = state.activeGist.gistId;
	
	return {
		gists: state.gists.items,
		activeGistId: state.activeGist.gistId,
		isFetchingGists: state.gists.isFetching,
		isFetchingSelectedGist: state.activeGist.isFetching,
		chronologicalOrder: state.gists.chronologicalOrder,
		filterByLanguage: state.gists.filterByLanguage
	}
}


function mapDispatchToProps(dispatch) {
	return {
		setActive: (id) => {
			if(id !== activeId) {
				dispatch(fetchSelectedGist(id));
			}
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(GistList);