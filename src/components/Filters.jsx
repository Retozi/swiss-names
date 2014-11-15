require('./Filters.scss');
var React = require('react');
var GreyBox = require('./general/GreyBox');
var RadioItem = require('./general/RadioItem');
var CheckboxItem = require('./general/CheckboxItem');
var Filter = require('./general/Filter');
var NameListStore = require('../stores/NameListStore');
var FilterActions = require('../actions/FilterActions');

var LANGUAGES = {
    'de': 'German',
    'fr': 'French',
    'it': 'Italian',
    'ro': 'Romansh'
};

function getFilterState() {
    return NameListStore.getFilterState();
}

var GenderLanguageFilter = React.createClass({
    mixins: [NameListStore.mixin],
    getInitialState() {
        return getFilterState();
    },
    onChange() {
        this.setState(getFilterState());
    },
    genderItemClick(gender) {
        if (gender !== this.state.gender) {
            FilterActions.switchGender();
        }
    },
    langItemClick(lang) {
        var index = this.state.langs.indexOf(lang);
        var newLangs;
        if (index > -1) {
            //make a copy with slice, just to be sure...
            newLangs = this.state.langs.slice();
            newLangs.splice(index, 1);
            if (newLangs.length === 0) {
                newLangs = Object.keys(LANGUAGES);
            }
        } else {
            newLangs = this.state.langs.slice();
            newLangs.push(lang);
        }
        FilterActions.setLanguages(newLangs);
    },
    renderLanguageRegions() {
        return Object.keys(LANGUAGES).map((l) => {
            return <CheckboxItem
                    key={l}
                    onClick={() => this.langItemClick(l)}
                    checked={this.state.langs.indexOf(l) > -1}
                    annotation={LANGUAGES[l]}/>;
        });
    },
    render() {
        return (
            <GreyBox>
                <Filter caption="Gender">
                    <ul>
                        <RadioItem
                         key="male"
                         active={this.state.gender === "MALE"}
                         onClick={() => this.genderItemClick("MALE")}
                         annotation="Male"/>
                        <RadioItem
                         key="female"
                         onClick={() => this.genderItemClick("FEMALE")}
                         active={this.state.gender === "FEMALE"}
                         annotation="Female"/>
                    </ul>
                </Filter>
                <Filter caption="Language Region">
                    <ul>
                        {this.renderLanguageRegions()}
                    </ul>
                </Filter>
            </GreyBox>
        );
    }
});



var Filters = React.createClass({

    render() {
        return (
            <div className="filters">
                <GenderLanguageFilter/>
            </div>
        );
    }
});

module.exports = Filters;
