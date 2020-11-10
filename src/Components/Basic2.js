import React, { useState, Fragment } from 'react';
import { storage } from '../firebase';
import ReactFlow, { addEdge, Background, Controls, MiniMap, getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import Sidebar from './Sidebar';
import { slide as Menu } from 'react-burger-menu';

const initialElements = [
    { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 0, y: 0 } }
]
const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}

const Card = () => {

    const [elements, setElements] = useState(initialElements);
    //const [elements, setElements] = useState([]);
    const [lastId, setLastId] = useState(1);
    const [name, setName] = useState("")
    const [text, setText] = useState("blank");
    const [removingId, setRemovingId] = useState(0);
    const [nodeName, setNodeName] = useState("new");
    const [images, setImage] = useState([]);

    const allInputs = { imgUrl: '' }
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const [progress, setProgress] = useState(0);

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }
    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
                const prog = Math.round(snapShot.bytesTransferred / snapShot.totalBytes * 100);
                setProgress(prog);
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                    })
            })
    }

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
        return <div
            style={{
                flexDirection: 'column',
                justifyContent: "center",
            }}>
            <a>{nodeName}</a><hr />
            <img src={imageAsUrl.imgUrl} style={{ width: 80, height: 80 }} alt="image tag" />
            {
                //images[0].name
                //images.map((item,i) => <li key={i}>Test</li>)
            }
            <hr />
            <button style={{ right: 10, top: 10 }} onClick={e => onRemove(x)}>Delete</button>
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
    const selectImage = (params) => {
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
    const handleClick = (e) => {
        this.refs.fileUploader.click();
    }
    return (
        <Fragment>
            <Menu>
                <a className="menu-item">Create Node</a>
                <input type="text"
                    onChange={e => setNodeName(e.target.value)}
                    name="Node Name" style={{ color: '#000' }} />
                {progress == 0 || progress == 100 ?
                    <div></div>
                    :
                    <progress value={progress} max="100"></progress>}
                <form onSubmit={handleFireBaseUpload}>
                    <input
                        type="file"
                        onChange={handleImageAsFile}
                    />
                    <button>upload to firebase</button>
                </form>

                <button style={{ color: '#000' }} type="button" onClick={addNode2}>Add Node</button>
            </Menu>
            <ReactFlow
                elements={elements}
                onLoad={onLoad}
                style={{ width: '100%', height: '90vh' }}
                onConnect={onConnect}
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