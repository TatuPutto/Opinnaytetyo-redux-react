import React from 'react';
import {Link} from 'react-router';


function NavMenu(props) {
	return (
		<div className='nav-menu col-lg-3'>
			<ul>
				<li><Link to='/'>Listaa gistit</Link></li>
				<li><Link to='/create'>Luo uusi gist</Link></li>
				{/*<li>
					<a href='http://localhost:8080/Opinnaytetyo_spring_react/logout'>
						Kirjaudu ulos
					</a>
				</li>*/}
				{/* <li onClick={props.login}>Kirjaudu sisään</li>*/}

				{/* }
				{!props.loggedIn &&
					<li><a href='http://localhost:8080/Opinnaytetyo_spring_react/authorize'>Kirjaudu sisään</a></li>
				}

				{props.loggedIn &&
					<li><a href='http://localhost:8080/Opinnaytetyo_spring_react/logout'>Kirjaudu ulos</a></li>
				}*/}
			</ul>
		</div>
	);
}

export default NavMenu;
