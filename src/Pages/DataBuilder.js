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


    function editTiles(tileID, value) {
        let tilesCopy = tiles

        for (let i = 0; i < tilesCopy.length; i++) {
            if (tilesCopy[i].id == tileID) {
                tilesCopy[i] = value
                setTiles(tilesCopy)
            }
        }

    }









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
        <div className="uk-child-width-1-2 uk-grid uk-grid-match moje-grid-margin" uk-grid="">
            <div>
                dsdf


            </div>

            {tiles &&
                tiles.map(obj => {

                    if (obj.type == "table") {
                        return <Table editTiles={editTiles} values={values} />
                    }
                    else if (obj.type == "graph") {
                        return <Graph editTiles={editTiles} values={values} />
                    }
                    else if (obj.type == "average") {
                        return <Average editTiles={editTiles} tileContent={obj.content} values={values} />
                    }
                })

            }


            <div>
                <h1>+</h1>
                <h3>New</h3>
                <button onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "table", content: [] }])}>table</button>
                <button onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "graph", content: [] }])}>graph</button>
                <button onClick={() => setTiles([...tiles, { id: getNewTileID(), type: "average", content: [] }])}>average</button>
            </div>

        </div>


    </div>);
}

export default DataBuilder;