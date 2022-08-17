import { useParams } from "react-router-dom";

function DocsFiles() {
    let { projectName } = useParams()


    return (<div>Docs Files + {projectName}
        <div className="
        ">

            <iframe src="https://scribehow.com/embed/Workflow__qdPR-aZfSN6Bd-im2bUeWQ" width="640" height="640" allowfullscreen frameborder="0"></iframe>
        </div>
    </div>);
}

export default DocsFiles;