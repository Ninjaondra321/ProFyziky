import userEvent from "@testing-library/user-event";
import { useCallback, useEffect, useState } from "react"
import { Link, useLinkClickHandler } from "react-router-dom"
import { Helmet } from "react-helmet";

import { useNavigate } from "react-router-dom";

function Protocols() {
    // const [UserName, setUserName] = useState();

    const [UserFirstName, setUserFirstName] = useState();
    const [userLastName, setUserLastName] = useState();

    const [UserCoworker, setUserCoworker] = useState();
    const [UserSchool, setUserSchool] = useState();
    const [UserClass, setUserClass] = useState();

    const [Projects, setProjects] = useState();

    const [formFirstNameIsOK, setFormFirstNameIsOK] = useState(true);
    const [formLastNameIsOK, setFormLastNameIsOK] = useState(true);
    const [formCoworkerIdOK, setFormCoworkerIdOK] = useState(true);
    const [formClassIsOK, setformClassIsOK] = useState(true);


    function saveInformation() {
        console.log({ "FirstName": UserFirstName, "LastName": userLastName, "School": UserSchool, "Class": UserClass })
        localStorage.setItem("ProFyziky-UserInfo", JSON.stringify({ "FirstName": UserFirstName, "LastName": userLastName, "Coworker": UserCoworker, "School": UserSchool, "Class": UserClass }))
    }

    useEffect(() => {
        try {

            let info = JSON.parse(localStorage.getItem('ProFyziky-UserInfo'))
            setUserFirstName(info["FirstName"])
            setUserLastName(info["LastName"])
            setUserClass(info["Class"])
            setUserSchool(info["School"])
            setUserCoworker(info["Coworker"])
        } catch (e) {

            localStorage.setItem('ProFyziky-UserInfo', JSON.stringify({ "FirstName": "", "LastName": userLastName, "Coworker": "", "School": "", "Class": "" }))

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

            let p = JSON.parse(localStorage.getItem('ProFyziky-Protocols'))


            let IDs = []

            for (let obj of p) {
                IDs.push(obj.id)
            }



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
        catch (e) {
            console.warn(e)
            return 0
        }

    }

    let navigate = useNavigate();

    function validateFormAndRedirect() {
        let isValid = true
        if (!UserFirstName) {
            setFormFirstNameIsOK(false)
            isValid = false
        }
        if (!userLastName) {
            setFormLastNameIsOK(false)
            isValid = false
        }
        if (!UserClass) {
            setformClassIsOK(false)
            isValid = false
        }
        if (!UserCoworker) {
            setFormCoworkerIdOK(false)
            isValid = false
        }

        if (isValid) {
            navigate("./" + generateNewId(), { replace: true });

        }

    }


    return (<div className="uk-container">

        <div uk-grid="">
            {/* Heading */}
            <div className="uk-width-expand">
                <h1 className="uk-heading-medium" style={{ paddingTop: "10px" }}>Protokoly</h1>
                <h3 style={{ marginTop: 0 }}>Za??n??te vytv????et nov?? protokol ve formul????i, nebo pokra??ujte v{"\u00A0"}rozd??lan??m protokolu.</h3>
            </div>
            {/* END Heading */}
            {/* Form */}
            <div className=" uk-tile uk-tile-primary uk-margin">

                <div className="uk-margin uk-grid ">
                    <div className="uk-width-1-2" >

                        <label className="uk-form-label" for="form-stacked-text" >K??estn?? jm??no</label>
                        <div className="uk-form-controls ">
                            <input className={formFirstNameIsOK ? "uk-input" : "uk-input uk-form-danger"} id="form-stacked-text" value={UserFirstName} onBlur={() => saveInformation()} onChange={(e) => { setUserFirstName(e.target.value); setFormFirstNameIsOK(true) }} type="text" placeholder="Ev??enie" />
                        </div>
                    </div>

                    <div className="uk-width-1-2" style={{ paddingLeft: "20px" }}>

                        <label className="uk-form-label" for="form-stacked-text" >P????jmen??</label>
                        <div className="uk-form-controls">
                            <input className={formLastNameIsOK ? "uk-input" : "uk-input uk-form-danger"} id="form-stacked-text" value={userLastName} onBlur={() => saveInformation()} onChange={(e) => { setUserLastName(e.target.value); setFormLastNameIsOK(true) }} type="text" placeholder="Sv????kov??" />
                        </div>
                    </div>


                </div>

                <div className="uk-margin">
                    <label className="uk-form-label" for="form-stacked-text">Kolega</label>
                    <div className="uk-form-controls">
                        <input className={formCoworkerIdOK ? "uk-input" : "uk-input uk-form-danger"} id="form-stacked-text" type="text" placeholder="Ohnislav Gul????" onBlur={() => saveInformation()} value={UserCoworker} onChange={(e) => { setUserCoworker(e.target.value); setFormCoworkerIdOK(true) }} />
                    </div>
                </div>

                <div className="uk-margin uk-grid">

                    <div className=" uk-width-3-5">
                        <label className="uk-form-label" for="skola">??kola</label>
                        <select className="uk-select" id="skola" value={UserSchool} onChange={(e) => { setUserSchool(e.target.value) }}>
                            <option disabled>Vyberte ??kolu</option>
                            <option>GymZl</option>

                        </select>
                    </div>


                    <div className="  uk-width-2-5" style={{ paddingLeft: "20px" }}>
                        <label className="uk-form-label" for="form-stacked-text">T????da, skupina</label>
                        <div className="uk-form-controls">
                            <input className={formClassIsOK ? "uk-input" : "uk-input uk-form-danger"} id="form-stacked-text" type="text" placeholder="2A,A" onBlur={() => saveInformation()} value={UserClass} onChange={(e) => { setUserClass(e.target.value); setformClassIsOK(true) }} />
                        </div>
                    </div>
                </div>

                <div className="uk-margin ">
                    {/* <Link className=" uk-button uk-button-default" to={"/protocols/" + generateNewId()} >Vytvo??it protokol</Link> */}
                    <button className="uk-button uk-button-default" onClick={() => validateFormAndRedirect()} > Vytvo??it protokol</button>
                </div>



            </div>
            {/* END Form */}


        </div>


        {/* Table */}
        <table className="uk-table uk-table-hover uk-table-divider uk-table-responsive ">
            <thead>
                <tr>
                    <th>T??ma</th>
                    <th>N??zev</th>
                    <th>Vyzvo??eno</th>
                </tr>
            </thead>
            <tbody>

                {Projects && Projects.map(obj =>
                    <tr>
                        <td>{obj.nadpis}</td>
                        <td>{obj.fileName}</td>
                        <td>{obj.dateOfCreation}</td>
                        <td><Link to={"/protocols/" + obj.id} className="uk-button-default uk-button" >Edit</Link></td>

                    </tr>
                )}



            </tbody>


        </table>
        {/* END Table */}

        <div className="uk-padding-small"></div>


        <Helmet>
            <title>ProFyziky | Protokoy</title>
            <meta name="title" content="ProFyziky | Protokoy" />
            <meta name="description" content="Vytv????ejte protokoly jednodu??e, rychle a ZDARMA! Nevy??aduje p??ihl????en?? ani placen??. Funguje i na mobiln??ch za????zen??ch a tabletech!" />

        </Helmet>


    </div>);
}

export default Protocols;