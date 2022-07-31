import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';
import { useEffect, useState } from 'react';

import sourceImgRaw from "../../Imgs/ElComponents/source.png"
import zarovkaImgRaw from "../../Imgs/ElComponents/zarovka.png"
import idkImgRaw from "../../Imgs/ElComponents/idk.png"
import bodImgRaw from "../../Imgs/ElComponents/bod.png"
import DraggingSurroundingBall from './DraggingSurroundingBall';

import rotate from "../../Imgs/rotate.png"

function ImageComponent({ x, y, img, imgLibrary, activeImgID, setActiveImgID, DraggingBalls, setDraggingBalls, setDrawingMode, id, defaultRotation, grid, triggerUnsaved, saveIntoState, setStartingPoint, drawMangattanLine }) {
    const [image01] = useImage(zarovkaImgRaw)
    const [hovno] = useImage(idkImgRaw)
    const [image] = useImage(sourceImgRaw)
    const [bod] = useImage(bodImgRaw)

    const [positionX, setPositionX] = useState(y);
    const [positionY, setPositionY] = useState(x);

    const [BallsAround, setBallsAround] = useState();

    const [isHovering, setIsHovering] = useState(false);

    const [rotateImage] = useImage(rotate)

    const [rotation, setRotation] = useState(defaultRotation);


    var sourceImg = null

    switch (img) {
        case "zdroj":
            sourceImg = image
            break;

        case "zarovka":
            sourceImg = image01
            break;

        case "bod":
            sourceImg = bod
            break;


        default:
            sourceImg = hovno
            break;
    }

    x = Math.round(x / 50) * 50
    y = Math.round(y / 50) * 50


    useEffect(() => {
        try {
            let coundOnY = Math.ceil(sourceImg.width / grid)
            let coundOnX = Math.ceil(sourceImg.height / grid)

            let BallsList = []
            // for (let i = 0; i < coundOnX + 1; i++) {
            //     BallsList.push({ imgX: positionX, imgY: positionY, alignX: grid * i, alignY: 0, direction: "top" })
            //     BallsList.push({ imgX: positionX, imgY: positionY, alignX: grid * i, alignY: sourceImg.width, direction: "bottom" })
            // }
            // for (let i = 0; i < coundOnY + 1; i++) {
            //     BallsList.push({ imgX: positionX, imgY: positionY, alignX: 0, alignY: grid * i, direction: "left" })
            //     BallsList.push({ imgX: positionX, imgY: positionY, alignX: sourceImg.height, alignY: grid * i, direction: "right" })
            // }

            BallsList.push({ imgX: positionX, imgY: positionY, alignX: 0, alignY: sourceImg.width / 2, direction: "left" })
            BallsList.push({ imgX: positionX, imgY: positionY, alignX: sourceImg.width, alignY: sourceImg.height / 2, direction: "right" })
            BallsList.push({ imgX: positionX, imgY: positionY, alignX: sourceImg.width / 2, alignY: sourceImg.height, direction: "bottom" })
            BallsList.push({ imgX: positionX, imgY: positionY, alignX: sourceImg.width / 2, alignY: 0, direction: "top" })

            let draggingBallsCopy = DraggingBalls

            for (let i = 0; i < draggingBallsCopy.length; i++) {
                if (draggingBallsCopy[i].id == id) {
                    console.log('Match found')

                    draggingBallsCopy.splice(i)
                }

            }

            setBallsAround(BallsList)


            draggingBallsCopy.push({ id: id, balls: BallsList })
            setDraggingBalls(draggingBallsCopy)
            // setDraggingBalls([...DraggingBalls, { id: id, balls: BallsList }])

        } catch (e) {

            console.log("Něco se nepovedlo")
            console.log(e)

        }

    }, [sourceImg, x, y, positionX, positionY]);

    if (rotation == 360) {
        setRotation(rotation - 360)
    }

    function adjuctCoordinates() {
        try {

            console.log(sourceImg.width, sourceImg.height)
            console.log(rotation)
            if (rotation == 90) {
                return [sourceImg.width, 0]
            }
            if (rotation == 180) {
                return [sourceImg.height, + sourceImg.width]
            }
            if (rotation == 270) {
                return [0, sourceImg.height]
            }
            return [0, 0]
        } catch (e) {
            console.log(e)
            console.warn('Něco se nepovedlo')
            return [0, 0]
        }

    }


    return (<>

        <Image image={sourceImg} x={positionX + adjuctCoordinates()[0]} y={positionY + adjuctCoordinates()[1]} id={id} draggable={true}

            rotation={rotation}
            onDragStart={() => triggerUnsaved(false)}
            onDragEnd={(e) => {
                saveIntoState("images", id, Math.round(e.target.attrs.y / 50) * 50, Math.round(e.target.attrs.x / 50) * 50, img, rotation);
                setPositionX(Math.round(e.target.attrs.x / 50) * 50);
                setPositionY(Math.round(e.target.attrs.y / 50) * 50);
            }
            }

            onClick={() => { setActiveImgID(id) }}
            onTap={() => { setActiveImgID(id) }}
            onDblClick={() => { setDrawingMode(false); setActiveImgID(99999) }}
            onDblTap={() => { setDrawingMode(false); setActiveImgID(99999) }}



        />


        {(BallsAround && activeImgID == id) &&
            BallsAround.map(obj => {
                return <Circle x={obj.imgX + obj.alignX} y={obj.imgY + obj.alignY} key={obj.id} radius={15} fill="blue"

                    onClick={() => {
                        setDrawingMode(true);
                        setStartingPoint({ imgID: id, alignX: obj.alignX, alignY: obj.alignY, direction: obj.direction })
                    }}

                    onTap={() => {
                        setDrawingMode(true);
                        setStartingPoint({ imgID: id, alignX: obj.alignX, alignY: obj.alignY, direction: obj.direction })

                    }}

                    draggable={true}

                    onDragStart={() => {
                        setDrawingMode(true);
                        setStartingPoint({ imgID: id, alignX: obj.alignX, alignY: obj.alignY, direction: obj.direction, x: obj.imgX, y: obj.imgY })
                    }}
                    onDragEnd={(e) => {
                        setDrawingMode(false);
                        drawMangattanLine(e.target.attrs.x, e.target.attrs.y)
                    }}

                />

            }


                // <DraggingSurroundingBall componentID={id} imgX={positionX} imgY={positionY} alignX={obj.alignX} alignY={obj.alignY} direction={obj.direction} key={Math.random()} drawMangattanLine={drawMangattanLine} />


            )

        }

        {(activeImgID == id) &&
            <Image image={rotateImage} x={positionX + sourceImg.width} y={positionY - 15}
                onClick={() => { setRotation(rotation + 90); saveIntoState("images", id, positionX, positionY, img, rotation); }}
                onTap={() => { setRotation(rotation + 90); saveIntoState("images", id, positionX, positionY, img, rotation); }}

            />

        }
    </>
    );
}

export default ImageComponent;

ImageComponent.defaultProps = {
    grid: 50,
};