import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const { div, p } = React.DOM;

const LEFT_BUTTON = 0;
const DRAG_THRESHOLD = 3; // pixels

class Example extends Component {
    getInitialState() {
        return { currentDragItem: null };
    }

    render() {
        return div({
            className: `dnd-example ${this.state.currentDragItem ? 'dragging' : undefined}`,
            children: [
                SourceObjects({
                    onDragStart: this.onDragStart,
                    onDragStop: this.onDragStop,
                }),
                DropTargets({
                    currentDragItem: this.state.currentDragItem,
                    onDrop: this.onDrop,
                }),
                this.dropDescription(),
            ],
        });
    }

    onDragStart = details => {
        return this.setState({ currentDragItem: details });
    };

    onDragStop = () => {
        return this.setState({ currentDragItem: null });
    };

    onDrop = target => {
        return this.setState({
            lastDrop: {
                source: this.state.currentDragItem,
                target: target,
            },
        });
    };

    dropDescription = () => {
        var drop;
        if (drop = this.state.lastDrop) {
            return p({
                className: 'drop-description',
                children: `Dropped source ${drop.source.type}-${drop.source.index} on target ${drop.target.index}`
            });
        }
    };
}

class SourceObjects extends Component {
    render() {
        return (
            <div className='dnd-source-objects'
                children={(() => {
                    var result = [];
                    var iterable = this.objects();
                    for (var i = 0, object; i < iterable.length; i++) {
                        object = iterable[i];
                        result.push(SourceObject({
                            type: object.type,
                            index: i + 1,
                            children: i + 1,
                            onDragStart: this.props.onDragStart,
                            onDragStop: this.props.onDragStop,
                        }));
                    }
                    return result;
                })()}
            ></div>
        );
    }

    objects() {
        return _.flatten([
            (() => {
                var result = [];
                for (var i = 0; i <= 2; i++) {
                    result.push({ type: 'green' });
                }
                return result;
            })(),
            (() => {
                var result = [];
                for (var i = 0; i <= 2; i++) {
                    result.push({ type: 'blue' });
                }
                return result;
            })()
        ]);
    }
}

class SourceObject extends Component {
    render() {
        return (<Draggable
            className={`dnd-source-object ${this.props.type}`}
            children={this.props.children}
            onDragStart={this.props.onDragStart}
            onDragStop={this.props.onDragStop}
            dragData={this.dragData}
        />);
    }

    dragData = () => {
        return {
            type: this.props.type,
            index: this.props.index,
        };
    };
}

export class Draggable extends Component {
    constructor() {
        super();
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
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
        if (this.state.dragging) {
            return {
                position: 'absolute',
                left: this.state.left,
                top: this.state.top,
            };
        } else {
            return {};
        }
    };

    onMouseDown = event => {
        if (event.button === LEFT_BUTTON) {
            event.stopPropagation();
            this.addEvents();
            var pageOffset = ReactDOM.findDOMNode(this).getBoundingClientRect();
            //var pageOffset = this.getDOMNode().getBoundingClientRect();
            return this.setState({
                mouseDown: true,
                originX: event.pageX,
                originY: event.pageY,
                elementX: pageOffset.left,
                elementY: pageOffset.top
            });
        }
    };

    onMouseMove = event => {
        var deltaX = event.pageX - this.state.originX;
        var deltaY = event.pageY - this.state.originY;
        var distance = Math.abs(deltaX) + Math.abs(deltaY);

        if (!this.state.dragging && distance > DRAG_THRESHOLD) {
            var fn;
            var fn1;
            this.setState({dragging: true});
            if (typeof (fn = this.props.onDragStart) === "function") { fn(typeof (fn1 = this.props.dragData) === "function" ? fn1() : undefined); }
        }

        if (this.state.dragging) {
            return this.setState({
                left: this.state.elementX + deltaX + document.body.scrollLeft,
                top: this.state.elementY + deltaY + document.body.scrollTop
            });
        }
    };

    onMouseUp = () => {
        this.removeEvents();
        if (this.state.dragging) {
            this.props.onDragStop();
            return this.setState({dragging: false});
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

class DropTargets extends Component {
    render() {
        return (<div
            className='dnd-drop-targets'
            children={(() => {
                var result = [];
                var iterable = this.targets();
                for (var i = 0, target; i < iterable.length; i++) {
                    target = iterable[i];
                    result.push(<DropTarget
                        target={target}
                        index={i}
                        currentDragItem={this.props.currentDragItem}
                        onDrop={this.props.onDrop}
                    />);
                }
                return result;
            })()}
            ></div>
        );
    }

    targets() {
        return [
            { accepts: ['blue'] },
            { accepts: ['green'] },
            { accepts: ['blue', 'green'] },
            { accepts: [] },
        ];
    }
}

export class DropTarget extends Component {
    constructor() {
        super();
        this.state = this.getInitialState();
    }

    getInitialState() {
        return { hover: false };
    }

    render() {
        return div({
            className: this.classes(),
            children: 'accepts ' + this.acceptsDescription(),
            onMouseEnter: () => this.setState({hover: true}),
            onMouseLeave: () => this.setState({hover: false}),
            onMouseUp: this.onDrop
      });
    }

    classes = () => {
        return [
            'dnd-drop-target',
            `${this.props.target.accepts.join(' ')}`,
            this.active() ? 'active' : undefined,
            this.active() && this.props.currentDragItem.type === 'green' ? 'active-green' : undefined,
            this.active() && this.props.currentDragItem.type === 'blue' ? 'active-blue' : undefined,
            this.disabled() ? 'disabled' : undefined,
            this.state.hover ? 'hover' : undefined
        ].join(' ');
    };

    active = () => {
        var ref;
        var item = this.props.currentDragItem;
        return item && (ref = item.type, this.props.target.accepts.indexOf(ref) >= 0);
    };

    disabled = () => {
        var ref;
        var item = this.props.currentDragItem;
        return item && (ref = item.type, this.props.target.accepts.indexOf(ref) < 0);
    };

    acceptsDescription = () => {
        if (this.props.target.accepts.length > 0) {
            return this.props.target.accepts.join(' & ');
        } else {
            return 'nothing';
        }
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
