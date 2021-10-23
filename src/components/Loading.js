import React from 'react';
import './loading.css';

function Loading() {
    return (
        <div id='loading-component' className='hidden'>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
