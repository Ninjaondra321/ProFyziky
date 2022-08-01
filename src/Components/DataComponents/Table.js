import { useState } from "react";

import Spreadsheet from "react-spreadsheet";


function Table({ values, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {

    const [title, setTitle] = useState();

    console.log(tileContent)
    tileContent([0, 1])

    function convertValuesToSpreadSheetData() {


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
                <Spreadsheet data={[
                    [{ value: "Vanilla", readOnly: true }, { value: "Chocolate" }],
                    [{ value: "Strawberry" }, { value: "Cookies" }],
                ]} />
            </div>
        </div>
    </div>);
}

export default Table;