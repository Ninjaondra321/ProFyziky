import { useState } from "react";

import { ResponsiveLine } from '@nivo/line'

function Graph() {

    const [title, setTitle] = useState();
    const [tabID, setTabID] = useState(1);

    const data = [
        {
            "id": "japan",
            "color": "hsl(355, 70%, 50%)",
            "data": [
                {
                    "x": 0,
                    "y": 14
                },
                {
                    "x": 1,
                    "y": 98
                },
                {
                    "x": 2,
                    "y": 220
                },
                {
                    "x": 3,
                    "y": 294
                },
                {
                    "x": 4,
                    "y": 266
                },
                {
                    "x": 5,
                    "y": 161
                },
                {
                    "x": 6,
                    "y": 35
                },
                {
                    "x": 7,
                    "y": 17
                },
                {
                    "x": 8,
                    "y": 290
                },
                {
                    "x": 9,
                    "y": 165
                },
                {
                    "x": 10,
                    "y": 175
                },
                {
                    "x": 11,
                    "y": 259
                },
                {
                    "x": 12,
                    "y": 143
                },
                {
                    "x": 13,
                    "y": 259
                },
                {
                    "x": 14,
                    "y": 276
                },
                {
                    "x": 15,
                    "y": 155
                },
                {
                    "x": 16,
                    "y": 133
                },
                {
                    "x": 17,
                    "y": 121
                },
                {
                    "x": 18,
                    "y": 165
                },
                {
                    "x": 19,
                    "y": 177
                },
                {
                    "x": 20,
                    "y": 97
                },
                {
                    "x": 21,
                    "y": 300
                },
                {
                    "x": 22,
                    "y": 247
                },
                {
                    "x": 23,
                    "y": 228
                },
                {
                    "x": 24,
                    "y": 242
                },
                {
                    "x": 25,
                    "y": 189
                },
                {
                    "x": 26,
                    "y": 285
                },
                {
                    "x": 27,
                    "y": 91
                },
                {
                    "x": 28,
                    "y": 33
                },
                {
                    "x": 29,
                    "y": 172
                },
                {
                    "x": 30,
                    "y": 42
                },
                {
                    "x": 31,
                    "y": 153
                },
                {
                    "x": 32,
                    "y": 274
                },
                {
                    "x": 33,
                    "y": 120
                },
                {
                    "x": 34,
                    "y": 62
                },
                {
                    "x": 35,
                    "y": 7
                },
                {
                    "x": 36,
                    "y": 82
                },
                {
                    "x": 37,
                    "y": 242
                },
                {
                    "x": 38,
                    "y": 97
                },
                {
                    "x": 39,
                    "y": 237
                },
                {
                    "x": 40,
                    "y": 221
                },
                {
                    "x": 41,
                    "y": 245
                },
                {
                    "x": 42,
                    "y": 260
                },
                {
                    "x": 43,
                    "y": 249
                },
                {
                    "x": 44,
                    "y": 82
                },
                {
                    "x": 45,
                    "y": 262
                },
                {
                    "x": 46,
                    "y": 189
                },
                {
                    "x": 47,
                    "y": 194
                },
                {
                    "x": 48,
                    "y": 132
                },
                {
                    "x": 49,
                    "y": 201
                },
                {
                    "x": 50,
                    "y": 236
                },
                {
                    "x": 51,
                    "y": 264
                },
                {
                    "x": 52,
                    "y": 57
                },
                {
                    "x": 53,
                    "y": 155
                },
                {
                    "x": 54,
                    "y": 167
                },
                {
                    "x": 55,
                    "y": 237
                },
                {
                    "x": 56,
                    "y": 225
                },
                {
                    "x": 57,
                    "y": 139
                },
                {
                    "x": 58,
                    "y": 263
                },
                {
                    "x": 59,
                    "y": 83
                },
                {
                    "x": 60,
                    "y": 106
                },
                {
                    "x": 61,
                    "y": 37
                },
                {
                    "x": 62,
                    "y": 152
                },
                {
                    "x": 63,
                    "y": 198
                },
                {
                    "x": 64,
                    "y": 172
                },
                {
                    "x": 65,
                    "y": 192
                },
                {
                    "x": 66,
                    "y": 10
                },
                {
                    "x": 67,
                    "y": 147
                },
                {
                    "x": 68,
                    "y": 99
                },
                {
                    "x": 69,
                    "y": 203
                },
                {
                    "x": 70,
                    "y": 179
                },
                {
                    "x": 71,
                    "y": 75
                },
                {
                    "x": 72,
                    "y": 231
                },
                {
                    "x": 73,
                    "y": 166
                },
                {
                    "x": 74,
                    "y": 230
                },
                {
                    "x": 75,
                    "y": 204
                },
                {
                    "x": 76,
                    "y": 136
                },
                {
                    "x": 77,
                    "y": 150
                },
                {
                    "x": 78,
                    "y": 273
                },
                {
                    "x": 79,
                    "y": 285
                },
                {
                    "x": 80,
                    "y": 144
                },
                {
                    "x": 81,
                    "y": 124
                },
                {
                    "x": 82,
                    "y": 160
                },
                {
                    "x": 83,
                    "y": 96
                },
                {
                    "x": 84,
                    "y": 11
                },
                {
                    "x": 85,
                    "y": 21
                },
                {
                    "x": 86,
                    "y": 100
                },
                {
                    "x": 87,
                    "y": 98
                },
                {
                    "x": 88,
                    "y": 186
                },
                {
                    "x": 89,
                    "y": 163
                },
                {
                    "x": 90,
                    "y": 97
                },
                {
                    "x": 91,
                    "y": 246
                },
                {
                    "x": 92,
                    "y": 144
                },
                {
                    "x": 93,
                    "y": 126
                },
                {
                    "x": 94,
                    "y": 123
                },
                {
                    "x": 95,
                    "y": 20
                },
                {
                    "x": 96,
                    "y": 100
                },
                {
                    "x": 97,
                    "y": 130
                },
                {
                    "x": 98,
                    "y": 224
                },
                {
                    "x": 99,
                    "y": 119
                },
                {
                    "x": 100,
                    "y": 41
                },
                {
                    "x": 101,
                    "y": 21
                },
                {
                    "x": 102,
                    "y": 91
                },
                {
                    "x": 103,
                    "y": 254
                },
                {
                    "x": 104,
                    "y": 31
                },
                {
                    "x": 105,
                    "y": 70
                },
                {
                    "x": 106,
                    "y": 244
                },
                {
                    "x": 107,
                    "y": 256
                },
                {
                    "x": 108,
                    "y": 29
                },
                {
                    "x": 109,
                    "y": 99
                },
                {
                    "x": 110,
                    "y": 293
                },
                {
                    "x": 111,
                    "y": 7
                },
                {
                    "x": 112,
                    "y": 165
                },
                {
                    "x": 113,
                    "y": 161
                },
                {
                    "x": 114,
                    "y": 182
                },
                {
                    "x": 115,
                    "y": 267
                },
                {
                    "x": 116,
                    "y": 226
                },
                {
                    "x": 117,
                    "y": 247
                },
                {
                    "x": 118,
                    "y": 221
                },
                {
                    "x": 119,
                    "y": 180
                },
                {
                    "x": 120,
                    "y": 121
                }
            ]
        },
        {
            "id": "brazil",
            "color": "hsl(277, 70%, 50%)",
            "data": [
                {
                    "x": 0,
                    "y": 96
                },
                {
                    "x": 1,
                    "y": 115
                },
                {
                    "x": 2,
                    "y": 166
                },
                {
                    "x": 3,
                    "y": 142
                },
                {
                    "x": 4,
                    "y": 8
                },
                {
                    "x": 5,
                    "y": 264
                },
                {
                    "x": 6,
                    "y": 120
                },
                {
                    "x": 7,
                    "y": 285
                },
                {
                    "x": 8,
                    "y": 268
                },
                {
                    "x": 9,
                    "y": 273
                },
                {
                    "x": 10,
                    "y": 104
                },
                {
                    "x": 11,
                    "y": 187
                },
                {
                    "x": 12,
                    "y": 108
                },
                {
                    "x": 13,
                    "y": 25
                },
                {
                    "x": 14,
                    "y": 284
                },
                {
                    "x": 15,
                    "y": 34
                },
                {
                    "x": 16,
                    "y": 253
                },
                {
                    "x": 17,
                    "y": 269
                },
                {
                    "x": 18,
                    "y": 44
                },
                {
                    "x": 19,
                    "y": 33
                },
                {
                    "x": 20,
                    "y": 230
                },
                {
                    "x": 21,
                    "y": 46
                },
                {
                    "x": 22,
                    "y": 204
                },
                {
                    "x": 23,
                    "y": 258
                },
                {
                    "x": 24,
                    "y": 35
                },
                {
                    "x": 25,
                    "y": 176
                },
                {
                    "x": 26,
                    "y": 165
                },
                {
                    "x": 27,
                    "y": 46
                },
                {
                    "x": 28,
                    "y": 149
                },
                {
                    "x": 29,
                    "y": 208
                },
                {
                    "x": 30,
                    "y": 278
                },
                {
                    "x": 31,
                    "y": 113
                },
                {
                    "x": 32,
                    "y": 271
                },
                {
                    "x": 33,
                    "y": 287
                },
                {
                    "x": 34,
                    "y": 89
                },
                {
                    "x": 35,
                    "y": 12
                },
                {
                    "x": 36,
                    "y": 287
                },
                {
                    "x": 37,
                    "y": 231
                },
                {
                    "x": 38,
                    "y": 184
                },
                {
                    "x": 39,
                    "y": 75
                },
                {
                    "x": 40,
                    "y": 66
                },
                {
                    "x": 41,
                    "y": 112
                },
                {
                    "x": 42,
                    "y": 111
                },
                {
                    "x": 43,
                    "y": 71
                },
                {
                    "x": 44,
                    "y": 227
                },
                {
                    "x": 45,
                    "y": 185
                },
                {
                    "x": 46,
                    "y": 19
                },
                {
                    "x": 47,
                    "y": 61
                },
                {
                    "x": 48,
                    "y": 92
                },
                {
                    "x": 49,
                    "y": 300
                },
                {
                    "x": 50,
                    "y": 225
                },
                {
                    "x": 51,
                    "y": 283
                },
                {
                    "x": 52,
                    "y": 94
                },
                {
                    "x": 53,
                    "y": 78
                },
                {
                    "x": 54,
                    "y": 298
                },
                {
                    "x": 55,
                    "y": 107
                },
                {
                    "x": 56,
                    "y": 250
                },
                {
                    "x": 57,
                    "y": 248
                },
                {
                    "x": 58,
                    "y": 184
                },
                {
                    "x": 59,
                    "y": 232
                },
                {
                    "x": 60,
                    "y": 178
                },
                {
                    "x": 61,
                    "y": 169
                },
                {
                    "x": 62,
                    "y": 106
                },
                {
                    "x": 63,
                    "y": 180
                },
                {
                    "x": 64,
                    "y": 37
                },
                {
                    "x": 65,
                    "y": 96
                },
                {
                    "x": 66,
                    "y": 294
                },
                {
                    "x": 67,
                    "y": 152
                },
                {
                    "x": 68,
                    "y": 286
                },
                {
                    "x": 69,
                    "y": 210
                },
                {
                    "x": 70,
                    "y": 229
                },
                {
                    "x": 71,
                    "y": 107
                },
                {
                    "x": 72,
                    "y": 71
                },
                {
                    "x": 73,
                    "y": 228
                },
                {
                    "x": 74,
                    "y": 298
                },
                {
                    "x": 75,
                    "y": 31
                },
                {
                    "x": 76,
                    "y": 144
                },
                {
                    "x": 77,
                    "y": 54
                },
                {
                    "x": 78,
                    "y": 288
                },
                {
                    "x": 79,
                    "y": 70
                },
                {
                    "x": 80,
                    "y": 218
                },
                {
                    "x": 81,
                    "y": 292
                },
                {
                    "x": 82,
                    "y": 137
                },
                {
                    "x": 83,
                    "y": 167
                },
                {
                    "x": 84,
                    "y": 275
                },
                {
                    "x": 85,
                    "y": 236
                },
                {
                    "x": 86,
                    "y": 126
                },
                {
                    "x": 87,
                    "y": 224
                },
                {
                    "x": 88,
                    "y": 96
                },
                {
                    "x": 89,
                    "y": 85
                },
                {
                    "x": 90,
                    "y": 159
                },
                {
                    "x": 91,
                    "y": 248
                },
                {
                    "x": 92,
                    "y": 104
                },
                {
                    "x": 93,
                    "y": 74
                },
                {
                    "x": 94,
                    "y": 159
                },
                {
                    "x": 95,
                    "y": 72
                },
                {
                    "x": 96,
                    "y": 257
                },
                {
                    "x": 97,
                    "y": 216
                },
                {
                    "x": 98,
                    "y": 4
                },
                {
                    "x": 99,
                    "y": 94
                },
                {
                    "x": 100,
                    "y": 247
                },
                {
                    "x": 101,
                    "y": 66
                },
                {
                    "x": 102,
                    "y": 169
                },
                {
                    "x": 103,
                    "y": 228
                },
                {
                    "x": 104,
                    "y": 213
                },
                {
                    "x": 105,
                    "y": 137
                },
                {
                    "x": 106,
                    "y": 292
                },
                {
                    "x": 107,
                    "y": 298
                },
                {
                    "x": 108,
                    "y": 7
                },
                {
                    "x": 109,
                    "y": 218
                },
                {
                    "x": 110,
                    "y": 137
                },
                {
                    "x": 111,
                    "y": 68
                },
                {
                    "x": 112,
                    "y": 284
                },
                {
                    "x": 113,
                    "y": 272
                },
                {
                    "x": 114,
                    "y": 64
                },
                {
                    "x": 115,
                    "y": 245
                },
                {
                    "x": 116,
                    "y": 170
                },
                {
                    "x": 117,
                    "y": 296
                },
                {
                    "x": 118,
                    "y": 144
                },
                {
                    "x": 119,
                    "y": 41
                },
                {
                    "x": 120,
                    "y": 126
                }
            ]
        },

    ]



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
            <div className="uk-card-body">
                {tabID == 0 &&
                    <div >
                        <h1>Graph</h1>
                        <ResponsiveLine style={{ height: "500px" }}
                            data={data}
                            margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
                            xScale={{ type: 'linear' }}
                            yScale={{ type: 'linear', stacked: true, min: 0, max: 2500 }}
                            yFormat=" >-.2f"
                            curve="monotoneX"
                            axisTop={null}
                            axisRight={{
                                tickValues: [
                                    0,
                                    500,
                                    1000,
                                    1500,
                                    2000,
                                    2500
                                ],
                                tickSize: 7,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: '.2s',
                                legend: '',
                                legendOffset: 0
                            }}
                            axisBottom={{
                                tickValues: [
                                    0,
                                    20,
                                    40,
                                    60,
                                    80,
                                    100,
                                    120
                                ],
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: '.2f',
                                legend: 'price',
                                legendOffset: 36,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                tickValues: [
                                    0,
                                    500,
                                    1000,
                                    1500,
                                    2000,
                                    2500
                                ],
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: '.2s',
                                legend: 'volume',
                                legendOffset: -40,
                                legendPosition: 'middle'
                            }}
                            colors={{ scheme: 'set1' }}
                            lineWidth={3}
                            pointSize={8}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                            pointLabelYOffset={-12}
                            areaOpacity={0.1}
                            useMesh={true}
                            gridXValues={[0, 20, 40, 60, 80, 100, 120]}
                            gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
                            legends={[
                                {
                                    anchor: 'right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 134,
                                    translateY: 0,
                                    itemsSpacing: 2,
                                    itemDirection: 'left-to-right',
                                    itemWidth: 80,
                                    itemHeight: 12,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: 'circle',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />

                    </div>
                }
                {tabID == 1 &&
                    <div className="">


                    </div>
                }
            </div>
        </div>


    </div>);
}

export default Graph;