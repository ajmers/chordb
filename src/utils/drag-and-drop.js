import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const { div } = React.DOM;

const LEFT_BUTTON = 0;
const DRAG_THRESHOLD = 3; // pixels

export class Draggable extends Component {
    static propTypes = {
        className: PropTypes.string,
        onDragStart: PropTypes.func,
        onDragStop: PropTypes.func,
    };

    constructor() {
        super();
        this.state = {
            mouseDown: false,
            dragging: false,
        };
    }

    render() {
        const { className: customClasses } = this.props;
        return (<div {...this.props}
            style={this.style()}
            className={`dnd-draggable ${this.state.dragging ? 'dragging' : undefined} ${customClasses}`}
            onMouseDown={this.onMouseDown}
        ></div>);
    }

    style = () => {
        return this.state.dragging ? (
            {
                position: 'absolute',
                left: this.state.left,
                top: this.state.top,
            }
        ) : {};
    };

    onMouseDown = event => {
        if (event.button === LEFT_BUTTON) {
            const pageOffset = ReactDOM.findDOMNode(this).getBoundingClientRect();
            event.stopPropagation();
            this.addEvents();
            return this.setState({
                mouseDown: true,
                originX: event.pageX,
                originY: event.pageY,
                elementX: pageOffset.left,
                elementY: pageOffset.top,
            });
        }
    };

    onMouseMove = event => {
        const deltaX = event.pageX - this.state.originX;
        const deltaY = event.pageY - this.state.originY;
        const distance = Math.abs(deltaX) + Math.abs(deltaY);

        if (!this.state.dragging && distance > DRAG_THRESHOLD) {
            let fn;
            let fn1;
            this.setState({ dragging: true });
            if (typeof (fn = this.props.onDragStart) === 'function') {
                fn(typeof (fn1 = this.props.dragData) === 'function' ? fn1() : undefined);
            }
        }

        if (this.state.dragging) {
            return this.setState({
                left: this.state.elementX + deltaX + document.body.scrollLeft,
                top: this.state.elementY + deltaY + document.body.scrollTop,
            });
        }
    };

    onMouseUp = () => {
        this.removeEvents();
        if (this.state.dragging) {
            this.props.onDragStop();
            return this.setState({ dragging: false });
        }
    };

    addEvents = () => {
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        return document.addEventListener('mouseup', this.onMouseUp.bind(this));
    };

    removeEvents = () => {
        document.removeEventListener('mousemove', this.onMouseMove);
        return document.removeEventListener('mouseup', this.onMouseUp);
    };
}


export class DropTarget extends Component {
    constructor() {
        super();
        this.state = { hover: false };
    }

    render() {
        return div({
            className: this.classes(),
            onMouseEnter: () => this.setState({ hover: true }),
            onMouseLeave: () => this.setState({ hover: false }),
            onMouseUp: this.onDrop,
        });
    }

    classes = () => {
        return [
            'dnd-drop-target',
            this.active() ? 'active' : undefined,
            this.state.hover ? 'hover' : undefined,
        ].join(' ');
    };

    active = () => {
        return this.props.currentDragItem;
    };

    onDrop = () => {
        if (this.active()) {
            let fn;
            if (typeof (fn = this.props.onDrop) === 'function') {
                return fn({ index: this.props.index + 1 });
            }
        }
    };
}
