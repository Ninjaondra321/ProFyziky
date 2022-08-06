import { useParams, useNavigate, } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';

import useImage from 'use-image';

import sourceImg from "../Imgs/ElComponents/source.png"
import idkImg from "../Imgs/ElComponents/idk.png"
import zarovkaImg from "../Imgs/ElComponents/zarovka.png"
import bodImg from "../Imgs/ElComponents/bod.png"

import ImageComponent from "../Components/KonvaComponents/ImageComponent";
import TextComponent from "../Components/KonvaComponents/TextComponent";
import LineComponent from "../Components/KonvaComponents/LineComponent";
import DraggingSurroundingBall from "../Components/KonvaComponents/DraggingSurroundingBall";

import ampermetr from "../Imgs/ElComponents/ampermetr.png"
import dioda from "../Imgs/ElComponents/dioda.png"
import motor from "../Imgs/ElComponents/motor.png"
import rezistor from "../Imgs/ElComponents/rezistor.png"
import stridavy from "../Imgs/ElComponents/stridavy.png"
import voltmetr from "../Imgs/ElComponents/voltmetr.png"
import zdroj from "../Imgs/ElComponents/zdroj.png"
import uzel from "../Imgs/ElComponents/uzel.png"
import zdrojj from "../Imgs/ElComponents/zdrojj.png"
import zvonek from "../Imgs/ElComponents/zvonek.png"


