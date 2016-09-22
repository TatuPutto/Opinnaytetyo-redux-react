import React from 'react'; 
import {Link} from 'react-router';

class GistListItem extends React.Component {
	
	render() {	
		const { owner, id, activeGistId, filename, description, 
			updatedAt, language, setActive, color } = this.props;
		
		
		//Määritetään ohjelmointikielen sisältävän <span> elementin taustaväri
		const languageSpanColor = {background: color};
		
		//Tarkistetaan onko tämä gist asetettu aktiiviseksi
		const isActive = activeGistId === id ? 
				'singleGist active' : 'singleGist'
		
		//Palautetaan gistin tietojen pohjalta muodostettu <li>-elementti
		return (
			<li className={isActive} id={id} onClick={setActive}>
				<div className='contentWrapper'>
					<span className='title'>
						<Link to={'/gist/' + id}>
							<p>{owner + ' / ' + filename}</p>
						</Link> 		
					</span>
					<span className='description'>
						{description}
					</span>
					<span className='created'>
						Päivitetty: {updatedAt}
					</span>
					<span className='language' style={languageSpanColor}>
						{language}
					</span>
				</div>
			</li>
		);
	}
	
	
}

export default GistListItem;