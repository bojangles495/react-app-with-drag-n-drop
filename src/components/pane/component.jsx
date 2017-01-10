import React from 'react';
import Item from '../item';
import Edit from '../edit';
import EmailTemplate from '../email-template';

export default class Pane extends React.Component {
    static displayName = 'Pane';
    static propTypes = {
    	position: React.PropTypes.string.isRequired,
    	color: React.PropTypes.string.isRequired,
        currentEditItem: React.PropTypes.object,
        showEdit: React.PropTypes.bool,
        itemPlanksList: React.PropTypes.array,
        hideEditPane: React.PropTypes.func,
        addItemToList: React.PropTypes.func,
        cloneItem: React.PropTypes.func,
        editItem: React.PropTypes.func.isRequired,
        moveItem: React.PropTypes.func,
        removeItem: React.PropTypes.func,
        updateItem: React.PropTypes.func
    };

    //editItem: React.PropTypes.func.isRequired,
    //cloneItem: React.propTypes.func,
    //removeItem: React.PropTypes.func

    constructor(props) {
        super(props);

        this.displayLeftPane = this.displayLeftPane.bind(this);
    }

    displayLeftPane() {
        if(this.props.showEdit) {
            return (
                <div>
                    <Edit.container 
                    hideEditPane={this.props.hideEditPane} 
                    updateItem={this.props.updateItem}
                    currentEditItem={this.props.currentEditItem}
                    />
                </div>
            );
        } else {
            const itemData = [
                {
                    type: "text"
                },
                {
                    type: "image"
                },
                {
                    type: "divider"
                }
            ]
             return (
                <div>
                    <Item.container itemData={itemData[0]} />
                    <Item.container itemData={itemData[1]} />
                    <Item.container itemData={itemData[2]} />
                </div>
            );
        }
        
    }

    render() {
    	const styleObj = {
    		background: `${this.props.color}`,
    		 float: `${this.props.position}`,
    		 width: "50%",
    		 margin: '10px',
             overflow: 'scroll'
    	};

    	//width: '800px',
    	//float: `${this.props.position}`,

        return (
            <div style={styleObj}>
                {
                    this.props.position === 'left'
                    ? this.displayLeftPane()
                    : <EmailTemplate.container 
                        itemPlanksList={this.props.itemPlanksList} 
                        addItemToList={this.props.addItemToList}
                        cloneItem={this.props.cloneItem}
                        editItem={this.props.editItem}
                        moveItem={this.props.moveItem}
                        removeItem={this.props.removeItem}
                        />
                }
            </div>
        );
    }
}
