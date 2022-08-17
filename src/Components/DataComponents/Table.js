import { useState, useEffect } from "react";

import Spreadsheet from "react-spreadsheet";


function Table({ values, deleteTile, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {

    const [updateTable, setUpdateTable] = useState(Math.random());

    const [title, setTitle] = useState();
    const [tableValues, setTableValues] = useState();
    const [tableData, setTableData] = useState();

    useEffect(() => {
        if (tileContent) {
            setTitle(tileContent.title)
            setTableValues(tileContent.tableValues)
        } else {
            setTitle("Tabulka")
            setTableValues([])

        }
    }, []);


    useEffect(() => {
        // Něco jako save fce
        setIsSaved(false)
        let tilesCopy = tiles
        for (let i = 0; i < tilesCopy.length; i++) {
            if (tilesCopy[i].id == tileID) {
                tilesCopy[i].content = {
                    title: title,
                    tableValues: tableValues
                }
                setTiles(tilesCopy)
                break
            }
        }

    }, [title, tableValues]);





    function changeTableValues(id, valueee) {
        let tableValCopy = tableValues
        for (let i = 0; i < tableValCopy.length; i++) {
            if (tableValCopy[i].id == id) {
                tableValCopy[i].value = valueee
                setTableValues(tableValCopy)
            }
        }
        setTableValues(tableValCopy)
        setUpdateTable(Math.random())

    }

    function addNewValue() {
        let newID = 0
        let IDs = []

        try {
            let t = tableValues

            for (let obj of t) {
                IDs.push(obj.id)
            }

            while (true) {
                if (!IDs.includes(newID)) {
                    break
                }
                newID += 1
            }

        } catch {
            console.log('Ahoj asi -- pls nemaz')
        }



        if (!tableValues) {
            setTableValues([{ id: 0, value: undefined }])
        } else {
            setTableValues([...tableValues, { id: newID, value: undefined }])
        }
    }

    function getValues(id) {

        let tableValues
        let symbol
        let jednotka


        for (let val of values) {




            if (val.id == id || val.id == "" + id) {
                tableValues = val.values
                symbol = val.symbol
                jednotka = val.jednotka

                if (typeof (tableValues) != Array) {
                    console.log("někam se konečně dostáváme")
                }

                break
            }



        }
        return { symbol: symbol, jednotka: jednotka, values: values }


    }

    return (<div className="uk-padding-small ">
        <div className="uk-hidden">
            {updateTable}
        </div>
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

                        <a onClick={() => deleteTile(tileID)}><span uk-icon="trash"></span>Odstranit kachličku</a>

                    </div>

                </div>


            </div>

            <hr style={{ margin: 0 }} />

            <div style={{ overflow: "scroll", flexWrap: "nowrap", display: "flex", height: "calc(100% - 50px)" }}>
                {tableValues &&
                    tableValues.map(valuee =>
                        <div style={{ width: "90px" }}>

                            <select className="uk-select" value={valuee.value} style={{ width: "90px" }} onChange={(e) => changeTableValues(valuee.id, e.target.value)} >
                                {values &&
                                    values.map(obj => {
                                        if (obj.typ == "tabulka") {
                                            return <option key={obj.id} value={obj.id} >{obj.symbol}</option>
                                        }
                                        return <></>
                                    }
                                        // <option key={obj.id} value={obj.id} >{obj.symbol}</option>
                                    )
                                }
                            </select>


                            {
                                [getValues(valuee.value)].map(obj => <div>
                                    {/* <input type="text" className="uk-input" value={obj.symbol} disabled /> */}
                                    <input type="text" className="uk-input" value={obj.jednotka} disabled />
                                    {/* <hr style={{ margin: 0, borderWidth: 2, borderColor: "black" }} /> */}
                                    {
                                        obj.values.map(val => <>
                                            <input type="number" className="uk-input" value={val} />


                                        </>)
                                    }

                                    <input type="number" className="uk-input" />

                                </div>)

                            }




                        </div>
                    )
                }
                <button className="uk-button uk-button-default" style={{ width: "90px" }} onClick={() => addNewValue()} >+</button>
            </div>

            {tableData && <div >

                <div>

                </div>

            </div>

            }


            {/* {tableData &&
                    <Spreadsheet data={[]} />

                } */}
        </div>
    </div >);
}

export default Table;