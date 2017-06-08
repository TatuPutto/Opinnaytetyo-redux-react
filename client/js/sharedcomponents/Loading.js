import React from 'react';

function Loading(props) {
    return (
        <div className='loading'>
            <div className='loading-center'>
                <img className='loading-indicator' src='/public/images/loading.gif' />
                <p className='loading-text'>Loading...</p>
            </div>
        </div>
    );
}

export default Loading;
