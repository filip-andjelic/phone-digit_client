import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Actions from '../core/action_creators';
import {Core} from '../core/core';
import {DigitsGrid} from '../components/DigitsGrid';
import {DigitsInput} from '../components/DigitsInput';

function bindListerToLocalState(component) {
    isListenerAttached = true;

    Core.socket.on('WORD_LIST', (wordList) => {
        Core.store.dispatch(Actions.wordList(Core.store.getState(), wordList));
        component.setState({'wordList': wordList});
    });

    Core.socket.on('HISTORY_LIST_NEW', (history) => {
        let list = new List(history).toSet().toList();

        Core.store.dispatch(Actions.updateHistory(Core.store.getState(), list));
        component.setState({'wordList': list});
    });
}
function mapStateToProps(state) {
    return {
        inputValue: state.get('inputValue'),
        wordList: state.get('wordList'),
        realWords: state.get('realWords'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inputChange: function(input) {
            // @TODO implement throttle
            return dispatch(Actions.editInput(input));
        },
        toggleRealWords: function() {
            return dispatch(Actions.realWords());
        },
        toggleHistoryList: function() {
            return dispatch(Actions.historyList());
        }
    };
}

let isListenerAttached = false;
export const ConverterPage = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {
            inputValue: this.props.inputValue,
            wordList: this.props.wordList,
            realWords: this.props.realWords,
            inputChange: (input, concat) => {
                if (!input) {
                    this.setState({'wordList': []});
                }
                input = concat ? this.state.inputValue + input : input;

                this.setState(() => {
                    return {
                        inputValue: input
                    };
                });

                return this.props.inputChange(input);
            },
            toggleRealWords: () => {
                this.props.toggleRealWords();
                this.setState('realWords', !this.state.realWords);
            }
        };
    },
    render: function() {
        if (!isListenerAttached) {
            bindListerToLocalState(this);
        }

        return <div className="converter-page-wrapper page-wrapper">
            <div className="page-content horizontal-separation">
                <div className="border-less page-section">
                    <DigitsGrid clickHandle={this.state.inputChange}/>
                </div>
                <div className="border-less page-section">
                    <DigitsInput value={this.state.inputValue}
                                 inputChange={this.state.inputChange}
                                 realWords={this.state.realWords}
                                 wordsList={this.state.wordList}
                                 toggleHistoryList={this.props.toggleHistoryList}
                                 toggleRealWords={this.state.toggleRealWords}/>
                </div>
            </div>
        </div>;
    }
});

export const ConverterPageWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConverterPage);
