import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { contains } from "jquery";
import { Helmet } from "react-helmet";

function Data() {
    const [Data, setData] = useState();

    useEffect(() => {
        let l = localStorage.getItem('ProFyziky-Data')

        if (!l) {
            l = JSON.stringify([])
            localStorage.setItem('ProFyziky-Data', l)
        }

        setData(JSON.parse(l))
    }, []);


    function getNewID() {
        if (!Data) {
            return 0
        }
        let listOdIDs = []

        let dataCopy = Data
        for (let obj of dataCopy) {
            listOdIDs.push(obj.id)
        }


        let testingID = 0
        while (true) {
            if (!listOdIDs.includes('' + testingID)) {
                return testingID
            }
            testingID += 1
        }

    }



    return (<div className="uk-container">
        <h1 className="uk-heading-medium" style={{ paddingTop: "10px" }}>Data</h1>
        <h3>Pracujte s vámi již vytvořenými daty nebo založte nový projekt </h3>

        {/* <Link to={"/data/" + getNewID()}>
            <h1>+ NEW</h1>
        </Link> */}

        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid uk-grid-match" uk-grid="" style={{ paddingBottom: "50px" }}>

            <div >
                <Link to={"/data/" + getNewID()} className="uk-card-body uk-card uk-card-primary uk-card-hover">
                    <h2>+ NEW</h2>
                </Link>


            </div>

            {Data &&
                Data.map(obj =>
                    <div >
                        <Link to={obj.id} className="uk-card-body uk-card uk-card-default uk-card-hover">


                            <h3>{obj.fileName}</h3>
                        </Link>


                    </div>
                )
            }
        </div>

        <Helmet>
            <title>ProFyziky | Data</title>
            <meta name="title" content="ProFyziky | Data" />
            <meta name="description" content="Vytvářejte grafy, tabulky, průměry hodnot ZDARMA! Nevyžaduje přihlášení ani placení. Funguje i na mobilních zařízeních a tabletech!" />
        </Helmet>

    </div>);
}

export default Data;