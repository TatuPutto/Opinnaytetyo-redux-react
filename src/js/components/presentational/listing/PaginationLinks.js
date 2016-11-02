import React from 'react';
import { Link } from 'react-router';


class PaginationLinks extends React.Component {
	render() {
		const { currentPage, nextPage, previousPage, lastPage } = this.props;
		
		console.log(currentPage);
		
		let links = [];
		
		if(currentPage > 1) {
			const link = <Link to={'/discover/' + previousPage}><input type='button' value='<' /></Link>
			links.push(link);
		}
		
		if(currentPage > 3) {
			const link = <Link to='/discover'><input type='button' value='1' /></Link>
			links.push(link);
		}
		
		for(let i = -2; i < 3; i++) {
			const page = Number(currentPage) + i;
			
			if(page > 0 && page < 60) {
				const link = <Link to={'/discover/' + page}>
					<input type='button' value={page} style={{ background: page == currentPage ? 'green' : null }}/>
				</Link>
				links.push(link);
			}
			
			
		}
		
		
		if(currentPage < 58) {
			const link = <Link to='/discover/60'><input type='button' value='60' /></Link>
			links.push(link);
		}
		
		if(currentPage < 60) {
			const page = Number(currentPage) + 1;
			const link = <Link to={'/discover/' + page}><input type='button' value='>' /></Link>
			links.push(link);
		}
				
			
			//for(let i = 0; i < 5; i++) {
				//if(currentPage > 1) {
					
				//}
			//}
		
		
		
		//const asd = <Link to={'/discover/' + previousPage}><input type='button' value='<' /></Link>
		
		//console.log(asdf);
		return (
			<div className='pagination'>
			
				{links}
				
				{/*Edellinen
				{currentPage > 1 && 
					<Link to={'/discover/' + previousPage}>
						<input type='button' value='<' />
					</Link>
				}
				
				
				{currentPage > 1 && currentPage > 2 &&
					<Link to='/discover'>
						<input type='button' value='1' />
					</Link>
				}
				
				
				
				{currentPage !== 1 && 
					<Link to={'/discover' + currentPage}>
						<input type='button' value={previousPage} />
					</Link>
				}
				
				
				
					
				<input type='button' value={currentPage} style={{background: 'green'}} />
				
				<Link to={'/discover/' + nextPage }>
					<input type='button' value={nextPage} />
				</Link>
				
				{currentPage !== lastPage && 
					<Link to={'/discover/' + lastPage}>
						<input type='button' value={lastPage} />
					</Link>
				}
					
				{currentPage < lastPage && 
					<Link to={'/discover/' + nextPage}>
						<input type='button' value='>' />
					</Link>	
				}*/}
				
				
			</div>	
		);
		
		
	}
}

export default PaginationLinks;

