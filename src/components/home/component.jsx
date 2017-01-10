import React from 'react';
import Pane from '../pane';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Home extends React.Component {
    static displayName = 'Home';
    static propTypes = {
    	toggleEdit: React.PropTypes.bool.isRequired,
        itemPlanksList: React.PropTypes.array.isRequired,
        hideEditPane: React.PropTypes.func.isRequired,
        addItemToList: React.PropTypes.func.isRequired,
        cloneItem: React.PropTypes.func.isRequired,
        editItem: React.PropTypes.func.isRequired,
        moveItem: React.PropTypes.func.isRequired,
        removeItem: React.PropTypes.func.isRequired,
        updateItem: React.PropTypes.func.isRequired,
        currentEditItem: React.PropTypes.object.isRequired
    };
    //editItem: React.PropTypes.func.isRequired,

    constructor(props){
        super(props);
    }

    render() {
    	const styleObj = {
    		display: '-webkit-flex',
		    width: '100%',
		    height: '640px',
		    background: 'lightgrey',
		    'border': 'solid 3px black'
		};

        return (
            <div style={styleObj}>
            	<Pane.component
                    color="black"
                    editItem={this.props.editItem}
                    hideEditPane={this.props.hideEditPane}
                    position='left' 
                    showEdit={this.props.toggleEdit}
                    updateItem={this.props.updateItem}
                    currentEditItem={this.props.currentEditItem}
                    />
            	<Pane.component 
                    position='right' 
                    color="#5DADEC" 
                    itemPlanksList={this.props.itemPlanksList} 
                    addItemToList={this.props.addItemToList}
                    cloneItem={this.props.cloneItem}
                    editItem={this.props.editItem}
                    moveItem={this.props.moveItem}
                    removeItem={this.props.removeItem}
                    />
            </div>
        );
    }
}

