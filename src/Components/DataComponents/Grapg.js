import { useState } from "react";

import { ResponsiveLine, ResponsiveLineCanvas, LineCanvas } from '@nivo/line'
import { useEffect } from "react";

import Plot from 'react-plotly.js';
import Plotly from 'react-plotly.js';
import { YAxis } from "recharts";
import { useRef } from "react";






function Graph({ values, deleteTile, createData, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {

    const [tabID, setTabID] = useState(1);

    const [tileTitle, settileTitle] = useState();

    const [graphTitle, setGraphTitle] = useState();
    const [grapgYAxis, setGrapgYAxis] = useState();
    const [graphXAxis, setGraphXAxis] = useState();

    const [graphMeritko, setGraphMeritko] = useState();

    const [reloadPage, setReloadPage] = useState(Math.random());

    const [htmlData, sethtmlData] = useState('<p>Hello World</p>');


    const plot = useRef(null)




    useEffect(() => {
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
                setTabID(0)
            }
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
                // plot.current.el.children[0].children[0].children[0].outerHTML
                tilesCopy[i].data = htmlData


                setTiles(tilesCopy)
                break
            }
        }

    }, [grapgYAxis, graphTitle, htmlData, graphXAxis]);

    function craftData() {
        let ouptut = []

        try {
            let xAxisCopy = graphXAxis
            for (let x of xAxisCopy) {
                for (let val of values) {
                    if (val.id == x.value) {
                        ouptut.push(
                            {
                                marker: { color: x.color },
                                type: "scatter",
                                x: graphMeritko,
                                y: val.values,


                            }
                        )
                    }
                }
            }
            return ouptut
        } catch {
            // Uživatel ještě nevybral hodnoty grafu
            console.log("Helou error")
            return false
        }
    }


    useEffect(() => {
        for (let x of values) {
            if (x.id == grapgYAxis) {
                setGraphMeritko(x.values)
            }
        }
    }, [grapgYAxis]);


    function addNewGraphValue() {
        if (graphXAxis) {
            setGraphXAxis([...graphXAxis, { value: 0, color: "#225588", id: Math.random() }])
            return
        } else {

            setGraphXAxis([{ value: 0, color: "#225588", id: Math.random() }])
        }
    }


    function changeXAxis(id, type, value) {
        let xAxisCopy = graphXAxis


        for (let i = 0; i < xAxisCopy.length; i++) {
            if (xAxisCopy[i].id == id) {
                xAxisCopy[i][type] = value

                setReloadPage(Math.random())

                setGraphXAxis(xAxisCopy)
                return
            }

        }


    }

    useEffect(() => {
        setTimeout(() => {
            sethtmlData(plot.current.el.children[0].children[0].children[0].outerHTML)
        }, 50);
    }, [createData]);






    return (<div className="uk-padding-small ">
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
                        <a onClick={() => deleteTile(tileID)}><span uk-icon="trash"></span>Odstranit kachličku</a>
                        {/* <a onClick={() => convertPlotToPng()}><span uk-icon="trash"></span>Zkopírovat obrázek</a> */}
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
                                    id="graph"
                                    // data={[
                                    //     {
                                    //         x: [1, 2, 3],
                                    //         y: [2, 6, 3],
                                    //         type: 'scatter',
                                    //         mode: 'lines+markers',
                                    //         marker: { color: 'red' },
                                    //     },
                                    //     { type: 'scatter', x: [1, 6, 4], y: [-2, 5, 3] },

                                    // ]}

                                    ref={plot}
                                    data={craftData()}


                                    layout={{ width: "100%", height: "100%", title: graphTitle }}
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