
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';


function LineComponent({ startX, startY, startAlignX, startAlignY, startDirection, endX, endY, endAlignX, endAlignY, endDirection, id, deleteLine }) {

    const start = [startY + startAlignX, startX + startAlignY,]
    const end = [endY + endAlignX, endX + endAlignY]

    function updateFromDirection(direction) {
        if (direction == "left") {
            return [-100, 0]
        }
        if (direction == "right") {
            return [100, 0]
        }
        if (direction == "top") {
            return [0, -100]
        }
        if (direction == "bottom") {
            return [0, 100]
        }
    }


    // console.log([
    //     start[0], start[1],
    //     start[0] + parseInt(updateFromDirection(startDirection)[0]), start[1] + parseInt(updateFromDirection(startDirection)[1]),
    //     end[0] + parseInt(updateFromDirection(endDirection)[0]), end[1] + parseInt(updateFromDirection(endDirection)[1]),

    //     end[0], end[1]
    // ])

    console.log(endDirection, "ahadsjikhgadsjikdjkagakdsgjkgkajsdg")

    return (
        <Line
            points={[
                start[0], start[1],

                start[0] + parseInt(updateFromDirection(startDirection)[0]), start[1] + parseInt(updateFromDirection(startDirection)[1]),

                end[0] + parseInt(updateFromDirection(endDirection)[0]), end[1] + parseInt(updateFromDirection(endDirection)[1]),

                end[0], end[1]

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
