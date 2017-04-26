import React, {PropTypes} from 'react';
import GistInfo from '../../../sharedcomponents/GistInfo';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Loading from '../../../sharedcomponents/Loading';

class SingleGistLayout extends React.Component {
	render() {
		const {item, isFetching, fetchError} = this.props.activeGist;

		console.log(isFetching + '\n' + fetchError);
		if(isFetching) {
			return (
				<div className='single'>
					<Loading />
				</div>
			);
		} else if(!isFetching && !fetchError) {
			return (
				<div className='single'>
					<div className='show-active-gist'>
						<GistInfo
							gist={this.props.activeGist}
							userId={this.props.userId}
							actions={this.props.actions}
						/>
						<GistFiles files={item.files} />
					</div>
				</div>
	   	 	);
		} else {
			return (
				<div className='single'>
					<div className='error'>
						Etsimääsi gistiä ei löytynyt.
					</div>
				</div>
			);
		}
	}
}

export default SingleGistLayout;
