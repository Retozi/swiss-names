require('./RangeSlider.scss');
var React = require('react');

// get percentage left relative to first child (i.e. the slider)
function relativeMousePos(e) {
    var mouseX = e.clientX || e.touches[0].clientX;
    var rect = e.currentTarget.childNodes[0].getBoundingClientRect();
    var left = mouseX - rect.left;
    return left / rect.width;
}

var Slider = React.createClass({
    getInitialState() {
        return {
            dragging: null,
            skipDrag: false,
        };
    },
    getDefaultProps() {
        return {
            onSlide: function() {}
        };
    },
    closerElement(pos) {
        return (Math.abs(this.props.start - pos) < Math.abs(this.props.end - pos)) ? 'start' : 'end';
    },
    posState(e) {
        e.preventDefault();
        var pos = relativeMousePos(e);
        var type = this.closerElement(pos);
        if (type === 'start') {
            return [type, Math.min(Math.max(pos, 0), this.props.end)];
        }
        if (type === 'end') {
            return [type, Math.min(Math.max(pos, this.props.start), 1)];
        }
    },
    // drag is throtteled via rAF
    drag(e) {
        if (this.state.dragging && !this.state.skipDrag) {
            var posState = this.posState(e);
            this.props.onSlide(posState[0], posState[1]);
            window.requestAnimationFrame(() => this.setState({skipDrag: false}));
        }
    },
    startDragging(e) {
        var posState = this.posState(e);
        this.setState({dragging: posState[0]});
        this.props.onSlide(posState[0], posState[1]);
    },
    stopDragging(e) {
        if (this.state.dragging) {
            var posState = this.posState(e);
            this.setState({dragging: null});
            this.props.onSlide(posState[0], posState[1]);
        }
    },
    mouseEvents() {
        return {
             onMouseDown: this.startDragging,
             onTouchStart: this.startDragging,
             onMouseUp: this.stopDragging,
             onTouchEnd: this.stopDragging,
             onMouseLeave: this.stopDragging,
             onMouseMove: this.drag,
             onTouchMove: this.drag
        };
    },
    barStyles() {
        return {
            left: this.props.start * 100 + '%',
            width: (this.props.end - this.props.start) * 100 + '%'
        };
    },
    render() {
        return (
        <div className='slider' {...this.mouseEvents()}>
            <div className="slider-bar" data-dragging={this.state.dragging}>
                <div className="slider-bar-active" style={this.barStyles()}>
                    <div className="slider-bar-active-start"/>
                    <div className="slider-bar-active-end"/>
                </div>
            </div>
            <div className="slider-start-value">{this.props.startValue}</div>
            <div className="slider-end-value">{this.props.endValue}</div>
        </div>
        );
    }
});

module.exports = Slider;
