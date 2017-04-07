import React from 'react';

export default function Loading(props) {
    return (
        <div className='loading'>
            <div className='loading-center'>
                <img className='loading-indicator' src='/images/loading.gif' />
                <p className='loading-text'>Ladataan...</p>
            </div>
        </div>
    );
}
