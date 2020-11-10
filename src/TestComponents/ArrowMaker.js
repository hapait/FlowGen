import Arrow, { DIRECTION } from 'react-arrows';
import { Component } from 'react';
import Draggable from 'react-draggable';
export default class ArrowMaker extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "nothing" };
        this.handleDrag = this.handleDrag.bind(this);
    }
    handleDrag(event) {
        this.setState({ text: "drag started" + event.id });
        console.log('Click happened');
    }
    render() {
        return <div>
            <Arrow
                className='arrow'
                from={{
                    direction: DIRECTION.BOTTOM,
                    node: () => document.getElementById('holder'),
                    translation: [-0.5, -1],
                }}
                to={{
                    direction: DIRECTION.RIGHT,
                    node: () => document.getElementById('to'),
                    translation: [0.9, 1],
                }}
            />
            <div id="from" draggable={true} style={{ width: 200, height: 200, border: '2px solid #eee' }} onDrag={(event) => this.handleDrag(event)}>
                <div id="holder" style={{ width: 100, height: 100, border: '2px solid #eee' }}>
                    <h1>from</h1>
                </div>
            </div>
            <div id="to">
                <div style={{ width: 100, height: 100, border: '2px solid #eee' }}>
                    <h1>to</h1>
                </div>
            </div>
            <h1>{this.state.text}</h1>
        </div>
    }
}