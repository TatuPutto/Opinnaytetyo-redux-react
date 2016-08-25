import React from 'react'; 
import {Link} from 'react-router';

class GistListItem extends React.Component {
	
	render() {	
		//Määritetään ohjelmointikielen sisältävän <span> elementin taustaväri
		const languageSpanColor = {background: this.props.color};
		
		//Tarkistetaan onko tämä gist asetettu aktiiviseksi
		const isActive = this.props.activeGistId === this.props.id ? 
				'singleGist active' : 'singleGist'
		
		//Palautetaan gistin tietojen pohjalta muodostettu <li>-elementti
		return (
			<li className={isActive} 
					id={this.props.id} onClick={this.props.setActive}>
			
				<div className='contentWrapper'>
					<span className='title'>
						<Link to={this.props.url}>
							<p>{this.props.owner + ' / ' + this.props.name}</p>
						</Link> 		
					</span>
					<span className='description'>
						{this.props.description}
					</span>
					<span className='created'>
						Päivitetty: {this.props.updatedAt}
					</span>
					<span className='language' style={languageSpanColor}>
						{this.props.language}
					</span>
				</div>
			</li>
		);
	}
	
	
}

export default GistListItem;