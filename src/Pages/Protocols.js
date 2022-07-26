import userEvent from "@testing-library/user-event";
import { useCallback, useEffect, useState } from "react"
import { Link, useLinkClickHandler } from "react-router-dom"
import { Helmet } from "react-helmet";


function Protocols() {
    const [UserName, setUserName] = useState();
    const [UserCoworker, setUserCoworker] = useState();
    const [UserSchool, setUserSchool] = useState();
    const [UserClass, setUserClass] = useState();

    const [Projects, setProjects] = useState();


    function saveInformation() {
        console.log({ "Name": UserName, "Coworker": UserCoworker, "School": UserSchool, "Class": UserClass })
        localStorage.setItem("ProFyziky-UserInfo", JSON.stringify({ "Name": UserName, "Coworker": UserCoworker, "School": UserSchool, "Class": UserClass }))
    }


    useEffect(() => {
        try {

            let info = JSON.parse(localStorage.getItem('ProFyziky-UserInfo'))
            setUserName(info["Name"])
            setUserClass(info["Class"])
            setUserSchool(info["School"])
            setUserCoworker(info["Coworker"])
        } catch (e) {

            localStorage.setItem('ProFyziky-UserInfo', JSON.stringify({ "Name": "", "Coworker": "", "School": "", "Class": "" }))

        }
    }, []);

    useEffect(() => {
        try {
            let projects = JSON.parse(localStorage.getItem('ProFyziky-Protocols'))
            setProjects(projects)
        } catch {
            localStorage.setItem('ProFyziky-Protocols', JSON.stringify([]))

        }
    }, []);



    function generateNewId() {
        try {

            let p = JSON.parse(localStorage.getItem('ProFyziky-Protocolos'))


            let IDs = []

            for (let obj of p) {
                IDs.push(obj.id)
            }

            console.log(IDs)


            // Try using lenght as an ID
            if (!IDs.includes('' + IDs.length)) {
                return IDs.length
            }

            // Loop until you found not used ID
            let testingID = 0
            while (true) {
                testingID += 1
                if (!IDs.includes("" + testingID)) {
                    return testingID
                }
            }
        }
        catch {
            return 0
        }

    }


    return (<div className="uk-container">

        <div uk-grid="">
            {/* Heading */}
            <div className="uk-width-expand">
                <h1 className="uk-heading-medium" style={{ paddingTop: "10px" }}>Protokoly</h1>
                <h3 style={{ marginTop: 0 }}>Začněte vytvářet nový protokol ve formuláři, nebo pokračujte v{"\u00A0"}rozdělaném protokolu.</h3>
            </div>
            {/* END Heading */}
            {/* Form */}
            <div className=" uk-tile uk-tile-primary uk-margin">

                <div className="uk-margin">
                    <label className="uk-form-label" for="form-stacked-text" >Jméno, Příjmení</label>
                    <div className="uk-form-controls">
                        <input className="uk-input" id="form-stacked-text" value={UserName} onBlur={() => saveInformation()} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Evženie Svíčková" />
                    </div>
                </div>

                <div className="uk-margin">
                    <label className="uk-form-label" for="form-stacked-text">Kolega</label>
                    <div className="uk-form-controls">
                        <input className="uk-input" id="form-stacked-text" type="text" placeholder="Ohnislav Guláš" onBlur={() => saveInformation()} value={UserCoworker} onChange={(e) => setUserCoworker(e.target.value)} />
                    </div>
                </div>

                <div className="uk-margin uk-grid">

                    <div className=" uk-width-3-5">
                        <label className="uk-form-label" for="skola">Škola</label>
                        <select className="uk-select" id="skola" value={UserSchool} onChange={(e) => { setUserSchool(e.target.value) }}>
                            <option disabled="">Vyberte školu</option>
                            <option>GymZl</option>

                        </select>
                    </div>


                    <div className="  uk-width-2-5">
                        <label className="uk-form-label" for="form-stacked-text">Třída, skupina</label>
                        <div className="uk-form-controls">
                            <input className="uk-input" id="form-stacked-text" type="text" placeholder="2A,A" onBlur={() => saveInformation()} value={UserClass} onChange={(e) => setUserClass(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="uk-margin ">
                    <Link className=" uk-button uk-button-default" to={"/protocols/" + generateNewId()} >Vytvořit protokol</Link>
                </div>



            </div>
            {/* END Form */}


        </div>


        {/* Table */}
        <table className="uk-table uk-table-hover uk-table-divider uk-table-responsive ">
            <thead>
                <tr>
                    <th>Téma</th>
                    <th>Název</th>
                    <th>Vyzvořeno</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td><a className="uk-button-default uk-button" >Edit</a></td>
                </tr>
                <tr>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td><button className="uk-button-default uk-button">Edit</button></td>
                </tr>
                <tr>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td><button className="uk-button-default uk-button">Edit</button></td>
                </tr>


            </tbody>


        </table>
        {/* END Table */}


        <Helmet>
            <title>ProFyziky | Protokoy</title>
        </Helmet>


    </div>);
}

export default Protocols;