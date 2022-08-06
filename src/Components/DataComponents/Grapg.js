import { useState } from "react";

import { ResponsiveLine, ResponsiveLineCanvas, LineCanvas } from '@nivo/line'
import { useEffect } from "react";

import Plot from 'react-plotly.js';
import { YAxis } from "recharts";


function Graph({ values, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {

    const [tabID, setTabID] = useState(1);

    const [tileTitle, settileTitle] = useState();

    const [graphTitle, setGraphTitle] = useState();
    const [grapgYAxis, setGrapgYAxis] = useState();
    const [graphXAxis, setGraphXAxis] = useState();

    useEffect(() => {
        console.log(tileContent)
        if (tileContent) {
            if (tileContent.title) {
                settileTitle(tileContent.title)
            }
            if (tileContent.graphTitle) {
                setGraphTitle(tileContent.graphTitle)
            }
            if (tileContent.yAxisID) {
                setGrapgYAxis(tileContent.yAxisID)
            } if (tileContent.xAxis) {
                setGraphXAxis(tileContent.xAxis)
            }
            // setGraphProps(tileContent.graphProps)
        }

    }, []);


    useEffect(() => {
        // Něco jako save function
        setIsSaved(false)
        let tilesCopy = tiles
        for (let i = 0; i < tilesCopy.length; i++) {
            if (tilesCopy[i].id == tileID) {
                tilesCopy[i].content = {
                    title: tileTitle,
                    graphTitle: graphTitle,
                    yAxisID: grapgYAxis,
                    xAxis: graphXAxis
                }

                setTiles(tilesCopy)
                break
            }
        }

    }, [grapgYAxis, graphTitle, graphXAxis]);


    const [updateTile, setUpdateTile] = useState(Math.random());


    function addNewGraphValue() {
        if (graphXAxis) {
            setGraphXAxis([...graphXAxis, { value: 0, color: "#225588", id: Math.random() }])
            return
        } else {

            setGraphXAxis([{ value: 0, color: "#225588", id: Math.random() }])
        }
    }

    const [reloadPage, setReloadPage] = useState(Math.random());

    function changeXAxis(id, type, value) {
        let xAxisCopy = graphXAxis

        console.log(id, type, value)

        for (let i = 0; i < xAxisCopy.length; i++) {
            if (xAxisCopy[i].id == id) {
                xAxisCopy[i][type] = value
                console.log(xAxisCopy)

                setReloadPage(Math.random())

                setGraphXAxis(xAxisCopy)
                return
            }

        }


    }




    return (<div className="uk-padding-small ">
        <div className="uk-hidden">
            {updateTile}
        </div>
        <div className="uk-card uk-card-default  ">
            <div className="uk-card-header-footer uk-flex" style={{ justifyContent: "space-between", padding: "5px", paddingBottom: 0 }}>

                <div className="left">
                    <input className="uk-input uk-form-blank uk-form-width-medium" type="text" placeholder="Kachlička" value={tileTitle} onChange={(e) => settileTitle(e.target.value)} />
                </div>

                <div className="center">
                    <ul uk-tab="" style={{ margin: 0 }}>
                        <li className={(tabID == 0) ? "uk-active" : ""} key={0} onClick={() => setTabID(0)}> <a> Graf</a></li>
                        <li className={(tabID == 1) ? "uk-active" : ""} key={1} onClick={() => setTabID(1)}><a> Vlastnosti</a> </li>
                    </ul>
                </div>

                <div className="right center">
                    <span uk-icon="expand"></span>

                    <span uk-icon="more-vertical"></span>
                    <div uk-dropdown="mode: click">
                        <a><span uk-icon="trash"></span>Odstranit kachličku</a>
                    </div>
                </div>


            </div>

            <hr style={{ marginTop: 0 }} />

            <div className="">
                {tabID == 0 &&
                    <div >
                        <div className="center">
                            <div className="" style={{ width: "100%", height: "100%" }}>


                                <Plot
                                    data={[
                                        {
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'scatter', x: [1, 6, 4], y: [2, 5, 3] },

                                    ]}
                                    layout={{ width: "100%", height: "100%", title: 'A Fancy Plot' }}
                                // style={{ width: "100%", height: "100%" }}

                                />

                            </div>


                        </div>

                    </div>
                }
                {tabID == 1 &&
                    <div className="uk-card-body">

                        <div className="uk-form-horizontal uk-margin-large">

                            <div className="uk-margin">
                                <label className="uk-form-label" >Nadpis</label>
                                <div className="uk-form-controls">
                                    <input className="uk-input" type="text" placeholder="Bez nadpisu" value={graphTitle}
                                        onChange={(e) => setGraphTitle(e.target.value)} />
                                </div>
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Osa Y</label>
                                <div className="uk-form-controls">


                                    <select className="uk-select" value={grapgYAxis} onChange={(e) => setGrapgYAxis(e.target.value)} >
                                        {values &&
                                            values.map(obj =>
                                                <option key={obj.id} value={obj.id}>{obj.symbol}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label> Hodnoty: </label>
                                <div className="uk-hidden">
                                    {reloadPage}
                                </div>
                                {graphXAxis &&
                                    graphXAxis.map(obj =>
                                        <div className="uk-form-controls" key={obj.id}>
                                            <select className="uk-select uk-width-3-4" value={obj.value} onChange={(e) => changeXAxis(obj.id, "value", e.target.value)} >
                                                {values &&
                                                    values.map(obj00 =>
                                                        <option key={obj00.id} value={obj00.id}>{obj00.symbol}</option>
                                                    )
                                                }
                                            </select>
                                            <input type="color" className="uk-input uk-width-1-4" value={obj.color} onChange={(e) => changeXAxis(obj.id, "color", e.target.value)} />
                                        </div>

                                    )

                                }


                                {/* {graphProps.xAxis &&
                                    graphProps.xAxis.map(obj0 =>
                                        <div className="uk-form-controls">
                                            <select className="uk-select uk-width-3-4" >
                                                {values &&
                                                    values.map(obj =>
                                                        <option key={obj.id} value={obj.id}>{obj.symbol}</option>
                                                    )
                                                }
                                            </select>
                                            <input type="color" className="uk-input uk-width-1-4" />
                                        </div>
                                    )
                                } */}


                                <div className="uk-form-controls">
                                    <button className="uk-button  uk-button-default" style={{ width: "100%" }} onClick={() => addNewGraphValue()} >+</button>
                                </div>
                            </div>




                        </div>


                    </div>
                }
            </div>
        </div>


    </div>);
}

export default Graph;