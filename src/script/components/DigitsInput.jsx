import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {WordsList} from '../components/WordsList';

export const DigitsInput = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {
            value: this.props.value,
            showLabel: false
        };
    },
    render: function() {
        let changeHandle = (value) => {
            // @TODO filter chars
            this.props.inputChange(value);
        };

        return <div className="digits-input user-input-element">
            <div className="history-button user-input-button" onClick={this.props.toggleHistoryList}>
                <i className="fa fa-angle-double-up placeholder"/>
                <span className="button-text"> Toggle Input History </span>
            </div>
            <div className="input-wrapper">
                <div className="words-button border-less user-input-button"
                     onClick={this.props.toggleRealWords}
                     onMouseOver={() => this.setState({'showLabel': true})}
                     onMouseLeave={() => this.setState({'showLabel': false})}>
                    <i className="fa fa-comment"/>
                </div>
                <input type="number"
                       min="0"
                       max="9"
                       placeholder="Only digits allowed ..."
                       onChange={(e) => changeHandle(e.target.value)}
                       value={this.props.value}/>
            </div>
            <div className={this.state.showLabel ? 'words-label show-label' : 'words-label'}>
                {this.props.realWords ? 'Only existing words' : 'Show all results'}
            </div>
            <WordsList wordsList={this.props.wordsList}/>
        </div>;
    }
});
