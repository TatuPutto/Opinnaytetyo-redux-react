import { render } from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory, RouterState} from 'react-router';
import { Provider } from 'react-redux';

import { store } from './createStore';
import { fetchSelectedGistOnEnter, fetchGistsOnEnter } from './hooks';
import { fetchUserInfo } from './actions/actions';

import Root from './components/presentational/Root';
import ConnectListingPage from './components/container/ConnectListingPage';
import PassGistToSingle from './components/container/PassGistToSingle';
import CreateGistContainer from './components/container/CreateGistContainer';
import PassGistToEdit from './components/container/PassGistToEdit';

const application = document.getElementById('container');

store.dispatch(fetchUserInfo());

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={Root}>
				<IndexRoute component={ConnectListingPage} 
						onEnter={fetchGistsOnEnter} />
				<Route path='/gist/:gistId' component={PassGistToSingle} 
						onEnter={fetchSelectedGistOnEnter} />
				<Route path='/edit/:gistId' component={PassGistToEdit} 
						onEnter={fetchSelectedGistOnEnter} />
				<Route path='/create' component={CreateGistContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
);