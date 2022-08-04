import { Helmet } from "react-helmet";

import WorkInProgress from "./WorkInProgress";

function About() {
    return (<div>

        <WorkInProgress />

        <Helmet>
            <title>ProFyziky | O projektu</title>
        </Helmet>
    </div>);
}

export default About;