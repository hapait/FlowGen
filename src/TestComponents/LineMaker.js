import LineTo from 'react-lineto';
import Draggable from 'react-draggable';

function LineMaker() {
    return (
        <div>
            <Draggable className="A" style={{ width: 200, height: 200, border: '2px solid #eee' }}>Element A</Draggable>
            <div className="B" style={{ width: 200, height: 200, border: '2px solid #eee' }}>Element B</div>
            <LineTo from="A" to="B" />
        </div>
    );
}
export default LineMaker;