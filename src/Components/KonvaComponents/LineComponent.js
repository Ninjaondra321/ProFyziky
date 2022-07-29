
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';


function LineComponent({ startX, startY, startAlignX, startAlignY, endX, endY, endAlignX, endAlignY, id, deleteLine }) {
    // console.log(startX, startY, startAlignX, startAlignY, endX, endY, endAlignX, endAlignY)



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
