import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Map} from 'immutable';

function getDigits() {
    return Map([[
        '1', ['1']
    ], [
        '2', ['a', 'b', 'c']
    ], [
        '3', ['d', 'e', 'f']
    ], [
        '4', ['g', 'h', 'i']
    ], [
        '5', ['j', 'k', 'l']
    ], [
        '6', ['m', 'n', 'o']
    ], [
        '7', ['p', 'q', 'r', 's']
    ], [
        '8', ['t', 'u', 'v']
    ], [
        '9', ['w', 'x', 'y', 'z']
    ]]);
}

export const DigitsGrid = React.createClass({
    mixins: [PureRenderMixin],
    getDigits: getDigits,
    render: function() {
        let clickHandle = this.props.clickHandle;
        let digitsList = [];

        this.getDigits().forEach(function(values, digit) {
            digitsList.push(<div className={'digit-'+ digit +' digit-button'}
                        onClick={() => clickHandle(digit, true)}
                        key={digit}>
                <span className='big-digit' key={digit + '_digit'}>{digit}</span>
                <span className='small-values' key={digit + '_values'}>{values.join(', ')}</span>
            </div>);
        });
        
        return <div className="digits-grid">
            {digitsList}
            <div className={'digit-0 digit-button'}
                 onClick={() => clickHandle('0', true)}
                 key={'0'}>
                <span className='big-digit' key={'0_digit'}>0</span>
                <span className='small-values' key={'0_values'}>0</span>
            </div>
        </div>;
    }
});
