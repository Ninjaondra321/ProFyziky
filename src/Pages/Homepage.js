import { Helmet } from "react-helmet";

function Homepage() {
    return (<div>
        <div className="uk-position-relative uk-container">
            <h1>Homepage</h1>
            <Helmet>
                <title>ProFyziky</title>
            </Helmet>
        </div>
    </div>);
}

export default Homepage;