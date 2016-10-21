import { render } from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import { store } from './createStore';
import { fetchSelectedGistOnEnter, fetchGistsOnEnter, login } from './hooks';
import { fetchUserInfo } from './actions/actions';

import Root from './components/container/Root';
import ListingPage from './components/presentational/listing/ListingPage';
import Gist from './components/container/Gist';
import CreateGist from './components/container/CreateGist';
import EditGist from './components/container/EditGist';

store.dispatch(fetchUserInfo());

//import { getUserInfoFromCookie } from './utility/persistUserInfo';
//console.log(typeof getUserInfoFromCookie);
//console.log(getUserInfoFromCookie());


render(
	<Provider store={store}>					 
		<Router history={browserHistory}>
			<Route path='/' component={Root}>
				<IndexRoute component={ListingPage}
						onEnter={fetchGistsOnEnter}></IndexRoute>
				<Route path='starred' component={ListingPage}
						onEnter={fetchGistsOnEnter}></Route>
				<Route path='discover' component={ListingPage}
						onEnter={fetchGistsOnEnter}></Route>
				<Route path='gist/:gistId' component={Gist} 
						onEnter={fetchSelectedGistOnEnter}></Route>
				<Route path='edit/:gistId' component={EditGist} 
						onEnter={fetchSelectedGistOnEnter}></Route>
				<Route path='create' component={CreateGist}></Route>
				
				//<Route path='/login/:id' component={CreateGist}> onEnter={login}></Route>
				
			</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
);