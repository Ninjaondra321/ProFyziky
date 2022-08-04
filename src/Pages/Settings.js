import { Helmet } from "react-helmet";


function Settings({ theme, setTheme, userAgreedToCookies, setUserAgreedToCookies }) {


    function deleteSomething(type) {
        switch (type) {
            case "protocols":
                localStorage.setItem('ProFyziky-Protocols', [])
                break;
            case "circuits":
                localStorage.setItem('ProFyziky-Circuits', [])
                break;
            case "data":
                localStorage.setItem('ProFyziky-Data', [])
                break;

            default:
                break;
        }
    }

    return (<div className="uk-container uk-container-small uk-position-relative">

        <h1 className="uk-heading-small">Nastavení</h1>

        <h2>Data</h2>
        <h3>Místní úložiště</h3>
        <div className="uk-margin">
            <button className="uk-button  uk-button-danger uk-width-full" style={{ color: "white" }} onClick={() => deleteSomething('protocols')} >Smazat včechny protokoly z tohoto počítače</button>
        </div>

        <div className="uk-margin">
            <button className="uk-button uk-button-danger uk-width-full" style={{ color: "white" }} onClick={() => deleteSomething('circuits')} >Smazat všechny elektrické obvody z tohoto počítače</button>
        </div>

        <div className="uk-margin">
            <button className="uk-button uk-button-danger uk-width-full" style={{ color: "white" }} onClick={() => deleteSomething('data')} >Smazat všechna políčka s daty z tohoto počítače</button>
        </div>

        <h3>Cookies</h3>
        <div>
            <label><input class="uk-checkbox" type="checkbox" checked={false} disabled /> &nbsp; <b> Základní cookies</b> (aplikace místo nich využívá localhost)</label>
            <br />
            <label><input class="uk-checkbox" type="checkbox" checked={userAgreedToCookies} onChange={(e) => setUserAgreedToCookies(e.target.checked)} /> &nbsp; <b>Statistické cookies</b> (sbírání dat pro vylepšení webu)</label>
            <br />
            <label><input class="uk-checkbox" type="checkbox" checked={false} disabled /> &nbsp;<b>Marketingové cookies</b> (aplikace reklamy nezobrazuje)</label>
            <br />

        </div>




        <h2>Přizpůsobení</h2>
        <div class="uk-margin">
            <div uk-form-custom="target: > * > span:first-child">

                <select onChange={(e) => setTheme(e.target.value)}>
                    <option value="light" selected={theme === "light"}>Světlé</option>
                    <option value="dark" selected={theme === "dark"}>Tmavé</option>


                </select>

                {/* Select tag, that wen you click on it, it outputs it's value  */}
                {/* <select onChange={(e) => setTheme(e.target.value)}> */}

                <button class="uk-button uk-button-default" type="button" tabindex="-1">
                    <span></span>
                    <span uk-icon="icon: chevron-down"></span>
                </button>
            </div>
        </div>





        <Helmet>
            <title>ProFyziky | Nastavení</title>
        </Helmet>
    </div>);
}

export default Settings;