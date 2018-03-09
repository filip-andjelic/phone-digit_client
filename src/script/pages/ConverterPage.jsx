import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Actions from '../core/action_creators';
import {List, Map} from 'immutable';
import {DigitsGrid} from '../components/DigitsGrid';

function inputChange(state, input) {
    // @TODO implement throttle
    console.log(input);
    state.set('inputValue', 7);
}
function toggleRealWords() {
    
}
function toggleHistoryList() {

}
function mapStateToProps(state) {
    return {
        inputValue: state.get('inputValue'),
        inputChange: function(input) {
            console.log(state);
            return inputChange(state, input);
        },
        toggleRealWords: function(input) {
            return toggleRealWords(state, input);
        },
        toggleHistoryList: function(input) {
            return toggleHistoryList(state, input);
        },
    };
}

export const ConverterPage = React.createClass({
    mixins: [PureRenderMixin],
    wordsList: List(),
    render: function() {
        return <div className="converter-page-wrapper page-content horizontal-separation">
            <div className="page-section">
                <DigitsGrid clickHandle={this.props.inputChange}/>
            </div>
            <div className="page-section">

            </div>
        </div>;
    }
});

export const ConverterPageWrapper = connect(
    mapStateToProps,
    Actions
)(ConverterPage);
