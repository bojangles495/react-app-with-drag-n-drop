import React from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../email-template/draggable-item-types';
import EmailItemCard from '../email-item-card';

const activityTarget = {
    // this exists so if there is no current activities you can drop a new activity into
    // into the right pane box
    drop(props, monitor) {
        if (!monitor.didDrop()) {
            const type = monitor.getItemType();
 
            if (type === ItemTypes.ITEMTYPE) {
                const draggingObjectData = monitor.getItem().itemData;
 
                props.addItemToList(draggingObjectData, props.itemPlanksList.length);
            }
        }
    }
};
 
@DropTarget([ItemTypes.EMAILITEMCARD, ItemTypes.ITEMTYPE], activityTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
export default class EmailTemplate extends React.Component {
    static displayName = 'EmailTemplate';
    static propTypes = {
    	itemPlanksList: React.PropTypes.array.isRequired,
        addItemToList: React.PropTypes.func.isRequired,
        cloneItem: React.PropTypes.func.isRequired,
        editItem: React.PropTypes.func.isRequired,
        moveItem: React.PropTypes.func.isRequired,
        removeItem: React.PropTypes.func.isRequired,
    	connectDropTarget: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.generatePlanksList = this.generatePlanksList.bind(this);
    }

    generatePlanksList() {
        if(this.props.itemPlanksList.length) {
            return this.props.itemPlanksList.map((item, index) => {
                return (
                    <div key={index}>
                        <EmailItemCard.container 
                            item={item} 
                            id={item.itemId} 
                            index={index}
                            addItemToList={this.props.addItemToList}
                            editItem={this.props.editItem}
                            cloneItem={this.props.cloneItem}
                            moveItem={this.props.moveItem}
                            removeItem={this.props.removeItem}
                            />
                    </div>  
                );
            });
        } else {
            const styleObj = {
                'display': 'table-cell',
                'paddingTop': '20px',
                'textAlign': 'center',
                'verticalAlign': 'middle',
                'width': '590px',
                'height': '100%'
            };

            return (
                <div style={styleObj}>
                    <p>Start by dragging an item into this area.</p>
                </div>
            );
        }
    }

    render() {
    	const { itemPlanksList, connectDropTarget } = this.props;
        const styleObj = {
            width: '590px',
            border: '10px solid black',
            background: '#E3DAC9',
            padding: '25px',
            margin: '25px'
        }

        return connectDropTarget(
        	<div style={styleObj}>
                <div>
                {
                    this.generatePlanksList()
                }
                </div>
            </div>
        );
    }
}

