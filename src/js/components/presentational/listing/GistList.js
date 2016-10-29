import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import $ from 'jquery';

import GistListItem from './GistListItem';
import PaginationLinks from './PaginationLinks';
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
		console.log(nextProps.activeGistId);
		
		//Jos listassa on tuloksia ja tällä hetkellä ei ole aktiivista gistiä
		if(nextProps.gists.length > 0 && !this.props.activeGistId) {
			{this.props.setActive(nextProps.gists[0].id)}
		}
		
		
		if(nextProps.gists.length > 0 && !this.props.activeGistId) {
			let asd = false;
			
			nextProps.gists.forEach((gist) => {
				if(gist.id === this.props.activeGistId) {
					asd = true
				}
			});
			
			if(asd) {
				{this.props.setActive(nextProps.gists[0].id)}
			}
		}
		
		
		
		/*//Jos on gistejä
		if(nextProps.gists.length > 0) {
			if(!nextProps.activeGistId) {
				{this.props.setActive(nextProps.gists[0].id)}
			}
			
			
			
		}*/
		
		/*if(nextProps.gists.length > 0 && !nextProps.activeGistId && 
				nextProps.fetchMethod === this.props.fetchMethod &&
				nextProps.currentPage !== this.props.currentpage) {
			{this.props.setActive(nextProps.gists[0].id)}
		}		*/
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
		let colorCode;
		try {
			colorCode = colors[language].color;
		}
		catch(error) {
			colorCode = '#D0D0D0';
		}
		return colorCode;
	}
	
	
	
	render() {
		const { gists, fetchMethod, isFetching, activeGistId, setActive, 
				fetchMore, currentPage, nextPage, previousPage, lastPage } = this.props;
	
		//Käydään gistien tiedot sisältävä taulukko läpi ja 
		//luodaan jokaista gistiä kohden yksi GistListItem-komponentti
		let listItems = gists.map(gist => {
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
		
		/*
		listItems = listItems.sort((a, b) => {
			var dateA = new Date(a.updated_at);
			var dateB = new Date(b.updated_at);
			
			return dateA - dateB;
		});
		*/
		
		
		//Renderöidään lista ja asetetaan <li>-elementit listan sisällöksi
		return (
			<div className='listGists'>
				
				{isFetching && listItems.length === 0 &&
					<div className='loading'></div>
				}

				{!isFetching && listItems.length === 0 &&
					<p>Hakuehtoja vastaavia gistejä ei löytynyt.</p>
				}	
				
				{listItems.length > 0 &&
					<div style={{ opacity: isFetching ? 0.5 : 1 }}>
						<ul>
							{listItems}	
						</ul>
						
						{fetchMethod === 'discover' && 
							<PaginationLinks 
									currentPage={currentPage}
									nextPage={nextPage}
									previousPage={previousPage}
									lastPage={lastPage} />
						}
					</div>
				}	
					
			</div>	
		);   
	}
		bbb
}


let activeId;
function mapStateToProps(state) {
	activeId = state.activeGist.gistId;
	
	console.log('Nykyinen sivu: ' + state.pagination.currentPage);
	console.log('Seuraava sivu: ' + state.pagination.nextPage);
	console.log('Edellinen sivu: ' + state.pagination.previousPage);
	console.log('Viimeinen sivu: ' + state.pagination.lastPage);
	
	return {
		gists: state.gists.items,
		activeGistId: state.activeGist.gistId,
		isFetching: state.gists.isFetching,
		fetchMethod: state.gists.fetchMethod,
		currentPage: state.pagination.currentPage,
		nextPage: state.pagination.nextPage,
		previousPage: state.pagination.previousPage,
		lastPage: state.pagination.lastPage,
		filter: state.gists.filter
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