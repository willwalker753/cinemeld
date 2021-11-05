import React from 'react';
import './loading.css';

function Loading(props) {
    console.log(props)
    let className = '';
    if(props.showByDefault === false) {
        className = 'hidden'
    }
    return (
        <div id='loading-component' className={className}>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
