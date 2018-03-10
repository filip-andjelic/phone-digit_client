import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const DigitsInput = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {
            isRealWord: false,
            value: this.props.value
        };
    },
    render: function() {
        let changeHandle = (value) => {
            // @TODO filter chars
            this.props.inputChange(value);
        };

        return <div className="digits-input">
            <div
                className="words-label">{this.state.isRealWord ? 'Convert to existing words' : 'Show all results'}</div>
            <div className="history-button" onClick={this.props.toggleHistoryList}>Toggle Input History</div>
            <div className="input-wrapper">
                <div className="words-button" onClick={this.props.toggleRealWords}><i className="fa fa-comment"></i>
                </div>
                <input type="number"
                       placeholder="Only digits allowed ..."
                       onChange={(e) => changeHandle(e.target.value)}
                        value={this.props.value}/>
            </div>
        </div>;
    }
});