function CircuitBuilder() {
    let { projectName } = useParams()

    const [Title, setTitle] = useState();
    const [CurrentProjectID, setCurrentProjectID] = useState();
    const [isSaved, setIsSaved] = useState(true);

    const [ComponentsFilter, setComponentsFilter] = useState('');

    const [stageImages, setStageImages] = useState();
    const [stageLines, setStageLines] = useState();
    const [stageTexts, setStageTexts] = useState();

    const [drawingMode, setDrawingMode] = useState(false);

    const [stageDraggingBalls, setStageDraggingBalls] = useState([]);

    const [stageScale, setStageScale] = useState(1);

    const layer = useRef(null)

    const [activeImgID, setActiveImgID] = useState();

    const [sidebarIsShown, setSidebarIsShown] = useState(true);

    const [StartingPoint, setStartingPoint] = useState();


    const [updateLines, setUpdateLines] = useState();


    const components = [
        { name: "zarovka", title: "Žárovka", src: zarovkaImg },
        { name: "bod", title: "Bod", src: bodImg },
        { name: "ampermetr", title: "Zdroj", src: ampermetr },
        { name: "dioda", title: "Zdroj", src: dioda },
        { name: "motor", title: "Zdroj", src: motor },
        { name: "rezistor", title: "Zdroj", src: rezistor },
        { name: "stridavy", title: "Zdroj", src: stridavy },
        { name: "voltmetr", title: "Zdroj", src: voltmetr },
        { name: "zdroj", title: "Zdroj", src: zdroj },
        { name: "uzel", title: "Zdroj", src: uzel },
        { name: "zdrojj", title: "Zdroj", src: zdrojj },
        { name: "zvonek", title: "Zdroj", src: zvonek },
    ]




    function zoomCanvasPlus() {
        if (stageScale < 1.6) { setStageScale(stageScale + 0.2) }
    }
    function zoomCanvasMinus() {
        if (stageScale > 0.4) { setStageScale(stageScale - 0.2) }
    }

    function saveTitle(newTitle) {
        setTitle(newTitle)
        let projects = JSON.parse(localStorage.getItem('ProFyziky-Circuits'))
        for (let project of projects) {
            if (project.id == CurrentProjectID) {
                project.title = newTitle
            }
        }
        localStorage.setItem('ProFyziky-Circuits', JSON.stringify(projects))
    }

    function saveStage() {
        let projects = JSON.parse(localStorage.getItem('ProFyziky-Circuits'))
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            if (project.id == CurrentProjectID) {
                projects[i].stage = { images: stageImages, texts: stageTexts, lines: stageLines }
            }
        }
        localStorage.setItem('ProFyziky-Circuits', JSON.stringify(projects))
        setIsSaved(true)
    }

    function saveIntoState(type, id, x, y, value, rotation) {
        if (type == "images") {
            let stageImagesCopy = stageImages
            for (let obj of stageImagesCopy) {
                if (obj.id == id) {
                    obj.x = Math.round(x / 50) * 50
                    obj.y = Math.round(y / 50) * 50
                    obj.rotation = rotation
                    obj.img = value
                    setIsSaved(false)
                    setStageImages(stageImagesCopy)
                }
            }
        }
        else if (type == "texts") {
            for (let obj of stageTexts) {
                if (obj.id == id) {
                    obj.x = x
                    obj.y = y
                    obj.rotation = rotation
                    obj.value = value

                }
            }
        }

    }

    function handleWheelOnKonva(event) {
        if (event.evt.deltaY > 0) {
            zoomCanvasMinus()
        } else if (event.evt.deltaY < 0) {
            zoomCanvasPlus()
        }
    }

    useEffect(() => {
        let projects = null;
        try {
            let p = localStorage.getItem('ProFyziky-Circuits')
            if (p) { projects = JSON.parse(p) }

            if (projects.length > 0) {
                for (let project of projects) {
                    if (project.id == projectName) {
                        setTitle(project.title)
                        setCurrentProjectID(project.id)

                        setStageImages(project.stage.images)
                        setStageLines(project.stage.lines)
                        setStageTexts(project.stage.texts)
                        return
                    }
                }
            } else {
                localStorage.setItem('ProFyziky-Circuits', JSON.stringify([]))
            }
            let date = new Date();
            projects.push({ id: ("" + projectName), title: "Bez názvu", subtitle: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear(), stage: { images: [], lines: [], texts: [] } })
            localStorage.setItem('ProFyziky-Circuits', JSON.stringify(projects))


        } catch {

        }
    }, []);

    function deleteImage(imgID) {
        console.log(imgID)

        console.log(stageImages)
        console.log(stageLines)

        // Remove the picuture
        let imgs = stageImages

        console.debug(stageImages)
        console.debug(imgs)




        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].id == imgID) {
                imgs.splice(i)
                break
            }
        }

        let outputImages = []
        for (let img of stageImages) {
            if (img.id !== imgID) {
                outputImages.push(img)
            }
        }

        // Delete all lines, that connect to the picuture
        let lines = stageLines
        let outputLines = []
        for (let line of lines) {
            if (line.startImgID != imgID && line.endImgID != imgID) {
                outputLines.push(line)
            }
        }

        console.log(imgs)
        console.log(outputLines)

        console.debug(outputImages)
        console.debug(imgs)
        console.debug(imgs == outputImages)

        setStageImages(imgs)
        setStageLines(outputLines)



    }

    function getImgCoordinates(imgID) {
        for (let component of stageImages) {
            if (component.id == imgID) {
                return [component.x, component.y]
            }
        }

        return [0, 0]


    }


    function drawMangattanLine(x, y) {
        x = Math.round(x / 50) * 50
        y = Math.round(y / 50) * 50

        setActiveImgID(9999)

        let endImgID = null
        let endAlignX = null
        let endAlignY = null
        let endDirection = null

        for (let component of stageDraggingBalls) {
            for (let ball of component.balls) {
                if ((ball.imgX + ball.alignX == x) && (ball.imgY + ball.alignY == y)) {
                    endImgID = component.id
                    endAlignX = x - ball.imgX
                    endAlignY = y - ball.imgY
                    endDirection = ball.direction
                    break
                }
            }
        }

        console.warn(endImgID)

        if (endImgID == null) {
            console.warn(endImgID)

            // let endImgID = genNewStageComponentId("images")
            endImgID = "" + genNewStageComponentId("images")
            setStageImages([...stageImages, { id: endImgID, x: y, y: x, img: "bod", rotation: 0 }])
            console.log(stageImages)
            endAlignX = 0
            endAlignY = 0
            endDirection = undefined
        } else {
            console.warn(endImgID)
        }



        setStageLines([...stageLines, {
            startImgID: StartingPoint.imgID,
            startAlignX: StartingPoint.alignX,
            startAlignY: StartingPoint.alignY,
            startDirection: StartingPoint.direction,

            endImgID: endImgID,
            endAlignX: endAlignX,
            endAlignY: endAlignY,
            endDirection: endDirection,


            // startImgID: StartingPoint.imgID,
            // x: startingX - StartingPoint.alignX,
            // y: startingY - StartingPoint.alignY,
            // points: [startingY + StartingPoint.alignX, startingX + StartingPoint.alignY, Math.round(x / 50) * 50, Math.round(y / 50) * 50],
            id: '' + Math.random()
        }])



    }



    function genNewStageComponentId(type) {
        let a = null //Array

        switch (type) {
            case "images":
                a = stageImages
                break;
            case "texts":
                a = stageTexts
                break;
            case "lines":
                a = stageLines
                break;

            default:
                break;
        }

        // Generate list of all IDs
        let IDs = []
        for (let obj of a) {
            IDs.push(obj.id)
        }


        // Try using lenght as an ID
        if (!IDs.includes(IDs.length)) {
            return IDs.length
        }

        // Loop until you found not used ID
        let testingID = 0
        while (true) {
            if (!IDs.includes(testingID)) {
                return testingID
            }
        }

    }


    function deleteLine(id) {
        let linees = stageLines
        console.log(linees)
        console.log(linees.length)
        for (let i = 0; i < linees.length; i++) {
            console.log(linees)
            if (linees[i].id == id) {
                linees.splice(i, 1)
                console.log(linees)
                // setStageLines(linees)
                return
            }

        }
        // console.log('Ahojjj')
    }


    // function setLinesAndUpdate(value) {
    //     setStageLines(value)
    // }


    console.debug(stageImages)


    return (<div>

        {/* SubNavBar */}

        <div className="subnavbar circuits">

            <div className="left">


                <div className="uk-inline">
                    <button className="uk-button uk-button-text" >File</button>
                    <div uk-dropdown="animation: slide-top; animate-out: true; duration: 700" style={{ background: "var(--background-color)" }}>
                        <ul className="uk-nav uk-dropdown-nav">
                            <li className="uk-nav-header">Stáhnout</li>
                            <li><a href="#">Stáhnout jako .png</a></li>
                            <li><a href="#">Stáhnout jako .jpeg</a></li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-nav-header">Integrace</li>
                            <li><a href="#">Použít v protokolu</a></li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-nav-header">Hovno</li>
                            <li><a href="#">Navždy smazat soubor</a></li>
                        </ul>
                    </div>

                    <div className="uk-inline">
                        <button className="uk-button uk-button-text" >View</button>
                        <div uk-dropdown="animation: slide-top; animate-out: true; duration: 700" style={{ background: "var(--background-color)" }}>
                            <ul className="uk-nav uk-dropdown-nav">
                                <li className="uk-nav-header">Pozadí</li>
                                <li><a href="#">Ani na to neklikej, stejnak to nefunguje...</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="uk-inline">
                        <button className="uk-button uk-button-text" >Help</button>
                        <div uk-dropdown="animation: slide-top; animate-out: true; duration: 700" style={{ background: "var(--background-color)" }}>
                            <ul className="uk-nav uk-dropdown-nav">
                                <li className="uk-nav-header">Pozadí</li>
                                <li><a href="#">To si jako fakt myslíš, že když nefunguje žádné z předchozích menu, tak tohle bude? -_-</a></li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>

            <div className="center">
                <input type="text" className="uk-input" defaultValue={Title} onBlur={(e) => { saveTitle(e.target.value) }} placeholder="Projekt bez názvu" />

            </div>
            <div className="right">
                {isSaved &&
                    <button className="uk-button uk-button-default">Uloženo</button>
                }
                {!isSaved &&
                    <button onClick={() => saveStage()} className="uk-button uk-button-primary">Uložit</button>
                }

            </div>
        </div>

        {/* END SubNavBar */}


        {/* Konva Canvas */}

        <div>
            <Stage width={window.innerWidth} height={window.innerHeight - 80 - 50} onWheel={(e) => handleWheelOnKonva(e)} draggable={true} scaleX={stageScale} scaleY={stageScale} style={{ background: "#fffbbf" }}>
                <Layer>
                    <Circle x={0} y={0} radius={1} fill="black" />
                    <Line x={0} y={0} points={[0, 0, 100, 0, 100, 50, 50, 50]} stroke={drawingMode ? "green" : "black"} strokeWidth={9} />
                </Layer>
                <Layer ref={layer}>

                    {stageImages &&
                        stageImages.map(obj =>
                            <ImageComponent deleteImage={deleteImage} setUpdateLines={setUpdateLines} id={obj.id} x={obj.x} y={obj.y} setStartingPoint={setStartingPoint} activeImgID={activeImgID} setActiveImgID={setActiveImgID} setDrawingMode={setDrawingMode} DraggingBalls={stageDraggingBalls} setDraggingBalls={setStageDraggingBalls} img={obj.img} defaultRotation={obj.rotation} key={obj.id} saveIntoState={saveIntoState} drawMangattanLine={drawMangattanLine} triggerUnsaved={() => setIsSaved(false)} />
                        )}


                    {stageTexts &&
                        stageTexts.map(obj => {
                            return <TextComponent id={obj.id} x={obj.x} y={obj.y} text={obj.value} key={obj.id} triggerUnsaved={() => setIsSaved(false)} />
                        })}

                    {(stageLines && stageImages) &&
                        stageLines.map(obj =>


                            <LineComponent
                                setUpdateLines={setUpdateLines}
                                startX={getImgCoordinates(obj.startImgID)[0]}
                                startY={getImgCoordinates(obj.startImgID)[1]}
                                startAlignX={obj.startAlignX}
                                startAlignY={obj.startAlignY}
                                startDirection={obj.startDirection}
                                endX={getImgCoordinates(obj.endImgID)[0]}
                                endY={getImgCoordinates(obj.endImgID)[1]}
                                endAlignX={obj.endAlignX}
                                endAlignY={obj.endAlignY}
                                endDirection={obj.endDirection}
                                id={obj.id}
                                deleteLine={deleteLine}
                            />


                        )}

                    {(stageDraggingBalls && drawingMode) &&
                        stageDraggingBalls.map(obj1 =>
                            obj1.balls.map(obj =>
                                <DraggingSurroundingBall imgX={obj.imgX} imgY={obj.imgY} alignX={obj.alignX} alignY={obj.alignY} direction={obj.direction} componentID={obj1.id} />
                            )
                        )

                    }





                </Layer>


            </Stage>
            <div className={sidebarIsShown ? "moje-vyber-komponentu" : "moje-vyber-komponentu hidden"} >
                <h3>Komponenty</h3>
                {/* <span uk-search-icon=""></span>
                <input className=" uk-input  uk-input-search" style={{ width: "80%" }} type="search" value={ComponentsFilter} onChange={(e) => setComponentsFilter(e.target.value)} placeholder="Search" /> */}


                <div className="uk-inline" style={{ width: "100%" }}>
                    <span className="uk-form-icon" uk-icon="icon: search"></span>
                    <input className=" uk-input  uk-input-search" type="search" value={ComponentsFilter} onChange={(e) => setComponentsFilter(e.target.value)} placeholder="Search" />
                </div>


                <div className="uk-padding-small"></div>

                <div className="komponenty uk-child-width-1-2 uk-grid uk-grid-match" style={{ marginLeft: "10px" }} uk-grid="">

                    {components &&
                        components.map(obj => {
                            if (obj.name.includes(ComponentsFilter) || obj.title.includes(ComponentsFilter)) {
                                return <div className="uk-card uk-card-body uk-card-default uk-card-hover" key={obj.name} onClick={() => setStageImages(stageImages => [...stageImages, { id: "" + genNewStageComponentId("images"), x: 120, y: 120, img: obj.name, rotation: 0 }])} >
                                    <img src={obj.src} alt="Nějaký komponent - snad nedůležitý" />
                                    <h4>{obj.title}</h4>
                                </div>
                            }
                        }
                        )

                    }


                </div>

                <div className="sidebarShowingThing center" onClick={() => setSidebarIsShown(!sidebarIsShown)} style={{ color: "white" }}>
                    {sidebarIsShown && <span uk-icon="icon: chevron-left"></span>}
                    {!sidebarIsShown && <span uk-icon="icon: chevron-right"></span>}
                </div>

            </div>

            <div className="ovladani-stage" >
                <button onClick={() => { if (stageScale < 1.6) { setStageScale(stageScale + 0.2) } }}  >+</button>
                <hr />
                <button onClick={() => { if (stageScale > 0.4) { setStageScale(stageScale - 0.2) } }} >-</button>
            </div>





        </div>
        {/* END Konva Canvas */}


    </div >);
}

export default CircuitBuilder;