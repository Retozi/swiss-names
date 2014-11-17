"use strict";

var shallowEqual = require('react/lib/shallowEqual');

/**
* Keep boundingClientRect as state in  a component.
* You must make a "boundingRectTarget" ref
* to the element you would like to track
*/
module.exports = {
    getInitialState() {
        return {rect: {
            left: null, top: null, right: null, bottom: null, width: null, height: null
        }};
    },
    width() {
        return this.state.rect.width;
    },
    height() {
        return this.state.rect.height;
    },
    left() {
        return this.state.rect.left;
    },
    top() {
        return this.state.rect.top;
    },
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        // set the wait variable for rAF
        this._updateDimensionsWait = false;
        this.updateDimensions();
    },
    componentWillUnmount() {
        // we need to cancel a potential pending rAF
        window.cancelAnimationFrame(this._dimensionsRAFid);
        window.removeEventListener("resize", this.updateDimensions);
    },
    componentWillReceiveProps() {
        this.updateDimensions();
    },
    // throttle updateDemensions with requestAnimationFrame for efficiency
    updateDimensions() {
        if (!this.refs.boundingRectTarget) {
            console.warn("Warning: Component is missing boundingRectTarget ref");
            return;
        }
        if (this._updateDimensionsWait) {
            return;
        }
        this._updateDimensionsWait = true;
        // throttle the calls with rAF
        this._dimensionsRAFid = window.requestAnimationFrame(() => {
            this._updateDimensionsWait = false;
            var r = this.refs.boundingRectTarget.getDOMNode().getBoundingClientRect();
            if (!shallowEqual(this.state.rect, r)) {
                this.setState({rect: r});
            }
        });
    }
};
