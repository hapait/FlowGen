import React, { useState, Fragment } from 'react';

import ReactFlow, { addEdge, Background, Controls, MiniMap, getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import Sidebar from './Sidebar';


const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}

const Card = (props) => {

    const [elements, setElements] = useState(props.elements);
    //const [lastId, setLastId] = useState(1);
    //const [name, setName] = useState("")
    //const [text, setText] = useState();
    //const [removingId, setRemovingId] = useState(0);

    return (
        <Fragment>
            <ReactFlow
                elements={elements}
                onLoad={props.onLoad}
                style={{ width: '100%', height: '90vh' }}
                onConnect={props.onConnect}
                connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
                connectionLineType="bezier"
                snapToGrid={true}
                snapGrid={[16, 16]}
            >
                <Background color="#888" gap={16} />
                <MiniMap />
                <Controls />
            </ReactFlow>            
        </Fragment>
    )
}

export default Card;