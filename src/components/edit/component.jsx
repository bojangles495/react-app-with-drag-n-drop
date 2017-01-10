import React from 'react';
import ReactDOM from 'react-dom';
import { toJS, Map } from 'immutable';
import {Editor, EditorState} from 'draft-js';
import {Button, ButtonToolbar} from 'react-bootstrap';

export default class Edit extends React.Component {
    static displayName = 'Edit';
    static propTypes = {
        currentEditItem: React.PropTypes.object.isRequired,
        hideEditPane: React.PropTypes.func.isRequired,
        updateItem: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.backToItemSelection = this.backToItemSelection.bind(this);

        //draft js code example, their control of state. Will intercept in the onchange and keep a copy of
        //updated item to allow render on right side real time
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => {
            const editorStateMap = editorState.toJS();
            const blockMapId = Object.keys(editorStateMap.currentContent.blockMap)[0];
            const text = editorStateMap.currentContent.blockMap[blockMapId].text;

            console.log(this.props.currentEditItem);
            console.log(text);
            this.props.updateItem(text);
            //intercept code
            this.setState({editorState});
        }
    }

    backToItemSelection(){
        this.props.hideEditPane();
    }

    render() {
        const style = {
            width: '590px',
		    border: '8px solid white',
            background: '#E3DAC9',
		    padding: '25px',
		    margin: '25px'
        }

        return (
            <div>
                <ButtonToolbar>
                    <Button
                        bsSize="large"
                        onClick={this.backToItemSelection}
                    >back
                    </Button>
                </ButtonToolbar>
                <div style={style}>
                   <Editor editorState={this.state.editorState} onChange={this.onChange} />
                </div>
            </div>
            
        );
    }
}

