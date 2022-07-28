import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';
import { useState } from 'react';


function DraggingSurroundingBall({ imgX, imgY, alignX, alignY, direction, drawMangattanLine, componentID }) {
    const [positionX, setPositionX] = useState(imgX + alignX);
    const [positionY, setPositionY] = useState(imgY + alignY);



    return (<>
        {/* One ondragable circle (used as -shadow- component to show empty space) */}
        <Circle x={imgX + alignX} y={imgY + alignY} fill="#93e6f5" draggable={false} radius={8} />

        {/* <Circle x={positionX} y={positionY} fill="blue" draggable={true} radius={8} onDragEnd={(e) => { */}
        <Circle x={positionX} y={positionY} fill="blue" draggable={true} radius={10} onDragEnd={(e) => {
            setPositionX(Math.round(e.target.attrs.x / 50) * 50);
            setPositionY(Math.round(e.target.attrs.y / 50) * 50);
            // drawMangattanLine(
            //     imgX,
            //     imgY,
            //     alignX,
            //     alignY,
            //     Math.round(e.target.attrs.x / 50) * 50,
            //     Math.round(e.target.attrs.y / 50) * 50,
            //     direction
            // )
        }}
        />

    </>
    );
}

export default DraggingSurroundingBall;