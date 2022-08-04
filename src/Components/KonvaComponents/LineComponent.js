
import { constants } from 'buffer';
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';


function LineComponent({ setUpdateLines, startX, startY, startAlignX, startAlignY, startDirection, endX, endY, endAlignX, endAlignY, endDirection, id, deleteLine }) {

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
        return [0, 0]
    }

    function findMidPoints() {
        // if connected to a "bod" or "uzel"
        if (endDirection == undefined || endDirection == null) {
            if (["left", "right"].includes(startDirection)) {
                return [end[0], start[1]]
            } else {
                return [start[0], end[1]]

            }
        }

        // Check if in line
        if (
            (start[0] + parseInt(updateFromDirection(startDirection)[0]) == end[0] + parseInt(updateFromDirection(endDirection)[0]))
            ||
            (start[1] + parseInt(updateFromDirection(startDirection)[1]) == end[1] + parseInt(updateFromDirection(endDirection)[1]))
        ) {
            return []
        }

        // Check if the lines are able to do pythagorean triangle

        // Left and right pythaborean triangle
        if (
            ([0].includes(updateFromDirection(startDirection)[0]))
            &&
            ([0].includes(updateFromDirection(endDirection)[1]))
        ) {
            return [start[0], end[1]]
        }
        // Upper and down pythaborean triangle
        else if (
            ([-100, 100].includes(updateFromDirection(startDirection)[0]))
            &&
            ([-100, 100].includes(updateFromDirection(endDirection)[1]))
        ) {
            return [end[0], start[1]]
        }

        // Rovnoběžné 
        // Svislé rovnoběžky 
        if (
            (updateFromDirection(startDirection)[0] == 0)
            &&
            (updateFromDirection(endDirection)[0] == 0)
        ) {
            if (updateFromDirection(startDirection)[1] == updateFromDirection(endDirection)[1]) {
                // TODO: tadyy
                return []
                // return [start[0] + parseInt(updateFromDirection(startDirection)[0]), end[1] + parseInt(updateFromDirection(endDirection)[1])]
            }
            return [
                start[0], (start[1] + end[1]) / 2,
                end[0], (start[1] + end[1]) / 2,

            ]
        }
        // Vodorovné rovnoběžky 
        else if (
            (updateFromDirection(startDirection)[1] == 0)
            &&
            (updateFromDirection(endDirection)[1] == 0)
        ) {
            if (updateFromDirection(startDirection)[0] == updateFromDirection(endDirection)[0]) {
                // return [end[0], start[1] + parseInt(updateFromDirection(startDirection)[1]),]
            }

            return [
                (end[0] + start[0]) / 2, start[1],
                (end[0] + start[0]) / 2, end[1],
            ]
        }





        console.log('not found any inadsj')
        return [5000, 5000]

    }



    console.log(endDirection, "ahadsjikhgadsjikdjkagakdsgjkgkajsdg")

    return (
        <Line
            points={[
                start[0], start[1],

                start[0] + parseInt(updateFromDirection(startDirection)[0]), start[1] + parseInt(updateFromDirection(startDirection)[1]),

                ...findMidPoints(),

                end[0] + parseInt(updateFromDirection(endDirection)[0]), end[1] + parseInt(updateFromDirection(endDirection)[1]),

                end[0], end[1]

            ]}

            onDblClick={() => { deleteLine(id); setUpdateLines(Math.random()) }}
            onDblTap={() => { deleteLine(id); setUpdateLines(Math.random()) }}

            stroke="black"
            strokeWidth={9}
            id={'' + Math.random()}
        />
    )
}
export default LineComponent;
