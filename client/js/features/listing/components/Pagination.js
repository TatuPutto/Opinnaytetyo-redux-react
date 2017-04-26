import React from 'react';
import {Link} from 'react-router';


class Pagination extends React.Component {
	createPaginationLinks() {
		let links = [];
		const currentPage = this.props.page;

		// previous page
		if(currentPage > 1) {
			const previousPage = currentPage - 1;
			links.push(
				<Link key={'previousPage'} to={'/discover/' + previousPage}>
					<button><i className='fa fa-chevron-left'></i></button>
				</Link>
			);
		}

		// first page
		if(currentPage > 3) {
			links.push(
				<Link key={1} to='/discover'>
					<button>1</button>
				</Link>
			);
		}

		// close by pages
		for(let i = -2; i < 3; i++) {
			const page = currentPage + i;
			const isCurrentPage = currentPage + i === currentPage;

			if(page > 0 && page < 30) {
				links.push(
					<Link key={page} to={'/discover/' + page}>
						<button
							className={isCurrentPage ? 'current-page' : null}
							disabled={isCurrentPage}
						>
							{page}
						</button>
					</Link>
				);
			}
		}

		// last page
		if(currentPage < 28) {
			links.push(
				<Link key={30} to='/discover/30'>
					<button>30</button>
				</Link>
			);
		}

		// next page
		if(currentPage < 30) {
			const page = currentPage + 1;
			links.push(
				<Link key={'nextPage'} to={'/discover/' + page}>
					<button><i className='fa fa-chevron-right'></i></button>
					</Link>
			);
		}
		return links;
	}


	render() {
		return (
			<div className='pagination'>
				<div className='pagination-links'>
					{this.createPaginationLinks()}
				</div>
			</div>
		);
	}
}

export default Pagination;
