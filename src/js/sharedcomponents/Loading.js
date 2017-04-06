import React from 'react';

export default function Loading(props) {
    return (
        <div className='loading'>
            <div className='loading-center'>
                <img className='loading-indicator'
                        src='http://localhost:9090/images/loading.gif' />
                <p className='loading-text'>Ladataan...</p>
            </div>
        </div>
    );
}
