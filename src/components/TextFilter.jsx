var React = require('react');
var Block = require('./general/Block');
var Filter = require('./general/Filter');
var TextFilterStore = require('../stores/TextFilterStore');


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
                <Filter caption="Syllables Count">
                </Filter>
                <Filter caption="Text Patterns">
                </Filter>
            </Block>
        );
    }
});


module.exports = OtherFilter;
