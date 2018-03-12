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

    // When words' list is updated
    Core.socket.on('WORD_LIST', (wordList) => {
        Core.store.dispatch(Actions.wordList(Core.store.getState(), wordList));
        component.setState({'wordList': wordList});
    });

    // When history list is updated
    // Words' list component takes history list items to display
    Core.socket.on('HISTORY_LIST_NEW', (history) => {
        let list = new List(history).toSet().toList();

        Core.store.dispatch(Actions.updateHistory(Core.store.getState(), list));
        component.setState({'wordList': list});
    });

    // When user connects to server, take last input value and apply it
    Core.socket.on('INPUT_UPDATE', (inputValue) => {
        component.state.inputChange(inputValue);
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
            // @TODO implement throttle on inserting a digit
            // to ensure server call only after user finished
            // inserting desired digit(s), for egx. on 3 seconds
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
            historyList: false,
            inputChange: (input, concat) => {
                if (!input) {
                    this.setState({'wordList': []});
                }
                input = concat ? this.state.inputValue + input : input;

                this.setState({inputValue: input});
                this.setState({'historyList': false});

                return this.props.inputChange(input);
            },
            toggleRealWords: () => {
                this.props.toggleRealWords();
            },
            toggleHistoryList: () => {
                this.setState({'historyList': true});
                this.props.toggleHistoryList();
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
                                 historyList={this.state.historyList}
                                 wordsList={this.state.wordList}
                                 toggleHistoryList={this.state.toggleHistoryList}
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
