
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';


function LineComponent({ startX, startY, startAlignX, startAlignY, startDirection, endX, endY, endAlignX, endAlignY, endDirection, id, deleteLine }) {


    return (
        <Line
            points={[
                startY + startAlignX, startX + startAlignY,



                endY + endAlignX, endX + endAlignY
            ]}

            onDblClick={() => deleteLine(id)}
            onDblTap={() => deleteLine(id)}

            stroke="black"
            strokeWidth={9}
            id={'' + Math.random()}
        />
    )
}
export default LineComponent;
