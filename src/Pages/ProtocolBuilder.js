import { useParams, useNavigate, } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { quillBetterTable } from "quill-better-table";

import gymzlLogo from "../Imgs/Logos/gymzl.jpg"



function ProtocolBuilder() {
    let { projectName } = useParams()

    const [isSaved, setIsSaved] = useState(true);

    // Metadata
    const [cisloCviceni, setCisloCviceni] = useState();
    const [Title, setTitle] = useState();

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

    // Section: Závěr
    const [zaver, setZaver] = useState("");

    const [quillValue, setQuillValue] = useState("");
    const [quillValue01, setQuillValue01] = useState("");

    const [ActiveSection, setActiveSection] = useState("pomucky");


    useEffect(() => {

        try {
            let userInfo = JSON.parse(localStorage.getItem('ProFyziky-UserInfo'))

            setUserName(userInfo.Name)
            setUserClass(userInfo.Class)
            setUserColeague(userInfo.Coworker)


        } catch {
            console.log("problém...")
        }
    }, []);








    useEffect(() => {
        // let p = JSON.parse(localStorage.getItem('ProFyziky-Protocolos'))

        // for (let protocol of p) {
        //     if (protocol.id == projectName) {

        //     }
        // }

    }, []);





    function extendTextFromBadge(variable, setVariable, value) {
        let text = variable

        // If there is a space in the end, remove it
        if (text[text.length - 1] == " ") {
            text = text.split(text.length - 1)[0]
        }

        if (text[text.length - 1] == "." || text.length == 0) {
            // Capitalize first letter of a value
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        setVariable(text + " " + value)

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
                <input type="text" className="uk-input" style={{ padding: 0 }} defaultValue={Title}
                    // onBlur={(e) => { saveTitle(e.target.value) }} 
                    placeholder="Projekt bez názvu" />
                <p>.pdf</p>

            </div>
            <div className="right">
                {isSaved &&
                    <button className="uk-button uk-button-default">Uloženo</button>
                }
                {!isSaved &&
                    <button
                        // onClick={() => saveStage()}
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
                                <label className="uk-form-label" for="form-stacked-text">Pracoval(a)</label>
                                <input className="uk-input" type="text" placeholder="Vaše celé jméno" value={userName} onChange={e => setUserName(e.target.value)} />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-stacked-text">Spolupracoval(a)</label>
                                <input className="uk-input" type="text" placeholder="Jméno vašeho spolupracujícího" value={userColeague} onChange={e => setUserColeague(e.target.value)} />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-stacked-text">Třída, skupina</label>
                                <input className="uk-input" type="text" placeholder="3A,A" value={userClass} onChange={e => setUserClass(e.target.value)} />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-stacked-text">Datum</label>
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
                                <label className="uk-form-label" for="form-stacked-text">NadNadpis</label>
                                <input className="uk-input" type="text" placeholder="Some text..." value={nadNadpis} onChange={e => setNadNadpis(e.target.value)} />
                                <div className="uk-margin">

                                    <div className="vyber-badges">
                                        <p>Návrhy:</p>
                                        {["Cvičení č." + cisloCviceni, "Cvičení číslo " + cisloCviceni,].map(value => <p key={value} onClick={() => setNadNadpis(value)} className="moje-badge" >{value}</p>)}
                                    </div>
                                </div>

                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-stacked-text">Nadpis</label>
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
                                {["souprava pro tření", "teplá a studená voda", "led", "vozíček s pohonem", "kolejnice", "ocelový kvádr", "ocelový kvádr", "ocelový válec", "letecká guma"].map(value => <p key={value} onClick={() => extendTextFromBadge(pomucky, setPomucky, value + ",")} style={{ background: "#F9A03F" }} className="moje-badge" >{value}</p>)}
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
                {ActiveSection == "hlavni-cast" &&

                    <div className="uk-animation-slide-left-medium" >

                        <h1 className="uk-padding-small"> <span style={{ color: "gray" }}>Sekce:</span> Hlavní část</h1>
                        <div style={{ paddingLeft: "50px", }} >

                            <div className="uk-margin">
                                <ReactQuill theme="snow" defaultValue={hlavniCast} onChange={setHlavniCast}
                                    modules={
                                        {
                                            toolbar: [
                                                [{ 'header': [2, 3, false] }],
                                                [{ "align": [false, 'center', 'right', 'justify'] }],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link', 'image'],
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
                }

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
                                <p>Měřidla:</p>
                                {["délkové měřidlo", "stopky", "posuvné mikrometrické měřítko", "digitální váha", "mikrometrické měřidlo", "kalorimetr", "teploměr", "váhy", "siloměr", "voltmetr", "ampérmetr"].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                {["voltmetr", "ampérmetr", "žárovka", "motor", "rezistor", "cívka", "dioda", "vodič"].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} style={{ background: "#44AF69" }} className="moje-badge" >{value}</p>)}
                            </div>
                            <div className="vyber-badges">
                                <p>Takový ty věci na pokusy:</p>
                                {["souprava pro tření", "teplá a studená voda", "led", "vozíček s pohonem", "kolejnice", "ocelový kvádr", "ocelový kvádr", "ocelový válec", "letecká guma"].map(value => <p key={value} onClick={() => extendTextFromBadge(zaver, setZaver, value)} style={{ background: "#F9A03F" }} className="moje-badge" >{value}</p>)}
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
                            <div className="uk-margin">
                                <h1>Nadpisy</h1>

                            </div>




                        </div>


                        <div className="uk-padding-small"></div>

                        <div className=" uk-flex" style={{ justifyContent: "space-between", paddingLeft: "50px" }}>
                            <button className="uk-button uk-button-default" onClick={() => setActiveSection("zaver")}>{"<--"} Předchozí  </button>
                            <button className="uk-button uk-button-danger" onClick={() => console.log('Stahujte TEĎ.')}>Stáhnout PDF</button>
                        </div>


                    </div>
                }

                {/* END Vzhled section */}

            </div>


            <div className="right uk-padding uk-visible@m uk-light " >

                <div className="A4 uk-box-shadow-xlarge">

                    <div className="okno-parent center">

                        <div class="container header">
                            <div class="logo"><img src={gymzlLogo} alt="Logo se nenačetlo" />
                            </div>
                            <div class="pracoval"> <p>Pracoval(a):</p> </div>
                            <div class="jmeno"><p>{userName}</p> </div>
                            <div class="kolega"><p>{userColeague}</p> </div>
                            <div class="spolupracoval"><p>Spolupracoval(a):</p> </div>
                            <div class="datum"><p>Datum:</p> </div>
                            <div class="trida-skupina"><p>Třída, skupina:</p> </div>
                            <div class="datumm"><p>{userDate}</p> </div>
                            <div class="trida-skupinaa"><p>{userClass}</p> </div>
                        </div>
                        <div className={(ActiveSection != "hlava") && "okno"} onClick={() => setActiveSection('hlava')} ></div>
                    </div>
                    {/* 

                    <div className="okno-parent">
                        <ReactQuill theme="bubble" value={quillValue} onChange={setQuillValue}
                        />
                        <div className={(ActiveSection != "hlava") && "okno"} onClick={() => setActiveSection('hlava')} ></div>
                    </div> */}

                    <div className="okno-parent">
                        <div>
                            <div className="center"><h3>{nadNadpis}</h3></div>
                            <div className="center"><h1>{nadpis}</h1></div>
                        </div>

                        <div className={(ActiveSection != "nadpis") && "okno"} onClick={() => setActiveSection('nadpis')} ></div>
                    </div>


                    {/* <div className="okno-parent">
                        <ReactQuill theme="bubble" defaultValue={quillValue} onChange={setQuillValue}
                            modules={
                                {
                                    toolbar: [
                                        [{ 'header': [1, 2, false] }],
                                        [{ "align": ['right', 'center', 'right', 'justify'] }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                }}

                        />
                        <div className={(ActiveSection != "nadpis") && "okno"} onClick={() => setActiveSection('nadpis')} ></div>

                    </div> */}

                    <div className="okno-parent">
                        <div>
                            <h2>Pomůcky</h2>
                            <p>{pomucky}</p>
                        </div>
                        <div className={(ActiveSection != "pomucky") && "okno"} onClick={() => setActiveSection('pomucky')} ></div>

                    </div>

                    <div className="okno-parent">
                        {/* <ReactQuill theme="bubble" value={hlavniCast} onChange={setQuillValue01} /> */}
                        <div className="content" dangerouslySetInnerHTML={{ __html: hlavniCast }}></div>


                        <div className={(ActiveSection != "hlavni-cast") && "okno"} onClick={() => setActiveSection('hlavni-cast')} ></div>

                    </div>

                    <div className="okno-parent">
                        <div>
                            <h2>Závěr</h2>
                            <p>{zaver}</p>

                        </div>
                        <div className={(ActiveSection != "zaver") && "okno"} onClick={() => setActiveSection('zaver')} ></div>

                    </div>

                    {/* <div className="test">
                        <ReactQuill defaultValue={PakVymazz} onChange={setPakVymazz}>
                            <div className="my-editing-area" />
                        </ReactQuill>


                    </div> */}

                    {/* 

                    <ReactQuill className="moje-rich-text-editor A4" theme="bubble" value={quillValue} onChange={(e) => setQuillValue(e)}

                    /> */}





                </div>

            </div>

        </div>
        {/* END Workspace */}


        <Helmet>
            <title>ProFyziky | Tvorba el. schémat</title>

            {/* <script type="text/javascript">
                {`
                window.addEventListener('beforeunload', function (e) {
                    e.preventDefault();
                    e.returnValue = '';
                });
                
                `}
            </script> */}

        </Helmet>


    </div >);
}

export default ProtocolBuilder;