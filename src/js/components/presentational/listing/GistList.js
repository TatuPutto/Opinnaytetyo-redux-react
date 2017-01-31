import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import $ from 'jquery';

import GistListItem from './GistListItem';
import PaginationLinks from './PaginationLinks';
import { fetchSelectedGist, fetchMoreGists } from '../../../actions/actions';

//Ladataan värikoodit ohjelmointikielille
const colors = require("../../../../static/colors.json");

class GistList extends React.Component {
/*
	static propTypes = {
		gists: PropTypes.array.isRequired,
		activeGistId: PropTypes.string.isRequired,
		isFetching: PropTypes.bool.isRequired,
		setActive: PropTypes.func.isRequired
	};
*/
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};


	constructor() {
		super();
		//this.setActive = this.setActive.bind(this);
		this.getColorCode = this.getColorCode.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		//Scrollataan listan alkuun discover-toiminnallisuudessa sivua vaihdettaessa.
		if(nextProps.currentPage !== this.props.currentpage
				&& nextProps.gists.items.length > 0) {
			ReactDOM.findDOMNode(this.refs.gistlist).scrollTop = 0;
		}

		//Jos listassa on tuloksia ja tällä hetkellä ei ole aktiivista gistiä
		/*if(nextProps.gists.length > 0 && !this.props.activeGistId) {

			{this.props.setActive(nextProps.gists[0].id)}
		}*/

		//&& nextProps.fetchMethod === this.props.fetchMethod

		/*
		if(nextProps.gists.length > 0 && !nextProps.activeGistId ) {
				//nextProps.currentPage !== this.props.currentpage) {

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

	}

	/**
	 * Haetaan kielelle määrietty värikoodi
	 */
	getColorCode(language) {
		let colorCode;
		try {
			colorCode = colors[language].color;
		} catch(error) {
			colorCode = '#D0D0D0';
		}
		return colorCode;
	}



	render() {
		/*const { gists, fetchMethod, isFetching, activeGistId, setActive,
				fetchMore, currentPage, nextPage, previousPage, lastPage } = this.props;*/

		const {
			items: gists,
			fetchMethod,
			isFetching
		} = this.props.gists;
		const {
			currentPage,
			nextPage,
			previousPage,
			lastPage
		} = this.props.pagination;
		const fetchError = null;

		//Käydään gistien tiedot sisältävä taulukko läpi ja
		//luodaan jokaista gistiä kohden yksi ilmentymä GistListItem-komponentti.
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
					activeGistId={this.props.activeGistId}
					setActive={this.props.setActive}
				/>
			);
		}, this);

		//Renderöidään lista ja asetetaan GistListItem-komponentista
		//luodut ilmentymät listan sisällöksi.
		return (

			<div className='gist-list' ref='gistlist'>
				{fetchError &&
					<p>Gistien hakemisessa tapahtui virhe.</p>
				}

				{isFetching && listItems.length === 0 && !fetchError &&
					<div className='loading'></div>
				}

				{!isFetching && listItems.length === 0 && !fetchError &&
					<p>Hakuehtoja vastaavia gistejä ei löytynyt.</p>
				}

				{listItems.length > 0 && !fetchError &&
					<div style={{opacity: isFetching ? 0.5 : 1}}>
						<ul>
							{listItems}
						</ul>
					</div>
				}


				{fetchMethod === 'discover' &&
					<PaginationLinks
						currentPage={currentPage}
						nextPage={nextPage}
						previousPage={previousPage}
						lastPage={lastPage}
					/>
				}
			</div>
		);
	}

}


import { filterByLanguage } from '../../../utility/filterByLanguage';

let activeId;
function mapStateToProps(state) {
	activeId = state.activeGist.gistId;

	return {
		//gists: filterByLanguage(state.filters.language, state.gists.items),
		activeGistId: state.activeGist.gistId,
		//isFetching: state.gists.isFetching,
		//fetchMethod: state.gists.fetchMethod,
		currentPage: state.pagination.currentPage,
		nextPage: state.pagination.nextPage,
		previousPage: state.pagination.previousPage,
		lastPage: state.pagination.lastPage,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		/*setActive: (id) => {
			if(id !== activeId) {
				dispatch(fetchSelectedGist(id));
			}
		},
		fetchMore: (pageNum) => {
			dispatch(fetchMoreGists(pageNum));
		}*/
	};
}

//export default GistList;
export default connect(mapStateToProps, mapDispatchToProps)(GistList);
