var React = require('react');
var Block = require('./general/Block');
var Filter = require('./general/Filter');
var TextFilterStore = require('../stores/TextFilterStore');
var CheckboxItem = require('./general/CheckboxItem');
var FilterActions = require('../actions/FilterActions');


var SyllablesCount = React.createClass({
    renderSyllablesCounts() {
        return ['1', '2', '3', '>3'].reverse().map((i) => {
            return (
                <CheckboxItem
                 key={i}
                 onClick={() => FilterActions.toggleSyllablesCount(i)}
                 checked={this.props.syllables[i]}
                 annotation={i}/>
            );
        });
    },
    render() {
        return (
            <Filter caption="Syllables Count">
                <ul>
                    {this.renderSyllablesCounts()}
                </ul>
            </Filter>
        );
    }
});



var OtherFilter = React.createClass({
    mixins: [TextFilterStore.mixin],
    getInitialState() {
        return TextFilterStore.getState();
    },
    onChange() {
        this.setState(TextFilterStore.getState());
    },
    render() {
        return (
            <Block>
                <SyllablesCount syllables={this.state.syllables}/>
            </Block>
        );
    }
});


module.exports = OtherFilter;
