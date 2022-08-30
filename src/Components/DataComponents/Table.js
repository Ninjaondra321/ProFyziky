import { useState, useEffect } from "react";
import { convertNode } from "react-pdf-html/dist/parse";

import Spreadsheet from "react-spreadsheet";


function Table({ values, setValues, setUpdateTiles, deleteTile, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {

    const [updateTable, setUpdateTable] = useState(Math.random());

    const [title, setTitle] = useState();
    const [tableValues, setTableValues] = useState();

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
                if (valueee == "--odstranit--") {
                    tableValCopy.splice(i, 1)
                    break
                }
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

        setUpdateTable(Math.random())
    }

    function getValues(id) {

        var tableValues = undefined
        var symbol = undefined
        var jednotka = undefined




        for (let val of values) {




            if (val.id == id || val.id == "" + id) {
                tableValues = val.values
                symbol = val.symbol
                jednotka = val.jednotka

                // if (typeof (tableValues) != Array) {
                //     console.log("někam se konečně dostáváme")
                //     console.debug(tableValues)
                //     tableValues = []
                // }



                break
            }



        }

        if (tableValues == undefined) {
            tableValues = []
        }


        return { symbol: symbol, jednotka: jednotka, values: tableValues }


    }

    function changeValueInTable(tableColumnValue, tableRow, newValue) {
        console.log(tableColumnValue, tableRow, newValue)

        for (let i = 0; i < values.length; i++) {
            if (values[i].id == tableColumnValue) {
                let valuesCopy = values
                valuesCopy[i].values[tableRow] = newValue

                setValues(valuesCopy)
                console.log('setting VAlues')
                setUpdateTiles(Math.random())
                return
            }
        }

    }


    function extendTable(valueType, value) {
        let valuesCopy = values
        for (let i = 0; i < valuesCopy.length; i++) {
            if (valuesCopy[i].typ == "tabulka") {
                if (valuesCopy[i].id == valueType) {
                    try {
                        valuesCopy[i].values.push(value)
                    } catch {
                        valuesCopy[i].values = [value]
                    }
                } else {
                    try {
                        valuesCopy[i].values.push(0)
                    } catch {
                        valuesCopy[i].values = [0]
                    }
                }
            }

        }

        setValues(valuesCopy)
        setUpdateTable(Math.random())

    }


    function createHTMLtable() {
        let tableValuesCopy = tableValues

        let headerFirstRow = `<tr>`
        let headerSecondRow = `<tr>`

        let tableBodyValues = []
        let tableBodyHTML = ``

        for (let i = 0; i < tableValuesCopy.length; i++) {
            let val = getValues(tableValuesCopy[i].value)

            headerFirstRow += `<th>${val.symbol}</th>`
            headerSecondRow += `<th>${val.jednotka}</th>`

            for (let i2 = 0; i2 < val.values.length; i2++) {
                try {
                    tableBodyValues[i2][i] = val.values[i2]
                } catch {
                    tableBodyValues[i2] = []
                    tableBodyValues[i2][i] = val.values[i2]
                }
            }
        }

        for (let row of tableBodyValues) {
            let rowHTML = `<tr>`
            for (let cell of row) {
                rowHTML += `<td>${cell}</td>`
            }
            rowHTML += `</tr>`
            tableBodyHTML += rowHTML
        }


        console.log(tableBodyValues)
        console.log(tableBodyHTML)



        let output = `
            <table>
                <thead>
                    ${headerFirstRow}
                    ${headerSecondRow}
                </thead>
                <tbody>
                    ${tableBodyHTML}
                </tbody>    
            </table>
            `

        console.log(output)
        navigator.clipboard.writeText(output)
        navigator.clipboard.writeText(output)
    }






    function changeFocus(idAfter, uprava) {
        console.log("changeing focus")
        // Focus previous input
        let inputs = document.getElementsByTagName("input")
        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].id == idAfter) {
                setTimeout(() => {
                    inputs[i + uprava].focus()

                }, 1);
                break
            }
        }
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
                        <a onClick={() => createHTMLtable()}><span uk-icon="trash"></span>Zkopírovat do protokolu</a>

                    </div>

                </div>


            </div>

            <hr style={{ margin: 0 }} />

            <div style={{ overflow: "scroll", flexWrap: "nowrap", display: "flex", height: "calc(100% - 50px)" }}>
                {tableValues &&
                    tableValues.map((valuee, rowIndex) =>
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

                                <option value="--odstranit--">Odstranit</option>
                            </select>


                            {updateTable &&
                                [getValues(valuee.value)].map((obj, index) => <div key={obj}>
                                    <input type="text" className="uk-input" value={obj.jednotka} disabled />
                                    {
                                        // values[0].values.map((val, index) => {
                                        obj.values.map((val, index) =>
                                            <input type="number" className="uk-input" value={val} key={index} onChange={(e) => changeValueInTable(valuee.value, index, e.target.value)} />


                                        )
                                    }

                                    <input type="number" className="uk-input" value=""
                                        id={"newInput" + rowIndex}
                                        onChange={(e) => {
                                            extendTable(valuee.value, e.target.value);
                                            changeFocus("newInput" + rowIndex, rowIndex);
                                        }} />

                                </div>)

                            }




                        </div>
                    )
                }
                <button className="uk-button uk-button-default" style={{ width: "90px" }} onClick={() => addNewValue()} >+</button>
            </div>




            {/* {tableData &&
                    <Spreadsheet data={[]} />

                } */}
        </div>
    </div >);
}

export default Table;