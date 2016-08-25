import React from 'react';

import GistInfo from '../reusable/GistInfo';
import GistFile from '../reusable/GistFile';

class ShowActiveGist extends React.Component {
	

	render() {
		//Jos listan lataaminen on valmis ja aktiivisen gistin lataaminen on käynnissä
		//näytetään latausindikaattori
		if(this.props.isLoadingList === false && 
				this.props.isLoadingSelectedGist === true) {	
			return <div className='loading'></div>;	
		}
		//Jos lista ja aktiivinen gist on ladattu renderöidään aktiivinen gist
		else if(this.props.isLoadingList === false &&
				this.props.isLoadingSelectedGist === false &&
				this.props.gist !== null) {	
			const gist = this.props.gist; 
    		
			//Käydään gistin sisältämät tiedostot läpi
			//luodaan jokaista tiedostoa kohden yksi GistFile-komponentti
			const files = gist.files.map((file, index) => {
				return (
					<GistFile 
						key={file.filename} 
						filename={file.filename} 
						content={file.content}
						editorId={'editor' + index} 
					/>
				);
			});
			
			//Renderöidään aktiivisen gistin näkymä
			//Sisällöksi asetetaan inforuutu, joka sisältää gistin tiedot, sekä
			//tiedostot sisältävät <div>-elementit
			return (
				<div className='showActiveGist'>
					<GistInfo 
						id={this.props.id} 
						name={gist.files[0].filename} 
						description={gist.description} 
						editUrl={gist.editUrl} 
						deleteUrl={gist.deleteUrl}
						owner={gist.owner.login} 
						avatarUrl={gist.owner.avatar_url} 
					/>
		
					<div className='gistFiles'>
						{files}
					</div>
				</div>
	   	 	);
		}
		else {
			return <div className='contentRight'></div>;
		}
	}
	
}

export default ShowActiveGist;