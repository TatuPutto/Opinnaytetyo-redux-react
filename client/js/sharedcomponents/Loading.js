import React from 'react';

function Loading(props) {
    return (
        <div className='loading'>
            <div className='loading-center'>
                <img className='loading-indicator' src='/images/loading.gif' />
                <p className='loading-text'>Ladataan...</p>
            </div>
        </div>
    );
}

export default Loading;
