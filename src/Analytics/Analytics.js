import { Helmet } from "react-helmet";

function Analytics() {
    console.log('Anylytics připnuty')
    return (<Helmet>
        <title>Používám cookies</title>
    </Helmet>);
}

export default Analytics;