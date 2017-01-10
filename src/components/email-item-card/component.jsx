import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar, Overlay, OverlayTrigger, Tooltip, Popover} from 'react-bootstrap';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from '../email-template/draggable-item-types';

const activitySource = {
    isDragging(props, monitor) {
        return props.item.itemId === monitor.getItem().id;
    },
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};
 
const activityTarget = {
    hover(props, monitor, component) {
        const type = monitor.getItemType();
 
        if (type !== ItemTypes.EMAILITEMCARD) {
            return;
        }
 
        const draggingObject = monitor.getItem();
        const dragIndex = draggingObject.index;
        const hoverIndex = props.index;
 
        if (dragIndex === hoverIndex) {
            return;
        }
 
        const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top; // eslint-disable-line id-length
 
        // dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
 
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
 
        props.moveItem(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
    drop(props, monitor) {
        const type = monitor.getItemType();
 
        if (type === ItemTypes.ITEMTYPE) {
            const draggingObjectData = monitor.getItem().itemData;
 
            props.addItemToList(draggingObjectData, (props.index + 1));
        }
    }
};
 
@DropTarget([ItemTypes.EMAILITEMCARD, ItemTypes.ITEMTYPE], activityTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.EMAILITEMCARD, activitySource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))

export default class EmailItemCard extends React.Component {
    static displayName = 'EmailItemCard';
    static propTypes = {
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        item: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        addItemToList: React.PropTypes.func.isRequired,
        cloneItem: React.PropTypes.func.isRequired,
        editItem: React.PropTypes.func.isRequired,
        moveItem: React.PropTypes.func.isRequired,
        removeItem: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.generateItemElement = this.generateItemElement.bind(this);
        this.edit = this.edit.bind(this);
        this.clone = this.clone.bind(this);
        this.remove = this.remove.bind(this);
    }

    edit() {
        this.props.editItem(this.props.item);
    }

    clone() {
        this.props.cloneItem(this.props.item);
    }

    remove() {
        this.props.removeItem(this.props.item);
    }

    generateItemElement() {
        const popoverTextToolBar = (
          <Popover id="popover-trigger-click-root-close" title="" style={{width: "100px", height: "100px"}}>
            <ButtonToolbar>
                <Button 
                    bsSize="xsmall" 
                    block
                    onClick={this.edit}
                    >
                    Edit
                </Button>
                <Button 
                    bsSize="xsmall" 
                    block
                    onClick={this.clone}
                    >
                    Copy
                </Button>
                <Button 
                    bsSize="xsmall" 
                    block
                    onClick={this.remove}
                    >
                    Remove
                </Button>
            </ButtonToolbar>
          </Popover>
        );

        const popoverOtherToolBar = (
          <Popover id="popover-trigger-click-root-close" title="" style={{width: "100px", height: "70px"}}>
            <ButtonToolbar>
                <Button 
                    bsSize="xsmall" 
                    block
                    onClick={this.clone}
                    >
                    Copy
                </Button>
                <Button 
                    bsSize="xsmall" 
                    block
                    onClick={this.remove}
                    >
                    Remove
                </Button>
            </ButtonToolbar>
          </Popover>
        );
        

        if (this.props.item.type === "text") {
            return (
                <div>
                    <ButtonToolbar>
                        <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverTextToolBar}>
                            <p style={
                                {
                                    'textAlign': 'center',
                                    'verticalAlign': 'middle',
                                    'wordWrap': 'break-word'
                                }
                            }
                            >
                                {this.props.item.text}
                            </p>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </div>
            );
        } else if (this.props.item.type === "image") {
            return (
                <ButtonToolbar>
                    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverOtherToolBar}>
                        <div style={
                            {
                                background: '#7BB661',
                                width: "500px",
                                height: "50px",
                                margin: '10px'
                            }
                        } 
                        >
                            <p >
                                Image: {this.props.item.itemId}
                            </p>

                        </div>
                    </OverlayTrigger>
                </ButtonToolbar>
            );
        } else if (this.props.item.type === "divider") {
            return (
                <ButtonToolbar>
                    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverOtherToolBar}>
                        <div style={
                                {
                                    background: '#36454F',
                                    width: "500px",
                                    height: "5px",
                                    margin: '10px'
                                }
                            } 
                        >
                        </div>
                    </OverlayTrigger>
                </ButtonToolbar>
            );
        } else {
            return (
                <div />
            );
        }
    }

    render() {
        const { connectDragSource, connectDropTarget, isDragging } = this.props;

        return connectDragSource(
            connectDropTarget(
                <div>
                   {
                        this.generateItemElement()
                   }
                </div>
            )
        );
    }
}

