import React from 'react';
import './loading.css';

function Loading() {
    return (
        <div id='loading-component' className='hidden'>
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
