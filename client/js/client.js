import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import Promise from 'promise-polyfill';

import store from './createStore';
import {receiveUserInfo} from './features/user/duck';
import getUserInfoFromCookie from './utility/getuserinfofromstorage';
import {
	fetchSelectedGistOnEnter,
	fetchGistsOnEnter,
	checkAuthorization
} from './hooks';

import Root from './Root';
import Listing from './features/listing/components/ListingView';
import SingleGist from './features/single/components/SingleGistView';
import CreateGist from './features/creategist/components/CreateGistView';
import EditGist from './features/editgist/components/EditGistView';
import Forbidden from './features/forbidden/components/Forbidden';
import ResourceNotFound from './features/404/components/ResourceNotFound';

require('../css/basicrules.less');
require('../css/header.less');
require('../css/listing.less');
require('../css/single.less');
require('../css/creategist.less');
require('../css/comments.less');

if (!window.Promise) {
  window.Promise = Promise;
}

const userInfo = getUserInfoFromCookie();
let loggedIn;
if(userInfo.length === 0) {
	loggedIn = false;
} else {
	loggedIn = true;
	store.dispatch(receiveUserInfo(userInfo));
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' loggedIn={loggedIn} component={Root}>
				<IndexRoute component={Listing}
						onEnter={checkAuthorization} />
				<Route path='gists' component={Listing}
						onEnter={checkAuthorization} />
				<Route path='starred' component={Listing}
						onEnter={checkAuthorization} />
				<Route path='discover(/:page)' component={Listing}
						onEnter={fetchGistsOnEnter} />
				<Route path='search(/:user)' component={Listing}
						onEnter={fetchGistsOnEnter} />
				<Route path='gist/:gistId' component={SingleGist}
						onEnter={fetchSelectedGistOnEnter} />
				<Route path='edit/:gistId' component={EditGist}
						onEnter={checkAuthorization} />
				<Route path='create' component={CreateGist}
						onEnter={checkAuthorization} />
				<Route path='forbidden' component={Forbidden} />
				<Route path='*' component={ResourceNotFound} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
);
