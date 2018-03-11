import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const WordsList = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        let clickHandle = (string) => {
            if (this.props.clickHandle) {
                this.props.clickHandle(string);
            }
        };
        let wordsList = [];

        if (this.props.wordsList && this.props.wordsList.length) {
            this.props.wordsList.forEach(function(value) {
                wordsList.push(<div className="words-item"
                                    onClick={clickHandle(value)}
                                    key={value}>{value}</div>);
            });
        }

        return <div className="words-list">
            {wordsList}
        </div>;
    }
});
