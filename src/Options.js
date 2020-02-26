import React from 'react';
import './Options.css';

function Options() {

    return (
        <div className="list-group" id="options" role="tablist">
            <a className="list-group-item list-group-item-action active" data-toggle="list" href="#userInfoEdit" role="tab">Info</a>
            <a className="list-group-item list-group-item-action" data-toggle="list" href="#employmentEdit" role="tab">Employment</a>
            <a className="list-group-item list-group-item-action" data-toggle="list" href="#messages" role="tab">Messages</a>
        </div>
    );
}

export default Options;