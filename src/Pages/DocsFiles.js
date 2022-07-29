import { useParams } from "react-router-dom";

function DocsFiles() {
    let { projectName } = useParams()


    return (<div>Docs Files + {projectName}</div>);
}

export default DocsFiles;