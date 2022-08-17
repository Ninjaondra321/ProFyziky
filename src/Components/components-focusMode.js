import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';
import { useState } from 'react';
import { useRef } from 'react';

function FocusMode() {

    const [focusLineLeft, setFocusLineLeft] = useState(50);
    const [focusLineRight, setFocusLineRight] = useState(50);
    const [focusLineBottob, setFocusLineBottob] = useState(50);
    const [focusLineTop, setFocusLineTop] = useState(50);

    const rectLeft = useRef(null)

    if (rectLeft) {
        console.log('ahjoj')
        // console.log(rectLeft.attrs.x)
        // console.log(rectLeft.attrs.y)
    }

    return (<>

        <Rect x={20}
            y={50}
            ref={rectLeft}
            width={100}
            height={100}
            fill="red" color={"black"}

            dragBoundFunc={(pos) => { console.log(pos); return { x: pos.x, y: 0 } }}
            onDragStart={(e) => console.log(e)}

            draggable={true}


        />
        {/* <Circle x={50} y={50} radius={50} fill="pink" /> */}

    </>);
}

export default FocusMode;