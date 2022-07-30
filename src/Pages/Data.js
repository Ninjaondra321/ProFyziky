import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { contains } from "jquery";

function Data() {
    const [Data, setData] = useState();

    useEffect(() => {
        let l = localStorage.getItem('ProFyziky-Data')

        if (!l) {
            l = JSON.stringify([])
            localStorage.setItem('ProFyziky-Data', l)
        }

        console.log('Setting data')
        setData(JSON.parse(l))
    }, []);

    function getNewID() {
        if (!Data) {
            return 0
        }
        let listOdIDs = []

        // Data.map(obj => { listOdIDs.push(obj.id) })

        let dataCopy = Data
        console.log(dataCopy)
        for (let obj of dataCopy) {
            listOdIDs.push(obj.id)
        }


        let testingID = 0
        while (true) {
            if (!listOdIDs.includes(testingID)) {
                return testingID
            }
            testingID += 1
        }

    }


    return (<div>
        <h1>Data</h1>
        <h1>!!TODO: Pak dodělej karty!!</h1>


        <Link to={"/data/" + getNewID()}>
            <h1>+ NEW</h1>
        </Link>


        {Data &&
            Data.map(obj =>
                <div>
                    <Link to={obj.id}>


                        <h3>{obj.filename}</h3>
                    </Link>


                </div>
            )
        }

    </div>);
}

export default Data;