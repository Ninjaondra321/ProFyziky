import { useState } from "react";

import { ResponsiveLine, ResponsiveLineCanvas, LineCanvas } from '@nivo/line'


import Plot from 'react-plotly.js';


function Graph() {

    const [title, setTitle] = useState();
    const [tabID, setTabID] = useState(1);



    return (<div className="uk-padding-small ">
        <div className="uk-card uk-card-default  ">
            <div className="uk-card-header-footer uk-flex" style={{ justifyContent: "space-between", padding: "5px", paddingBottom: 0 }}>

                <div className="left">
                    <input className="uk-input uk-form-blank uk-form-width-medium" type="text" placeholder="Kachlička" value={title} onChange={(e) => setTitle(e.target.value)} />
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

                        <div>

                        </div>


                    </div>
                }
            </div>
        </div>


    </div>);
}

export default Graph;