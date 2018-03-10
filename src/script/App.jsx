import React from 'react';
import {ConnectionStateContainer} from './components/ConnectionState';

export default React.createClass({
    render: function() {
        return <div className="arch-container">
            <ConnectionStateContainer/>
            {this.props.children}
        </div>;
    }
});
