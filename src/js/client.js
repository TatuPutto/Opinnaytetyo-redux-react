import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import {store} from './createStore';
import {fetchSelectedGistOnEnter, fetchGistsOnEnter} from './hooks';
import {receiveUserInfo} from './actions/actions';
import getUserInfoFromCookie from './utility/getuserinfofromstorage';


import Root from './components/container/Root';
//import ListingPage from './components/presentational/listing/ListingPage';
import ListingView from './features/listing/components/ListingView';
import SingleGist from './features/single/components/SingleGist';
import CreateGist from './components/container/CreateGist';
import EditGist from './components/container/EditGist';

require('../css/basicrules.less');
require('../css/header.less');
require('../css/listing.less');
require('../css/single.less');
require('../css/creategist.less');
require('../css/comments.less');

const userInfo = getUserInfoFromCookie();
store.dispatch(receiveUserInfo(userInfo));

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Root}>
				<IndexRoute component={ListingView}
						onEnter={fetchGistsOnEnter} />
				<Route path='gists' component={ListingView}
						onEnter={fetchGistsOnEnter} />
				<Route path='starred' component={ListingView}
						onEnter={fetchGistsOnEnter} />
				<Route path='discover(/:page)' component={ListingView}
						onEnter={fetchGistsOnEnter} />
				<Route path='search(/:user)' component={ListingView}
						onEnter={fetchGistsOnEnter} />
				<Route path='gist/:gistId' component={SingleGist}
						onEnter={fetchSelectedGistOnEnter} />
				<Route path='edit/:gistId' component={EditGist}
						onEnter={fetchSelectedGistOnEnter} />
				<Route path='create' component={CreateGist} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
);
