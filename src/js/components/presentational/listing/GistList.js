import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import GistListItem from './GistListItem';
import { fetchSelectedGist, fetchMoreGists } from '../../../actions/actions';

//Ladataan värikoodit ohjelmointikielille
const colors = require("../../../../static/colors.json");

class GistList extends React.Component {

	static propTypes = {
		gists: PropTypes.array.isRequired,
		activeGistId: PropTypes.string.isRequired,
		isFetching: PropTypes.bool.isRequired,
		setActive: PropTypes.func.isRequired
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	
	constructor() {
		super();
		//this.setActive = this.setActive.bind(this);
		this.getColorCode = this.getColorCode.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.gists.length > 0 && !nextProps.activeGistId && 
				!nextProps.fetchError && 
				nextProps.fetchMethod === this.props.fetchMethod) {
			console.log('täällä');
			{this.props.setActive(nextProps.gists[0].id)}
		}		
	}
	
	/*
	setActive(id) {
		const pushUrl = location.pathname + '?gist=' + id;
		this.context.router.push(pushUrl);
		{this.props.setActive(id)}
	}
	*/
	
	/**
	 * Haetaan kielelle määrietty värikoodi
	 */
	getColorCode(language) {
		try {
			var colorCode = colors[language].color;
		}
		catch(error) {
			var colorCode = '#D0D0D0';
		}
		return colorCode;
	}
	
	
	
	render() {
		const { gists, fetchMethod, isFetching, activeGistId, setActive, 
				fetchMore, nextPage } = this.props;
	
		//Käydään gistien tiedot sisältävä taulukko läpi ja 
		//luodaan jokaista gistiä kohden yksi GistListItem-komponentti
		const listItems = gists.map(gist => {
			return (
				<GistListItem key={gist.id} id={gist.id}
						filename={gist.files[0].filename} 
						description={gist.description} 
						language={gist.files[0].language}
						color={this.getColorCode(gist.files[0].language)}
						updatedAt={gist.formattedTime}
						owner={gist.owner.login} 
						activeGistId={activeGistId}
						setActive={() => setActive(gist.id)} />
			);
		}, this); 
		
		//Renderöidään lista ja asetetaan <li>-elementit listan sisällöksi
		return (
			<div className='listGists'>
				{isFetching && 
					<div className='loading'></div>
				}

				{!isFetching && listItems.length === 0 &&
					<p>Hakuehtoja vastaavia gistejä ei löytynyt.</p>
				}	
				
				{!isFetching && listItems.length > 0 &&
					<ul>
						{listItems}
						
						{fetchMethod === 'discover' && 
							<input type='button' value='Lataa lisää'
									onClick={() => fetchMore(nextPage)} />
						}
					</ul>
				}	
					
			</div>	
		);   
	}
		
}


let activeId;
function mapStateToProps(state) {
	activeId = state.activeGist.gistId;
	
	//console.log(state.pagination);
	
	return {
		gists: state.gists.items,
		activeGistId: state.activeGist.gistId,
		isFetching: state.gists.isFetching,
		fetchMethod: state.gists.fetchMethod,
		nextPage: state.pagination.nextPage
	}
}


function mapDispatchToProps(dispatch) {
	return {
		setActive: (id) => {
			if(id !== activeId) {
				dispatch(fetchSelectedGist(id));
			}
		},
		fetchMore: (pageNum) => {
			dispatch(fetchMoreGists(pageNum));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(GistList);