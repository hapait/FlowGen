//import logo from './logo.svg';
import '../App.css';
//import Basic from './Components/Basic';
//import Basic2 from './Components/Basic2';
import Basic3 from './Basic3';
//import ReactFlow from 'react-flow-renderer';
//import CustomNodeFlow from './Components/CustomNode';
import SideBar from './Sidebar';
import React, { useState, Fragment } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import Sidebar from './Sidebar';
import { slide as Menu } from 'react-burger-menu';

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}
const initialElements = [
    { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 0, y: 0 } }
]
const Mix = () => {

    const [elements, setElements] = useState(initialElements);
    //const [elements, setElements] = useState([]);
    const [lastId, setLastId] = useState(1);
    const [name, setName] = useState("")
    const [text, setText] = useState("blank");
    const [removingId, setRemovingId] = useState(0);

    const addNode = () => {
        setElements(e => e.concat({
            //id: (e.length + 1).toString(),
            id: lastId + 1,
            data: { label: `${name}` },
            position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
        }));
    };
    const addNode2 = () => {
        var lId = parseInt(`${lastId}`);
        var node = getImageNode(lId + 1);
        setText(lId);
        setLastId(lId + 1);
        setElements(e => e.concat({
            //id: (e.length + 1).toString(),
            id: lId + 1,
            //data: { label: <div><h1>Hello</h1></div> },
            data: { label: node },
            //position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
            position: { x: e[0].position.x + 50, y: e[0].position.y + 50 }
        }));
    };
    const onRemove = (nid) => {
        //alert(nid.toString());
        //setText("removing" + nid.toString());
        var newarr = elements.filter(element => element.id !== nid);
        setElements(newarr);
    };
    const getImageNode = (nid) => {
        var x = nid.toString();
        return <div>
            <h3>Node {nid}</h3>
            <button onClick={e => onRemove(x)}>Click</button>
        </div>
    };

    const onConnect = (params) => {
        //setText(params.source.toString() + params.target.toString());
        var i = 'e' + params.source.toString() + '-' + params.target.toString();
        var s = params.source.toString();
        var t = params.target.toString();
        setElements(e => e.concat({
            id: i,
            source: s,
            target: t,
            animated: true
        }));
    }

    return (
        <div>
            {
                //<Sidebar addFunction={addNode} text="wow"/>
            }
            <Menu>
                <a className="menu-item">Create Node</a>
                <a className="menu-item" href="/">Create Node</a>
                <button type="button" onClick={addNode2}>Add Node</button>
            </Menu>
            <button
                type="button"
                onClick={addNode2}
            >Add Node</button>
            <Basic3 elements={elements} onLoad={onLoad} onConnect={onConnect} />
        </div>
    )
}

export default Mix;
