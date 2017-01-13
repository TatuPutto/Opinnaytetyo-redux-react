import React from 'react';
import { Link } from 'react-router';


function NavMenu(props) {
	return (
		<ul className='navmenu'>
			<li><Link to='/'>Listaa gistit</Link></li>
			<li><Link to='create'>Luo uusi gist</Link></li>
			{/*<li onClick={props.login}>Kirjaudu sisään</li>*/}
			
			{!props.loggedIn && 
				<li><a href='http://localhost:8080/Opinnaytetyo_spring_react/authorize'>Kirjaudu sisään</a></li>
			}
			
			{props.loggedIn && 
				<li><a href='http://localhost:8080/Opinnaytetyo_spring_react/logout'>Kirjaudu ulos</a></li>
			}
			
		
		</ul>		
	);
}
		
export default NavMenu;