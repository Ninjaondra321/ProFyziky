import { Helmet } from "react-helmet";


function Settings({ theme, setTheme, userAgreedToCookies, setUserAgreedToCookies }) {
    console.log("theme")
    console.log(theme)
    return (<div className="uk-container uk-container-small uk-position-relative">

        <h1 className="uk-heading-small">Nastavení</h1>

        <h2>Data</h2>
        <h3>Místní úložiště</h3>
        <div className="uk-margin">
            <button className="uk-button  uk-button-danger" style={{ color: "white" }}>Smazat včechny protokoly z tohoto počítače</button>
        </div>

        <div className="uk-margin">
            <button className="uk-button uk-button-danger" style={{ color: "white" }}>Smazat všechny elektrické obvody z tohoto počítače</button>
        </div>

        <h3>Cookies</h3>
        <div>
            <label><input class="uk-checkbox" type="checkbox" checked={false} disabled /> &nbsp; <b> Základní cookies</b> (aplikace místo nich využívá localhost)</label>
            <br />
            <label><input class="uk-checkbox" type="checkbox" value={userAgreedToCookies} onChange={(e) => setUserAgreedToCookies(e.target.checked)} /> &nbsp; <b>Statistické cookies</b> (sbírání dat pro vylepšení webu)</label>
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