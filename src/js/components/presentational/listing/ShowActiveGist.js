import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';


import GistInfo from '../reusable/GistInfo';
import GistFile from '../reusable/GistFile';

class ShowActiveGist extends React.Component {
	
	constructor() {
		super();
		this.toggleInfo = this.toggleInfo.bind(this);
		this.state = {infoVisible: true};
	}
	
	toggleInfo() {
		if($('.showActiveGist').scrollTop() > 10) {
			this.setState({infoVisible: false});
		}	
		else {
			this.setState({infoVisible: true});
		}	
	}
	

	render() {
		const { isFetchingGists, isFetchingSelectedGist, gist } = this.props;
		
		
		//Jos listan lataaminen on valmis ja aktiivisen gistin lataaminen on käynnissä
		//näytetään latausindikaattori
		if(!isFetchingGists && isFetchingSelectedGist) {	
			return <div className='loading'></div>;	
		}
		//Jos lista ja aktiivinen gist on ladattu renderöidään aktiivinen gist
		else if(!isFetchingGists &&
				!isFetchingSelectedGist && gist.hasOwnProperty('id')) {	
    		
			//Käydään gistin sisältämät tiedostot läpi
			//luodaan jokaista tiedostoa kohden yksi GistFile-komponentti
			const files = gist.files.map((file, index) => {
				return (
					<GistFile 
						key={file.filename} 
						filename={file.filename} 
						content={file.content}
						editorId={'editor' + index}> 
					</GistFile>
				);
			});
			
			//Renderöidään aktiivisen gistin näkymä
			//Sisällöksi asetetaan inforuutu, joka sisältää gistin tiedot, sekä
			//tiedostot sisältävät <div>-elementit
			return (
				<div className='showActiveGist' onScroll={this.toggleInfo}>
					<GistInfo 
						id={this.props.id} 
						name={gist.files[0].filename} 
						description={gist.description} 
						editUrl={gist.editUrl} 
						deleteUrl={gist.deleteUrl}
						owner={gist.owner.login} 
						avatarUrl={gist.owner.avatar_url}
						visible={this.state.infoVisible}>
					</GistInfo>
		
					<div className='gistFiles'>
						{files}
					</div>
				</div>
	   	 	);
		}
		else {
			return <div></div>;
		}
	}
	
}


ShowActiveGist.propTypes = {
	gist: PropTypes.object.isRequired,
	isFetchingGists: PropTypes.bool.isRequired,
	isFetchingSelectedGist: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isFetchingGists: state.gists.isFetching,
		isFetchingSelectedGist: state.activeGist.isFetching
	}
}

export default connect(mapStateToProps)(ShowActiveGist);