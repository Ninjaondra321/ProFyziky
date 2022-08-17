function InitialSettings({ setUserAgreedToCookies }) {
    return (<div className="cookies-moje uk-card uk-card-default uk-card-body uk-flex" style={{ justifyContent: "space-between", background: "var(--background-color)" }}>
        <div className="left uk-flex" style={{ flexDirection: "column", flexWrap: "wrap" }}>
            <h1>Cookies</h1>
            <p>Svoji volbu budete moct  vždy změnit v nastavení. PS: moc mi pomůže, když budete souhlasit. Diky ;-)</p>

        </div>
        <div className="right uk-flex center" style={{ flexDirection: "column", }}>
            <button className="uk-button uk-button-primary " style={{ width: "100%" }} onClick={() => setUserAgreedToCookies(true)} >Ano, rád pomůžu</button>
            <button className="uk-button uk-button-default " style={{ width: "100%" }} onClick={() => setUserAgreedToCookies(false)} >Ne, třeba příště</button>
        </div>

    </div>);
}

export default InitialSettings;
