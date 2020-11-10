import React, { useState, Fragment } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap } from 'react-flow-renderer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const elements = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output', // output node
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
];

export default class Basic extends React.Component {
    constructor(props) {
        super(props);
        console.log("hello ");
        this.state = {
            text: "blank",
            nodes: [
                {
                    id: '1',
                    type: 'input', // input node
                    data: { label: 'Input Node' },
                    position: { x: 250, y: 25 },
                },
                // default node
                {
                    id: '2',
                    // you can also pass a React component as a label
                    data: { label: <div>Default Node</div> },
                    position: { x: 100, y: 125 },
                },
                {
                    id: '3',
                    type: 'output', // output node
                    data: { label: 'Output Node' },
                    position: { x: 250, y: 250 },
                },
                // animated edge
                { id: 'e1-2', source: '1', target: '2', animated: true },
                { id: 'e2-3', source: '2', target: '3' },
            ],
            nodes2: [
                {
                    id: '1',
                    type: 'input', // input node
                    data: { label: 'Input Node' },
                    position: { x: 250, y: 25 },
                }
            ],
            temp: {},
        };
        this.addNode = this.addNode.bind(this);
    }

    addNode = () => {
        //console.log("adding");
        
        //this.setState({text: "clicked"});
        /*
        var id = '4';
        var type = 'default';
        var data = <div><h1>Hello</h1></div>;
        var position = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
        let temp = { id: id, type: type, data: data, position: position };
        */
        //this.setState({temp: temp});
        var joined = this.state.nodes2.concat({
            id: '2',
            type: 'input', // input node
            data: { label: 'Input Node' },
            position: { x: 250, y: 25 },
        });
        /*
        this.state.nodes2.concat({
            id: '2',
            type: 'input', // input node
            data: { label: 'Input Node' },
            position: { x: 250, y: 25 },
        });
        */
        this.setState({ nodes2: joined });
        //this.setState({nodes2: [...this.state.nodes2, temp]});
        //console.log(this.state.nodes2);
    }

    render() {
        return <Fragment>
            <ReactFlow
                //elements={elements}
                elements={this.state.nodes2}
                //onLoad={onLoad}
                style={{ width: '100%', height: '90vh' }}
                //onConnect={onConnect}
                connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
                connectionLineType="bezier"
                snapToGrid={true}
                snapGrid={[16, 16]}
            >
                <Background color="#888" gap={16} />
                <MiniMap />
                <Controls />
            </ReactFlow>

            <div>
                <input type="text"
                    //onChange={e => setName(e.target.value)}
                    name="title" />
                <button
                    style={{ right: 20, top: 80 }}
                    type="button"
                    onClick={this.addNode}
                    //onClick={() => this.setState({text: "clicked"})}
                >Add Node</button>
                <h1>{this.state.text}</h1>
                
            </div>
        </Fragment>
    }
}