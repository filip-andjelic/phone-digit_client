import React from 'react';
import {ConnectionStateContainer} from './components/ConnectionState';

export default React.createClass({
    render: function() {
        return <div id="arch-layout-grid" className="arch-container">
            <ConnectionStateContainer/>
            <div id="application-page-content" className="application-view-wrapper">
                {this.props.children}
            </div>
        </div>;
    }
});
