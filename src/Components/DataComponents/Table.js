import { useState, useEffect } from "react";

import Spreadsheet from "react-spreadsheet";


function Table({ values, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {

    const [title, setTitle] = useState();
    const [tableValues, setTableValues] = useState();
    const [tableData, setTableData] = useState();

    console.log(tileContent)
    // tileContent([0, 1])

    useEffect(() => {
        if (tileContent) {
            setTitle(tileContent.title)
            setTableValues(tileContent.tableValues)
        } else {
            setTitle("Tabulka")
            setTableValues([])

        }
    }, []);

    console.log(values)

    useEffect(() => {
        try {

            let tableDataNotConverted = []
            let tableDataOuptut = []


            for (let value of tableValues) {

                for (let mainValue of values) {
                    if (value == mainValue.id) {
                        console.log('MainValue found')
                        tableDataNotConverted.push(mainValue.values)
                        break
                    }
                }


            }

            console.warn(tableDataNotConverted)

            setTableData([])
        } catch {
            console.log('Asi nejakej error')
        }

    }, [tableValues]);


    function changeTableValues(id, valueee) {
        let tableValCopy = tableValues

        for (let i = 0; i < tableValCopy.length; i++) {
            if (tableValCopy[i].id == id) {
                tableValCopy[i] = valueee
                setTableValues(tableValCopy)
            }

        }

    }

    function addNewValue() {
        if (!tableValues) {
            setTableValues([0])
        } else {
            setTableValues([...tableValues, 0])
        }
    }

    return (<div className="uk-padding-small ">
        <div className="uk-card uk-card-default  ">
            <div className="uk-card-header-footer uk-flex" style={{ justifyContent: "space-between", padding: "5px" }}>


                <input className="uk-input uk-form-blank uk-form-width-medium" type="text" placeholder="Kachlička" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="center">

                    {fullscreenID == tileID &&
                        <span uk-icon="shrink" onClick={() => setFullscreenID(false)} ></span>
                    }
                    {fullscreenID != tileID &&
                        <span uk-icon="expand" onClick={() => { console.log('asdas'); setFullscreenID(tileID) }}></span>
                    }

                    <span uk-icon="more-vertical"></span>

                    <div uk-dropdown="mode: click">

                        <a><span uk-icon="trash"></span>Odstranit kachličku</a>

                    </div>

                </div>


            </div>

            <hr style={{ margin: 0 }} />
            <div className="">

                <div style={{ paddingLeft: "90px" }}>
                    {tableValues &&
                        tableValues.map(valuee =>
                            <select className="uk-select" value={valuee.value} style={{ width: "90px" }} onChange={(e) => changeTableValues(valuee.id, e.target.value)} >
                                {values &&
                                    values.map(obj =>
                                        <option key={obj.id} value={obj.id} >{obj.symbol}</option>
                                    )
                                }
                            </select>
                        )
                    }
                    <button className="uk-button uk-button-default" style={{ width: "90px" }} onClick={() => addNewValue()} >+</button>
                </div>


                {tableData &&
                    <Spreadsheet data={[]} />

                }
            </div>
        </div>
    </div>);
}

export default Table;