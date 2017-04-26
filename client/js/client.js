import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import {store} from './createStore';
import {fetchSelectedGistOnEnter, fetchGistsOnEnter} from './hooks';
import {receiveUserInfo} from './features/user/duck';
import getUserInfoFromCookie from './utility/getuserinfofromstorage';

import Root from './Root';
import Listing from './features/listing/components/ListingView';
import SingleGist from './features/single/components/SingleGistView';
import CreateGist from './features/creategist/components/CreateGistView';
import EditGist from './features/editgist/components/EditGistView';

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
				<IndexRoute component={Listing}
						onEnter={fetchGistsOnEnter} />
				<Route path='gists' component={Listing}
						onEnter={fetchGistsOnEnter} />
				<Route path='starred' component={Listing}
						onEnter={fetchGistsOnEnter} />
				<Route path='discover(/:page)' component={Listing}
						onEnter={fetchGistsOnEnter} />
				<Route path='search(/:user)' component={Listing}
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
