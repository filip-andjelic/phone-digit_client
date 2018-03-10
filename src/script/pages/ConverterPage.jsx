import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Actions from '../core/action_creators';
import {DigitsGrid} from '../components/DigitsGrid';
import {DigitsInput} from '../components/DigitsInput';

function mapStateToProps(state) {
    return {
        inputValue: state.get('inputValue')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inputChange: function(input) {
            // @TODO implement throttle
            return dispatch(Actions.editInput(input));
        },
        toggleRealWords: function(input) {
            //return toggleRealWords(state, input);
        },
        toggleHistoryList: function(input) {
            //return toggleHistoryList(state, input);
        }
    };
}

export const ConverterPage = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {
            inputValue: this.props.inputValue,
            inputChange: (input, concat) => {
                input = concat ? this.state.inputValue + input : input;

                this.setState(() => {
                    return {
                        inputValue: input
                    };
                });

                return this.props.inputChange(input);
            }
        };
    },
    render: function() {
        return <div className="converter-page-wrapper page-content horizontal-separation">
            <div className="page-section">
                <DigitsGrid clickHandle={this.state.inputChange}/>
            </div>
            <div className="page-section">
                <DigitsInput value={this.state.inputValue}
                             inputChange={this.state.inputChange}
                             toggleHistoryList={this.props.toggleHistoryList}
                             toggleRealWords={this.props.toggleRealWords}/>
            </div>
        </div>;
    }
});

export const ConverterPageWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConverterPage);
