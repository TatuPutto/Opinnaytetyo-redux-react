import React, {PropTypes} from 'react';
import GistInfo from '../../../sharedcomponents/GistInfo';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Loading from '../../../sharedcomponents/Loading';

class SingleGistLayout extends React.Component {
	render() {
		const {
			//id,
			//files,
			isFetching,
			fetchError,
		} = this.props.gist;
		console.log(this.props);

		if(isFetching || this.props.gist.hasOwnProperty('gistId') &&
		 		!this.props.gist.gistId && !fetchError) {
			return (
				<div className='single'>
					<Loading />
				</div>
			);
		} else if(!isFetching && this.props.gist.hasOwnProperty('gistId') &&
		 		this.props.gist.gistId && !fetchError) {
			return (
				<div className='single'>
					<div className='show-active-gist'>
						<GistInfo
							gist={this.props.gist}
							userId={this.props.userId}
							actions={this.props.actions}
						/>
						<GistFiles files={this.props.gist.gist.files} />
					</div>
				</div>
	   	 	);
		} else {
			return (
				<div className='single'>
					<div className='error'>
						Etsimääsi gistiä ei löytynyt ({fetchError}).
					</div>
				</div>
			);
		}
	}
}

export default SingleGistLayout;
