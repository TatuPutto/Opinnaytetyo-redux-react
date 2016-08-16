import React from 'react'; 
import {Link} from 'react-router';

class GistListItem extends React.Component {
	
	render() {
		var description = this.props.description; 
		if(description !== null && description.length > 150) {
			description = description.substring(0, 150) + '...';
		}
		
		var spanStyle= {background: this.props.color};
		
		var active = this.props.activeGistId === this.props.id ? 
				'singleGist active' : 'singleGist'
					
		return (
			<li className={active} 
					id={this.props.id} onClick={this.props.setActive}>
			
				<div className='contentWrapper'>
					<span className='title'>
						<Link to={this.props.url}>
							<p>{this.props.owner + ' / ' + this.props.name}</p>
						</Link> 		
					</span>
							
					<span className='description'>
						{description}
					</span>
					
					<span className='created'>
						Päivitetty: {this.props.created}
					</span>
					
					<span className='language' style={spanStyle}>
						{this.props.language}
					</span>
				</div>
			</li>
		);
	}
	
	
}

export default GistListItem;