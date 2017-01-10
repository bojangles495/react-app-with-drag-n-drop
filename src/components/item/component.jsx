import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../email-template/draggable-item-types';
 
const resultSource = {
    beginDrag(props) {
        return props;
    }
};
 
@DragSource(ItemTypes.ITEMTYPE, resultSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Item extends React.Component {
    static displayName = 'Item';
    static propTypes = {
        itemData: React.PropTypes.object.isRequired,
        connectDragSource: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            width: '300px',
		    border: '10px solid white',
            background: '#54626F',
		    padding: '25px',
		    margin: '25px'
        };

        const { itemData, connectDragSource, isDragging } = this.props;

        return (
            connectDragSource(
                <div style={style}>
                   <h3 style={{textColor: '#FF7E00'}}>{itemData.type}</h3>
                </div>
            )
        );
    }
}

