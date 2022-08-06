import { useParams, useNavigate, } from "react-router-dom";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

// KaTeX dependency
import katex from "katex";
import "katex/dist/katex.css";

// MathQuill dependency
import "../Components/jquery.js";
import "mathquill/build/mathquill.js";
import "mathquill/build/mathquill.css";

// mathquill4quill include
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";


import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { quillBetterTable } from "quill-better-table";

import gymzlLogo from "../Imgs/Logos/gymzl.jpg"


import ImageResize from 'quill-image-resize-module-react';






window.katex = katex;


Quill.register('modules/imageResize', ImageResize);






function ProtocolBuilder() {
    let { projectName } = useParams()

    const [isSaved, setIsSaved] = useState(true);

    // Metadata
    const [cisloCviceni, setCisloCviceni] = useState();
    const [fileName, setfileName] = useState();


    // Section: Hlava
    const [userName, setUserName] = useState();
    const [userColeague, setUserColeague] = useState();
    const [userClass, setUserClass] = useState();
    const [userDate, setUserDate] = useState('');

    // Section: Nadpis
    const [nadpis, setNadpis] = useState();
    const [nadNadpis, setNadNadpis] = useState();

    // Section: Pomůcky
    const [pomucky, setPomucky] = useState("");

    // Section: Hlavní část
    const [hlavniCast, setHlavniCast] = useState("");
    const hlavniCastQuill = useRef();

    const A4page = useRef()


    // Section: Závěr
    const [zaver, setZaver] = useState("");


    const [ActiveSection, setActiveSection] = useState("vzhled");

    const [mathQuillIsSetted, setMathQuillIsSetted] = useState(false);

    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });



    useEffect(() => {
        try {
            let protocols = JSON.parse(localStorage.getItem('ProFyziky-Protocols'))
            console.log(protocols)
            for (let protocol of protocols) {
                if (protocol.id == projectName) {
                    setfileName(protocol.fileName)

                    setUserName(protocol.name)
                    setUserColeague(protocol.coleague)
                    setUserClass(protocol.class)
                    setUserDate(protocol.date)

                    setNadNadpis(protocol.nadNadpis)
                    setNadpis(protocol.nadpis)

                    setPomucky(protocol.pomucky)

                    setHlavniCast(protocol.hlavniCast)

                    setZaver(protocol.zaver)

                    return
                }
            }

            let userInfo = JSON.parse(localStorage.getItem('ProFyziky-UserInfo'))

            console.log(userInfo)
            console.log(userInfo.FirstName)
            console.log(userInfo.Class)
            console.log(userInfo["FirstName"] + userInfo["LastName"])

            let n = askForProtocolNumber()

            let trida = userInfo.Class[0] + userInfo.Class[1]

            let date = new Date;
            protocols.push({
                id: projectName,
                dateOfCreation: "" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear(),
                fileName: userInfo.LastName.toUpperCase() + "_" + trida + "_LP" + n + userInfo.Class[-1],
                name: userInfo.FirstName + " " + userInfo.LastName,
                coleague: userInfo.Coworker,
                class: userInfo.Class,
                date: null,
                nadNadpis: null,
                nadpis: null,
                pomucky: null,
                hlavniCast: null,
                zaver: null,
            })

            localStorage.setItem('ProFyziky-Protocols', JSON.stringify(protocols))



        } catch (e) {
            console.error(e)

            let protocols = []
            let userInfo = JSON.parse(localStorage.getItem('ProFyziky-UserInfo'))

            let n = askForProtocolNumber()

            let trida = userInfo.Class[0] + userInfo.Class[1]
            console.warn(trida)

            let date = new Date;
            protocols.push({
                id: projectName,
                dateOfCreation: "" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear(),
                fileName: userInfo.LastName.toUpperCase() + "_" + trida + "_LP" + n,
                name: userInfo.FirstName + " " + userInfo.LastName,
                coleague: userInfo.Coworker,
                class: userInfo.Class,
                date: null,
                nadNadpis: null,
                nadpis: null,
                pomucky: null,
                hlavniCast: null,
                zaver: null,
            })

            localStorage.setItem('ProFyziky-Protocols', JSON.stringify(protocols))

        }

    }, []);

    const CUSTOM_OPERATORS = [
        ["\\pm", "\\pm"],
        ["\\doteq", "\\doteq"],
        ["\\sqrt{x}", "\\sqrt"],
        ["\\underline{x}", "\\underline"],
        ["\\overline{x}", "\\overline"],
        ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
        ["\\sqrt[n]{x}", "\\nthroot"],
        ["\\frac{x}{y}", "\\frac"],
        ["\\delta", "\\delta"],
        ["\\Delta", "\\Delta"],
        ["BOX", "\\fcolorbox{red}{aqua}"],
        ["x^{y}", "\\^{}"],
    ];

    useEffect(() => {


        try {

            enableMathQuillFormulaAuthoring(
                hlavniCastQuill.current.editor,
                { operators: CUSTOM_OPERATORS }
            );
            console.debug('Hotovooooo')

        } catch (e) {
            console.debug(e)


        }
    }, [hlavniCastQuill]);



    function askForProtocolNumber() {
        const protocolNumber = prompt('Kolikátá je to laboratorní práce? (viz Cvičení č.___)     PS: Z nějakého důvodu tohle okno vyskakuje dvakrát; odpovězte prosím strjně')
        console.info(protocolNumber)
        setCisloCviceni(protocolNumber)

        return protocolNumber
    }


    function save() {
        let protocols = JSON.parse(localStorage.getItem('ProFyziky-Protocols'))
        for (let i = 0; i < protocols.length; i++) {
            const protocol = protocols[i];

            if (protocol.id == projectName) {
                protocols.splice(i)
                break
            }
        }

        let date = new Date;
        protocols.push({
            id: projectName,
            dateOfCreation: "" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear(),
            fileName: fileName,
            name: userName,
            coleague: userColeague,
            class: userClass,
            date: userDate,
            nadNadpis: nadNadpis,
            nadpis: nadpis,
            pomucky: pomucky,
            hlavniCast: hlavniCast,
            zaver: zaver,
        })
        localStorage.setItem('ProFyziky-Protocols', JSON.stringify(protocols))
        setIsSaved(true)
        return



    }

    useEffect(() => {
        setIsSaved(false)
    }, [fileName, userName, userColeague, userClass, userDate, nadpis, nadNadpis, pomucky, hlavniCast, zaver]);

    function extendTextFromBadge(variable, setVariable, value) {
        let text = variable

        if (variable !== null) {


            // If there is a space in the end, remove it
            if (text[text.length - 1] == " ") {
                text = text.split(text.length - 1)[0]
            }

            if (text[text.length - 1] == "." || text.length == 0) {
                // Capitalize first letter of a value
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }

            setVariable(text + " " + value)
        } else {
            value = value.charAt(0).toUpperCase() + value.slice(1);

            setVariable(value)
        }

    }

    function zpracujDate(string) {
        // Example string: 2022-08-01
        let output = ""
        let parts = string.split('-')


        for (let part of parts.reverse()) {
            if (part[0] == "0") {
                part = part[1]
            }
            if (output !== "") {
                output += "."
            }
            output += part
        }
        return output
    }

    function download() {

        var printWindow = window.open('', '', 'popup=true');
        // printWindow.document.write('<html><head><title>' + fileName + '</title></head>');
        // printWindow.document.write('AHooooj');
        // printWindow.document.write('</html>');

        console.log(A4page.current.innerHTML)

        let html = A4page.current.innerHTML

        printWindow.document.write('<html><head><title>' + fileName + '</title></head>');
        printWindow.document.write(html);
        printWindow.document.write('</html>');


        printWindow.print();
        printWindow.document.close();


    }



    return (<div>
        {/* SubNavBar */}
        <div className="subnavbar">

            <div className="left">


                <div className="uk-inline">
                    <button className="uk-button uk-button-text" >File</button>
                    <div uk-dropdown="animation: slide-top; animate-out: true; duration: 700" style={{ background: "var(--background-color)" }}>
                        <ul className="uk-nav uk-dropdown-nav">
                            <li className="uk-nav-header">Stáhnout</li>
                            <li><a href="#">Stáhnout jako .png</a></li>
                            <li><a href="#">Stáhnout jako .jpeg</a></li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-nav-header">Integrace</li>
                            <li><a href="#">Použít v protokolu</a></li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-nav-header">Hovno</li>
                            <li><a href="#">Navždy smazat soubor</a></li>
                        </ul>
                    </div>

                    <div className="uk-inline">
                        <button className="uk-button uk-button-text" >View</button>
                        <div uk-dropdown="animation: slide-top; animate-out: true; duration: 700" style={{ background: "var(--background-color)" }}>
                            <ul className="uk-nav uk-dropdown-nav">
                                <li className="uk-nav-header">Pozadí</li>
                                <li><a href="#">Ani na to neklikej, stejnak to nefunguje...</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="uk-inline">
                        <button className="uk-button uk-button-text" >Help</button>
                        <div uk-dropdown="animation: slide-top; animate-out: true; duration: 700" style={{ background: "var(--background-color)" }}>
                            <ul className="uk-nav uk-dropdown-nav">
                                <li className="uk-nav-header">Pozadí</li>
                                <li><a href="#">To si jako fakt myslíš, že když nefunguje žádné z předchozích menu, tak tohle bude? -_-</a></li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>

            <div className="center">
                <input type="text" className="uk-input" style={{ padding: 0 }} defaultValue={fileName}
                    onBlur={(e) => { setfileName(e.target.value) }}
                    placeholder="Projekt bez názvu" />
                <p>.pdf</p>

            </div>
            <div className="right">
                {isSaved &&
                    <button onClick={() => save()} className="uk-button uk-button-default">Uloženo</button>

                }
                {!isSaved &&
                    <button
                        onClick={() => save()}
                        className="uk-button uk-button-primary">Uložit</button>
                }

            </div>
        </div>
        {/* END SubNavBar */}

        {/* Workspace */}
        <div className="protocols-workspace uk-flex center" style={{ marginLeft: 0, paddingTop: "50px" }} >

            <div className="left uk-padding"  >


                {/* Hlava section */}
                {ActiveSection == "hlava" &&

                    <div className="uk-animation-slide-left-medium">

                        <h1 className="uk-padding-small"> <span style={{ color: "gray" }}>Sekce:</span> Hlava</h1>
                        <div style={{ paddingLeft: "50px", }} >

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Pracoval(a)</label>
                                <input className="uk-input" type="text" placeholder="Vaše celé jméno" value={userName} onChange={e => setUserName(e.target.value)} />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Spolupracoval(a)</label>
                                <input className="uk-input" type="text" placeholder="Jméno vašeho spolupracujícího" value={userColeague} onChange={e => setUserColeague(e.target.value)} />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Třída, skupina</label>
                                <input className="uk-input" type="text" placeholder="např. 3A,A" value={userClass} onChange={e => setUserClass(e.target.value)} />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Datum</label>
                                <input className="uk-input" type="date" onChange={e => setUserDate(zpracujDate(e.target.value))} />
                            </div>
                        </div>
                        <div className="uk-padding-small"></div>

                        <div className="uk-margin uk-flex" style={{ flexDirection: "row-reverse" }}>
                            <button className="uk-button uk-button-primary" onClick={() => setActiveSection("nadpis")}>Pokračovat {"-->"} </button>
                        </div>


                    </div>
                }
                {/* END Hlava section */}


                {/* Napis section */}
                {ActiveSection == "nadpis" &&

                    <div className="uk-animation-slide-left-medium">

                        <h1 className="uk-padding-small"> <span style={{ color: "gray" }}>Sekce:</span> Nadpis</h1>
                        <div style={{ paddingLeft: "50px", }} >

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">NadNadpis</label>
                                <input className="uk-input" type="text" placeholder="Some text..." value={nadNadpis} onChange={e => setNadNadpis(e.target.value)} />
                                <div className="uk-margin">

                                    <div className="vyber-badges">
                                        <p>Návrhy:</p>
                                        {["Cvičení č." + cisloCviceni, "Cvičení číslo " + cisloCviceni,].map(value => <p key={value} onClick={() => setNadNadpis(value)} className="moje-badge" >{value}</p>)}
                                    </div>
                                </div>

                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Nadpis</label>
                                <input className="uk-input" type="text" placeholder="Nadpis protokolu" value={nadpis} onChange={e => setNadpis(e.target.value)} />
                            </div>
                        </div>
                        <div className="uk-padding-small"></div>

                        <div className=" uk-flex" style={{ justifyContent: "space-between", paddingLeft: "50px" }}>
                            <button className="uk-button uk-button-default" onClick={() => setActiveSection("hlava")}>{"<--"} Předchozí  </button>
                            <button className="uk-button uk-button-primary" onClick={() => setActiveSection("pomucky")}>Pokračovat {"-->"} </button>
                        </div>


                    </div>
                }
                {/* END Napis section */}

                {/* Pomůcky section */}
                {ActiveSection == "pomucky" &&
                    <div >

                        <h1 className="uk-padding-small uk-animation-slide-left-small"> <span style={{ color: "gray" }}>Sekce:</span> Pomůcky</h1>
                        <div style={{ paddingLeft: "50px", }} className="uk-animation-slide-left-medium" >

                            <div className="uk-margin">
                                <label className="uk-form-label" >Pomůcky</label>
                                <textarea className="uk-input" placeholder="Zde napište list věcí, které jste při LP použili" value={pomucky} onChange={(e) => setPomucky(e.target.value)} />
                            </div>
                            <div className="vyber-badges">
                                <p>Měřidla:</p>
                                {["délkové měřidlo", "stopky", "posuvné mikrometrické měřítko", "digitální váha", "mikrometrické měřidlo", "kalorimetr", "teploměr", "váhy", "siloměr", "voltmetr", "ampérmetr"].map(value => <p key={value} onClick={() => extendTextFromBadge(pomucky, setPomucky, value + ",")} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                <p>Elektronika:</p>
                                {["voltmetr", "ampérmetr", "žárovka", "motor", "rezistor", "cívka", "dioda", "vodič"].map(value => <p key={value} onClick={() => extendTextFromBadge(pomucky, setPomucky, value + ",")} style={{ background: "#44AF69" }} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                <p>Takový ty věci na pokusy:</p>
                                {["souprava pro tření", "teplá a studená voda", "led", "vozíček s pohonem", "kolejnice", "ocelový kvádr", "ocelový válec", "letecká guma"].map(value => <p key={value} onClick={() => extendTextFromBadge(pomucky, setPomucky, value + ",")} style={{ background: "#F9A03F" }} className="moje-badge" >{value}</p>)}
                            </div>
                        </div>
                        <div className="uk-padding-small"></div>

                        <div className=" uk-flex" style={{ justifyContent: "space-between", paddingLeft: "50px" }}>
                            <button className="uk-button uk-button-default" onClick={() => setActiveSection("nadpis")}>{"<--"} Předchozí  </button>
                            <button className="uk-button uk-button-primary" onClick={() => setActiveSection("hlavni-cast")}>Pokračovat {"-->"} </button>
                        </div>
                    </div>
                }
                {/* END Pomůcky section */}

                {/* Hlavní část section */}
                <div className={ActiveSection == "hlavni-cast" ? "" : "uk-hidden"} >


                    <div className={ActiveSection == "hlavni-cast" ? "uk-animation-slide-left-medium uk-animation-reversed" : "uk-animation-slide-left-medium"} >

                        <h1 className="uk-padding-small"> <span style={{ color: "gray" }}>Sekce:</span> Hlavní část</h1>
                        <div style={{ paddingLeft: "50px", }} >

                            <div className="uk-margin">

                                {/* <PakVymaz /> */}

                                {/* <Editor options={[["\\int^{s}_{x}{d}", "\\int"], ["\\binom{n}{k}", "\\binom"]]} key={JSON.stringify(null)} /> */}

                                <ReactQuill id="moje-react-quill" ref={hlavniCastQuill} theme="snow" defaultValue={hlavniCast} onChange={setHlavniCast}
                                    modules={{
                                        imageResize: {
                                            parchment: Quill.import('parchment'),
                                            modules: ['Resize', 'DisplaySize', 'Toolbar']

                                            // See optional "config" below
                                        },
                                        formula: true,

                                        toolbar: [
                                            [{ 'header': [2, 3, false] }],
                                            [{ "align": [false, 'center', 'right', 'justify'] }],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                            ['link', 'image'],
                                            ["formula"],
                                            ['clean']
                                        ],
                                    }}

                                />
                            </div>

                            <div className="uk-padding"></div>

                            <div className="  uk-child-width-1-5@m" uk-grid="">

                                <div className="uk-card-body uk-card uk-card-hover">
                                    <h1>T</h1>
                                    <h3>LaTeX</h3>
                                </div>
                                <div className="uk-card-body uk-card uk-card-hover">
                                    <h1>T</h1>
                                    <h3>Graf</h3>
                                </div>
                                <div className="uk-card-body uk-card uk-card-hover">
                                    <h1>T</h1>
                                    <h3>Schéma</h3>
                                </div>
                                <div className="uk-card-body uk-card uk-card-hover">
                                    <h1>T</h1>
                                    <h3>Data</h3>
                                </div>
                            </div>
                        </div>
                        <div className="uk-padding-small"></div>

                        <div className=" uk-flex" style={{ justifyContent: "space-between", paddingLeft: "50px" }}>
                            <button className="uk-button uk-button-default" onClick={() => setActiveSection("pomucky")}>{"<--"} Předchozí  </button>
                            <button className="uk-button uk-button-primary" onClick={() => setActiveSection("zaver")}>Pokračovat {"-->"} </button>
                        </div>
                    </div>
                </div>


                {/* END Hlavní část section */}

                {/* Závěr section */}
                {ActiveSection == "zaver" &&

                    <div className="uk-animation-slide-left-medium">

                        <h1 className="uk-padding-small"> <span style={{ color: "gray" }}>Sekce:</span> Závěr</h1>
                        <div style={{ paddingLeft: "50px", }} >
                            <div className="uk-margin">
                                <label className="uk-form-label" >Závěr</label>
                                <textarea className="uk-input" placeholder="Zde napište list věcí, které jste při LP použili" value={zaver} onChange={(e) => setZaver(e.target.value)} />
                            </div>
                            <div className="vyber-badges">
                                {["Cílem laboratorní práce bylo", "V této laboratorní práci jsme"].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["naučit se", "ověřit", "prokázat", "potvrdit", "určit", "změřit",].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} style={{ background: "#44AF69" }} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["určovali jsme", "měřili jsme", "určovali jsme",].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} style={{ background: "#F9A03F" }} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["relativní odchylka", "průměrná hodnota", "velikost naměřené hodnoty", "tabulková hodnota"].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["je přímo úměrná", "je podstatně nižší", "je menší ", "je výrazně větší "].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} style={{ background: "#44AF69" }} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["došli jsme k závěru, že", "což dokazuje ", "tyto hodnoty vypovídají o ",].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} style={{ background: "#F9A03F" }} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["odchylka byla větší, a to převážně z důvodu ručního měření.", "realativní odchylka se  ", "tyto hodnoty vypovídají o ",].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} className="moje-badge" >{value}</p>)}
                            </div>


                            <div className="uk-padding-small"></div>





                        </div>


                        <div className="uk-padding-small"></div>

                        <div className=" uk-flex" style={{ justifyContent: "space-between", paddingLeft: "50px" }}>
                            <button className="uk-button uk-button-default" onClick={() => setActiveSection("hlavni-cast")}>{"<--"} Předchozí  </button>
                            <button className="uk-button uk-button-primary" onClick={() => setActiveSection("vzhled")}>Pokračovat {"-->"} </button>
                        </div>


                    </div>
                }

                {/* END Závěr section */}

                {/* Vzhled section */}
                {ActiveSection == "vzhled" &&

                    <div className="uk-animation-slide-left-medium">

                        <h1 className="uk-padding-small"> Vzhled</h1>

                        <div style={{ paddingLeft: "50px", }} >

                            <div className="uk-margin uk-flex">
                                <h4>Přednachystané vzhledy&nbsp;&nbsp;</h4>
                                <div uk-form-custom="target: > * > span:first-child">
                                    <select>
                                        <option value="times">Times</option>
                                        <option value="google">Google</option>
                                        <option value="microsoft">Microsoft</option>
                                        <option value="vlastni">Vlastní</option>

                                    </select>
                                    <button className="uk-button uk-button-default" type="button" tabindex="-1">
                                        <span></span>
                                        <span uk-icon="icon: chevron-down"></span>
                                    </button>
                                </div>

                            </div>
                            <h2>Nadpisy</h2>
                            <div className="uk-margin">
                                <div uk-form-custom="target: > * > span:first-child">
                                    <label>Font: </label>
                                    <select>
                                        <option value="times">Times</option>
                                        <option value="google">Google</option>
                                        <option value="microsoft">Microsoft</option>
                                        <option value="vlastni">Vlastní</option>
                                    </select>

                                    <button className="uk-button uk-button-default" type="button" tabindex="-1">
                                        <span></span>
                                        <span uk-icon="icon: chevron-down"></span>
                                    </button>

                                </div>
                                <input type="number" className="uk-input" />
                                <input type="color" className="uk-input" />

                                <div className="uk-margin uk-flex">
                                    <div>
                                        <input type="radio" id="ahoj" name="textDecoration" value="ahoj" />
                                        <label htmlFor="ahoj" style={{ textDecoration: "underline" }} >Podtrženo</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="id159" name="textDecoration" value="ahoj" />
                                        <label htmlFor="id159" style={{ fontWeight: "bold" }} >Sečteno</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="id465645" name="textDecoration" value="ahoj" />
                                        <label htmlFor="id465645" style={{ fontStyle: "italic" }} >Jarka si vyvařila</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="id7895" name="textDecoration" value="ahoj" />
                                        <label htmlFor="id7895" >15 bodů</label>
                                    </div>
                                </div>

                                <div className="uk-margin">
                                    <label >Padding</label>
                                    <div className="uk-margin uk-flex">
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: arrow-left"></span>
                                            <input className="uk-input" type="number" />
                                        </div>
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: arrow-right"></span>
                                            <input className="uk-input" type="number" />
                                        </div>
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: arrow-up"></span>
                                            <input className="uk-input" type="number" />
                                        </div>
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: arrow-down"></span>
                                            <input className="uk-input" type="number" />
                                        </div>
                                    </div>

                                </div>

                                <h3>Heading 1</h3>





                            </div>




                        </div>


                        <div className="uk-padding-small"></div>

                        <div className=" uk-flex" style={{ justifyContent: "space-between", paddingLeft: "50px" }}>
                            <button className="uk-button uk-button-default" onClick={() => setActiveSection("zaver")}>{"<--"} Předchozí  </button>
                            <button className="uk-button uk-button-danger" onClick={() => download()}>Stáhnout PDF</button>
                        </div>


                    </div>
                }
                {/* END Vzhled section */}

            </div>


            <div className="right uk-padding uk-visible@m uk-light " >

                <div ref={A4page} className="A4 uk-box-shadow-xlarge">

                    <div className="okno-parent center">

                        <div className="container header">
                            <div className="logo"><img src={gymzlLogo} alt="Logo se nenačetlo" />
                            </div>
                            <div className="pracoval"> <p>Pracoval(a):</p> </div>
                            <div className="jmeno"><p>{userName}</p> </div>
                            <div className="kolega"><p>{userColeague}</p> </div>
                            <div className="spolupracoval"><p>Spolupracoval(a):</p> </div>
                            <div className="datum"><p>Datum:</p> </div>
                            <div className="trida-skupina"><p>Třída, skupina:</p> </div>
                            <div className="datumm"><p>{userDate}</p> </div>
                            <div className="trida-skupinaa"><p>{userClass}</p> </div>
                        </div>
                        <div className={(ActiveSection != "hlava") && "okno"} onClick={() => setActiveSection('hlava')} ></div>
                    </div>

                    <div className="okno-parent">
                        <div><div className="center">

                            {nadNadpis ?
                                <h3>{nadNadpis}</h3>
                                :
                                <h3 style={{ color: "#999999" }}>Cvičení č.__</h3>
                            }
                        </div>
                            <div className="center">
                                {nadpis ?
                                    <h1>{nadpis}</h1>
                                    :
                                    <h1 style={{ color: "#999999" }}>Nadpis</h1>
                                }
                            </div>
                        </div>

                        <div className={(ActiveSection != "nadpis") && "okno"} onClick={() => setActiveSection('nadpis')} ></div>
                    </div>


                    <div className="okno-parent">
                        <div>
                            <h2>Pomůcky</h2>
                            {pomucky ?
                                <p>{pomucky}</p>
                                :
                                <p style={{ color: "#999999" }}>
                                    Vývar z hladových opic, kuřecí řízek z mladého býčka, kyselina pentahydrogenfluorovodíková, medvědí česnek a 3,245 špetky lásky
                                </p>
                            }

                        </div>
                        <div className={(ActiveSection != "pomucky") && "okno"} onClick={() => setActiveSection('pomucky')} ></div>

                    </div>

                    <div className="okno-parent">
                        {/* <ReactQuill theme="bubble" value={hlavniCast} onChange={setQuillValue01} /> */}
                        {hlavniCast ?
                            <div className="content" dangerouslySetInnerHTML={{ __html: hlavniCast }}></div>
                            :
                            <div style={{ color: "#999999" }}>
                                <h2>Nadpis</h2>
                                <p>Text</p>
                            </div>

                        }


                        <div className={(ActiveSection != "hlavni-cast") && "okno"} onClick={() => setActiveSection('hlavni-cast')} ></div>

                    </div>

                    <div className="okno-parent">
                        <div>
                            <h2>Závěr</h2>
                            <p>{zaver}</p>

                        </div>
                        <div className={(ActiveSection != "zaver") && "okno"} onClick={() => setActiveSection('zaver')} ></div>

                    </div>





                </div>

            </div>

        </div>
        {/* END Workspace */}


        <Helmet>
            <title>ProFyziky | Tvorba el. schémat</title>



        </Helmet>


    </div >);
}

export default ProtocolBuilder;