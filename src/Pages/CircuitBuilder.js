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


function CircuitBuilder() {
    let { projectName } = useParams()

    const [Title, setTitle] = useState();
    const [CurrentProjectID, setCurrentProjectID] = useState();
    const [isSaved, setIsSaved] = useState(true);

    const [ComponentsFilter, setComponentsFilter] = useState('');

    const [stageImages, setStageImages] = useState();
    const [stageLines, setStageLines] = useState();
    const [stageTexts, setStageTexts] = useState();

    const [stageDraggingBalls, setStageDraggingBalls] = useState([]);

    const [stageScale, setStageScale] = useState(1);

    const layer = useRef(null)

    const components = [
        { name: "zarovka", title: "Žárovka", src: zarovkaImg },
        { name: "bod", title: "Bod", src: bodImg },
        { name: "zdroj", title: "Zdroj", src: sourceImg },
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


    function drawMangattanLine(startX, startY, endX, endY, direction) {
        console.log(startX, startY, endX, endY, direction)

        let lines = stageLines
        console.log(lines)
        lines.push({
            x: startX,
            y: startY,
            points: [0, 0, endX - startX, endY - startY],
            id: '' + Math.random()

        })
        console.log(lines)
        setStageLines(lines)



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


    console.debug(stageDraggingBalls)



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
                    <Line x={0} y={0} points={[0, 0, 100, 0, 100, 50, 50, 50]} stroke="black" strokeWidth={9} />
                </Layer>
                <Layer ref={layer}>

                    {stageImages &&
                        stageImages.map(obj => {
                            return <ImageComponent id={obj.id} x={obj.x} y={obj.y} DraggingBalls={stageDraggingBalls} setDraggingBalls={setStageDraggingBalls} img={obj.img} defaultRotation={obj.rotation} key={obj.id} saveIntoState={saveIntoState} triggerUnsaved={() => setIsSaved(false)} />
                        })}


                    {stageTexts &&
                        stageTexts.map(obj => {
                            return <TextComponent id={obj.id} x={obj.x} y={obj.y} text={obj.value} key={obj.id} triggerUnsaved={() => setIsSaved(false)} />
                        })}
                    {stageLines &&
                        stageLines.map(obj => {
                            // return <LineComponent id={obj.id} x={obj.startX} y={obj.startY} points={obj.points} key={obj.id} direction={obj.direction} triggerUnsaved={() => setIsSaved(false)} />
                            return <Line id={obj.id} x={obj.startX} y={obj.startY} stroke="green" strokeWidth={9} points={obj.points} key={obj.id} />
                        })}

                    {/* {stageDraggingBalls &&
                        stageDraggingBalls.map(arr => { return arr.balls.map(obj => <DraggingSurroundingBall imgX={obj.imgX} imgY={obj.imgY} alignX={obj.alignX} alignY={obj.alignY} direction={obj.direction} componentID={arr.id -}} />
                        )
                        )

                    } */}

                    {/* {stageDraggingBalls &&
                        stageDraggingBalls.map(arr =>
                            <>      {
                                arr.balls.map(arrPodruhe => {
                                    arrPodruhe.map(obj =>
                                        <DraggingSurroundingBall imgX={obj} imgY={obj.imgY} alignX={obj.alignX} alignY={obj.alignY} direction={obj.direction} componentID={arr.id} />
                                    )
                                }
                                )}
                            </ >
                        )

                    } */}





                    {/* <SourceImage /> */}
                    {/* 
                    <ImageComponent id={0} x={15} y={15} img="zdroj" triggerUnsaved={() => setIsSaved(false)} />
                    <ImageComponent id={1} x={15} y={15} img="zarovka" triggerUnsaved={() => setIsSaved(false)} />
                    <ImageComponent triggerUnsaved={() => setIsSaved(false)} id={2} x={15} y={15} /> */}

                </Layer>

            </Stage>
            <div className="moje-vyber-komponentu">
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


            </div>

            <div className="ovladani-stage">
                <button onClick={() => { if (stageScale < 1.6) { setStageScale(stageScale + 0.2) } }}  >+</button>
                <hr />
                <button onClick={() => { if (stageScale > 0.4) { setStageScale(stageScale - 0.2) } }} >-</button>
            </div>



        </div>
        {/* END Konva Canvas */}


    </div >);
}

export default CircuitBuilder;