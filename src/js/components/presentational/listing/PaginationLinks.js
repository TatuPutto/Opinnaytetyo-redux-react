import React from 'react';
import { Link } from 'react-router';


function PaginationLinks(props) {
	const { currentPage, nextPage, previousPage, lastPage } = props;
	
	return (
		<div className='pagination'>
		
		
			{currentPage > 1 && 
				<Link to={'/discover/' + previousPage}>
					<input type='button' value='Edellinen' />
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
					<input type='button' value='Seuraava' />
				</Link>	
			}
			
			
		</div>	
	);
	
	
}

export default PaginationLinks;

