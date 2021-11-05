import React from 'react';
import './loading.css';

function Loading(props) {
    let className = 'hidden';
    if(props.showByDefault === true) {
        className = ''
    }
    return (
        <div id='loading-component' className={className}>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
