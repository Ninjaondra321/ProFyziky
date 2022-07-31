import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Table from "../Components/DataComponents/Table";
import Graph from "../Components/DataComponents/Grapg";
import Average from "../Components/DataComponents/Average";

function DataBuilder() {
    let { projectName } = useParams()

    const [isSaved, setIsSaved] = useState(true);
    const [fileName, setFileName] = useState();
    const [tiles, setTiles] = useState();
    const [values, setValues] = useState([
        { id: 0, symbol: "v1", nazev: "Velký kulový", jednotka: "cm**2", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
        { id: 1, symbol: "v2", nazev: "Počáteční teplota", jednotka: "cm**2", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
        { id: 2, symbol: "m", nazev: "Hmotnost", jednotka: "kg", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
    ]);

    const [fullscreenID, setFullscreenID] = useState(false);



    useEffect(() => {
        let l = JSON.parse(localStorage.getItem('ProFyziky-Data'))

        for (let project of l) {
            if (project.id == projectName) {
                setTiles(project.tiles)
                setFileName(project.fileName)
                setValues(project.values)
                return
            }
        }

        l.push({
            id: projectName,
            fileName: "Bez názvu",
            values: [],
            tiles: [],
        })

        setFileName('Bez názvu')
        setValues([])
        setTiles([])

        localStorage.setItem('ProFyziky-Data', JSON.stringify(l))
        setIsSaved(true)
    }, []);


    useEffect(() => {
        setIsSaved(false)
    }, [fileName, tiles, values]);

    function getNewTileID() {
        let tileIDs = []
        for (let tile of tiles) {
            tileIDs.push(tile.id)
        }

        let testingID = 0
        while (true) {
            if (!tileIDs.includes(testingID)) {
                return testingID
            }
            testingID += 1
        }
    }



    function save() {
        let l = JSON.parse(localStorage.getItem('ProFyziky-Data'))

        for (let i = 0; i < l.length; i++) {
            if (l[i].id == projectName) {
                l.splice(i)
                l.push({
                    id: projectName,
                    fileName: fileName,
                    values: values,
                    tiles: tiles,
                })
                localStorage.setItem('ProFyziky-Data', JSON.stringify(l))
                setIsSaved(true)
                return
            }
        }
    }


    // function editTiles(tileID, value) {
    //     let tilesCopy = tiles

    //     for (let i = 0; i < tilesCopy.length; i++) {
    //         if (tilesCopy[i].id == tileID) {
    //             tilesCopy[i] = value
    //             setTiles(tilesCopy)
    //         }
    //     }

    // }


    console.log(fullscreenID)



    return (<div>
        {/* SubNavBar */}
        <div className="subnavbar">

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
                <input type="text" className="uk-input" style={{ padding: 0 }} defaultValue={fileName}
                    onBlur={(e) => { setFileName(e.target.value) }}
                    placeholder="Projekt bez názvu" />

            </div>
            <div className="right">
                {isSaved &&
                    <button onClick={() => save()} className="uk-button uk-button-default">Uloženo</button>

                }
                {!isSaved &&
                    <button
                        onClick={() => save()}
                        className="uk-button uk-button-primary">Uložit</button>
                }

            </div>

        </div>
        {/* END SubNavBar */}

        <div className="uk-padding"></div>
        <div className="uk-container  uk-position-relative">


            <div className="uk-child-width-1-2@m uk-grid uk-grid-match moje-grid-margin " uk-grid="">
                <div className="uk-padding-small">
                    <table class="uk-table  uk-table-justify moje-data-table">
                        <thead>
                            <tr>
                                <th>Značka</th>
                                <th>Název</th>
                                <th>Jednotka</th>
                                <th>Hodnota</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> <input type="text" className="uk-input" placeholder="s" /> </td>
                                <td> <input type="text" className="uk-input" placeholder="Rychlost" /> </td>
                                <td> <input type="text" className="uk-input" placeholder="km/h" /> </td>
                                <td>
                                    <select name="" id="" className="uk-select">
                                        <option value="">Konstanta</option>
                                        <option value="">Doplnit do tabulky</option>
                                        <option value="">Vzorec</option>
                                    </select>
                                    <input type="text" className="uk-input" placeholder="c" />
                                </td>
                            </tr>





                        </tbody>
                    </table>
                    <button className="uk-button uk-button-default">+</button>


                </div>

                {tiles &&
                    tiles.map(obj => {

                        if (obj.type == "table") {
                            return <Table values={values} />
                        }
                        else if (obj.type == "graph") {
                            return <Graph values={values} />
                        }
                        else if (obj.type == "average") {
                            return <Average setTiles={setTiles} fullscreenID={fullscreenID} setFullscreenID={setFullscreenID} key={obj.id} tiles={tiles} tileID={obj.id} tileContent={obj.content} setIsSaved={setIsSaved} values={[
                                { id: 0, symbol: "v1", nazev: "Velký kulový", jednotka: "cm**2", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
                                { id: 1, symbol: "v2", nazev: "Počáteční teplota", jednotka: "cm**2", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
                                { id: 2, symbol: "m", nazev: "Hmotnost", jednotka: "kg", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
                            ]} />
                        }
                    })

                }


                <div>
                    <div className="center">

                        <h2>+     New</h2>

                    </div>
                    <div className="uk-child-width-1-3 uk-grid-match" uk-grid="">
                        <div className="uk-card uk-card-hover uk-card-body moje-cursor" onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "table", content: [] }])}>
                            <h4>Tabulka</h4>
                        </div>
                        <div className="uk-card uk-card-hover uk-card-body moje-cursor" onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "graph", content: [] }])}>
                            <h4>Graf</h4>
                        </div>
                        <div className="uk-card uk-card-hover uk-card-body moje-cursor" onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "average", content: [] }])}>
                            <h4>Průměr</h4>
                        </div>

                        {/* <button onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "table", content: [] }])}>table</button>
                        <button onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "graph", content: [] }])}>graph</button>
                        <button onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "average", content: [] }])}>average</button> */}

                    </div>

                </div>







            </div>



        </div>


        {(fullscreenID) &&


            [tiles[fullscreenID]].map((obj) => {
                if (obj.type == "table") {
                    return <div className="moje-fulscreen-tile "> <Table values={values} /></div>
                }
                else if (obj.type == "graph") {
                    return <div className="moje-fulscreen-tile"> <Graph values={values} /></div>
                }
                else if (obj.type == "average") {
                    return <div className="moje-fulscreen-tile "><Average setTiles={setTiles} key={obj.id} tiles={tiles} tileID={obj.id} tileContent={obj.content} setIsSaved={setIsSaved} values={[
                        { id: 0, symbol: "v1", nazev: "Velký kulový", jednotka: "cm**2", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
                        { id: 1, symbol: "v2", nazev: "Počáteční teplota", jednotka: "cm**2", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
                        { id: 2, symbol: "m", nazev: "Hmotnost", jednotka: "kg", values: [19.07, 19.87, 18.83, 18.04, 18.87,] },
                    ]} /></div>
                }
            }
            )



        }
        {fullscreenID &&

            <div className="moje-fulscreen-tile-bg" onClick={() => setFullscreenID(false)} ></div>
        }


        <div className="uk-padding-large"></div>
        <div className="uk-padding-large"></div>
    </div>);
}

export default DataBuilder;