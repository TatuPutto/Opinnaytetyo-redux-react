import React, {PropTypes} from 'react';
import $ from 'jquery';
import GistInfo from '../../../sharedcomponents/GistInfo';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Loading from '../../../sharedcomponents/Loading';

class SingleGistLayout extends React.Component {
	componentDidMount() {
		$('.header-content').addClass('narrow');
	}

	render() {
		const {item, isFetching, fetchError} = this.props.activeGist;

		return (
			<div className='single'>
				{isFetching &&
					<Loading />
				}
				{!isFetching && !fetchError &&
					<div className='show-active-gist'>
						<GistInfo
							gist={this.props.activeGist}
							userId={this.props.userId}
							actions={this.props.actions}
						/>
						<GistFiles files={item.files} />
					</div>
				}
				{fetchError &&
					<div className='error'>
						Etsimääsi gistiä ei löytynyt.
					</div>
				}
			</div>
   	 	);
	}
}

export default SingleGistLayout;
