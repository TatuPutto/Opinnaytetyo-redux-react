import React from 'react';

class Filters extends React.Component {
	constructor() {
		super();
		this.toggleFilteringOptions = this.toggleFilteringOptions.bind(this);
		
		//Alustetaan komponentin tila.
		this.state = { isOpen: false };
	}

	//Muutetaan komponentin tilaa.
	toggleFilteringOptions() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		//Määritellään painikkeen arvo isOpen-muuttujan arvon perusteella.
		const buttonText = this.state.isOpen ? 'Piilota suodattimet' : 'Näytä suodattimet';
		
		return (
			<div className='filters'>
				<input type='button' value={buttonText}
						onClick={this.toggleFilteringOptions} />
								
				
				{/*Mallinnetaan suodatustoiminnot, jos isOpen === true*/}
				{this.state.isOpen &&
					<FilteringOptions />
				}		
			</div>	
		);
	}
}


export default Asdf;