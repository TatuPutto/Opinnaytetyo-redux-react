import { render } from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { store } from './createStore';
import { fetchSelectedGistOnEnter, fetchGistsOnEnter } from './hooks';
import { fetchUserInfo } from './actions/actions';

import Root from './components/presentational/Root';
import ListingPage from './components/presentational/listing/ListingPage';
import PassGistToSingle from './components/container/PassGistToSingle';
import CreateGistContainer from './components/container/CreateGistContainer';
import PassGistToEdit from './components/container/PassGistToEdit';

store.dispatch(fetchUserInfo());

render(
	<Provider store={store}>					 
		<Router history={browserHistory}>
			<Route path='/(:searchMethod)' component={Root}>
				<IndexRoute component={ListingPage} 
						onEnter={fetchGistsOnEnter}></IndexRoute>
				<Route path='/gist/:gistId' component={PassGistToSingle} 
						onEnter={fetchSelectedGistOnEnter}></Route>
				<Route path='/edit/:gistId' component={PassGistToEdit} 
						onEnter={fetchSelectedGistOnEnter}></Route>
				<Route path='/create' component={CreateGistContainer}></Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
);