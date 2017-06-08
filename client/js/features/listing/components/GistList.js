import React, {PropTypes} from 'react';
import GistListItem from './GistListItem';
import Pagination from './Pagination';
import Loading from '../../../sharedcomponents/Loading';
import {filterByLanguage} from '../../../utility/filterByLanguage';

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
		this.getColorCode = this.getColorCode.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		//Scrollataan listan alkuun discover-toiminnallisuudessa sivua vaihdettaessa.
		//if(nextProps.currentPage !== this.props.currentPage) {
			//ReactDOM.findDOMNode(this.refs.gistlist).scrollTop = 0;
		//}
			//	&& nextProps.gists.items.length > 0) {

		if(nextProps.gists.items.length > 0) {
			if(this.props.activeGistId !== nextProps.activeGistId) {
				if(this.props.activeGistId !== nextProps.activeGistId) {
				}
			}
		}
	}

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
		const {
			items: gists,
			fetchMethod,
			fetchError,
			isFetching,
			page
		} = this.props.gists;

		// luodaan jokaista taulukon sisältämää gistiä kohden yksi ilmentymä GistListItem-komponentti.
		const listItems = gists.map((gist) => {
			return (
				<GistListItem
					gist={gist}
					key={gist.id}
					id={gist.id}
					filename={gist.files[0].filename}
					description={gist.description}
					fileCount={gist.files.length}
					comments={gist.comments}
					language={gist.files[0].language}
					color={this.getColorCode(gist.files[0].language)}
					createdAt={gist.createdAt}
					updatedAt={gist.updatedAt}
					owner={gist.owner.login}
					ownerAvatar={gist.owner.avatarUrl}
					activeGistId={this.props.activeGistId}
					setActive={this.props.setActive}
					addFilter={this.props.addFilter}
				/>
			);
		}, this);

		// renderöidään lista ja asetetaan GistListItem-komponentista luodut ilmentymät listan sisällöksi.
		return (
			<div className='gist-list' ref='gistlist'>
				{fetchError &&
					<p>Failed to fetch {fetchError}.</p>
				}
				{isFetching && !fetchError &&
					 <Loading />
				}
				{!isFetching && listItems.length === 0 && !fetchError &&
					<p>No matches.</p>
				}
				{listItems.length > 0 && !fetchError && !isFetching &&
					<ul>
						{listItems}
					</ul>
				}
				{fetchMethod === 'discover' && !isFetching &&
					<Pagination page={page} />
				}
			</div>
		);
	}
}

export default GistList;
