import { Link } from "react-router-dom";
import nazorny_obr from "../Imgs/nazorny_obvod.png"
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";


function Circuits() {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        try {
            let p = localStorage.getItem('ProFyziky-Circuits')
            if (p) {
                setProjects(JSON.parse(p))
            } else {
                setProjects([])
                localStorage.setItem("ProFyziky-Circuits", JSON.stringify([]))
            }
        } catch {
            setProjects([])
            localStorage.setItem("ProFyziky-Circuits", JSON.stringify([]))
        }
    }, []);

    function generateNewId() {
        try {

            let p = JSON.parse(localStorage.getItem('ProFyziky-Circuits'))

            let IDs = []

            for (let obj of p) {
                IDs.push(obj.id)
            }



            // Try using lenght as an ID
            if (!IDs.includes("" + IDs.length)) {
                return IDs.length
            }

            // Loop until you found not used ID
            let testingID = 0
            while (true) {
                testingID += 1
                if (!IDs.includes("" + testingID)) {
                    return testingID
                } else {
                }
            }
        }
        catch (e) {
            console.warn(e)
            return 0
        }

    }


    return (<div className="uk-position-relative uk-container">
        <h1 className="uk-heading-medium" style={{ paddingTop: "10px" }}>Circuits</h1>
        <h3 style={{ marginTop: 0 }}>Pokračujte v rozdělaném projektu nebo začněte nový</h3>

        <div className="uk-padding-small"></div>

        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid uk-grid-match moje-vyber-predmetu"
            uk-scrollspy="cls: uk-animation-scale-up uk-transform-origin-bottom-center; target: div; delay: 100; repeat: false"
            uk-grid="" style={{ paddingBottom: "40px" }}>

            <Link to={"/circuits/" + generateNewId()} className="uk-grid-margin ">
                <div className="uk-card uk-card-hover uk-card-body  uk-card-primary">
                    <h1>+</h1>
                    <h2>Nový</h2>
                </div>
            </Link>



            {projects &&
                projects.map((obj) =>
                    <Link to={obj.id} key={obj.id} className="uk-grid-margin uk-link-muted">
                        <div className="uk-card uk-card-hover uk-card-body  uk-card-default">
                            <img src={nazorny_obr} alt="" />
                            <h3 className="uk-link-muted" style={{ margin: "0" }}>{obj.title}</h3>
                            <p className="uk-link-muted" style={{ margin: "0" }}>{obj.subtitle}</p>
                        </div>
                    </Link>
                )
            }

            <Helmet>
                <title>ProFyziky | El. shchémata</title>
            </Helmet>


        </div>

    </div>);
}

export default Circuits;