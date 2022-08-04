import { Helmet } from "react-helmet";
import { useEffect, useRef, useState, useMemo } from 'react';

function Homepage() {

    const startX = useRef();
    const circuitField = useRef();
    const protocol01Field = useRef();

    // var circuitFieldWidth = 100 // Number between 0-100 (%)

    const [CircuitStyle, setCircuitStyle] = useState();
    const [CitcuitParentStyle, setCitcuitParentStyle] = useState();
    const [protocol01Style, setProtocol01Style] = useState();
    const [dataStyle, setdataStyle] = useState();
    const [dataTileStyle, setDataTileStyle] = useState();



    const scrollHandler = _ => {
        let startPosition = -1 * startX.current.getBoundingClientRect().y + 80
        let windowHeight = window.innerHeight
        let windowWidth = window.innerWidth

        let offsetOnStart = 150



        setProtocol01Style({ width: "100%", height: "calc(100vh - 80px)", background: "", zIndex: -1 })

        setdataStyle({ display: "none", zIndex: -999 })



        setCircuitStyle({ background: "purple", width: 100 + "vw", height: "calc(" + 100 + "vh - 80px)" })
        setCitcuitParentStyle({ position: "absolute", left: "0", width: "100%", height: "calc(100vh - 80px)" })


        // Před
        if (0 < startPosition && startPosition < 0 + offsetOnStart) {
            setCircuitStyle({ background: "purple", width: 100 + "vw", height: "calc(" + 100 + "vh - 80px)" })
            setCitcuitParentStyle({ position: "fixed", left: "0", right: "0", top: "80px", width: "100%", height: "calc(100vh - 80px)" })


        }
        // Obraz 01 - CIRCUITS
        else if (offsetOnStart < startPosition) {
            let vysledek = 100 - ((startPosition - offsetOnStart) ** 2 / windowHeight ** 2 * 100)
            console.log(vysledek)
            setCitcuitParentStyle({ position: "fixed", top: 80, left: "0", right: "0", width: "100%", height: "calc(100vh - 80px)" })



            if (35 < vysledek && vysledek <= 100) {
                setCircuitStyle({ background: "purple", width: vysledek + "vw", height: "calc(" + vysledek + "vh - 80px)" })
                setProtocol01Style({ width: "100%", height: "calc(100vh - 80px)", position: "fixed", left: 0, top: 80 + vysledek, background: "pink", zIndex: -1 })
            } else {
                setCircuitStyle({ background: "purple", width: 35 + "vw", height: "calc(" + 35 + "vh - 80px)" })
            }

            if (0 < vysledek && vysledek < 100) {
                setProtocol01Style({ width: "100%", height: "calc(100vh - 80px)", position: "fixed", left: 0, top: 80 + vysledek, background: "pink", zIndex: -1 })
            } else {
                setProtocol01Style({ width: "100%", height: "calc(100vh - 80px)", position: "fixed", left: 0, top: 80, background: "pink", zIndex: -1 })

            }

            vysledek += 100

            vysledek = 100 - ((startPosition - offsetOnStart * 2) ** 2 / windowHeight ** 2 * 100)

            let distanceScrolled = -1 * vysledek * 2.5

            console.warn(distanceScrolled)

            // TODO: Tady jsem to zakomentoval abych nemusel resit commit issues, ale pls jeste si s tim pohraj. Díky ;-) - Ondra z minulosti 

            // if ( 0 < distanceScrolled && distanceScrolled < ) {

            if (distanceScrolled < windowWidth) {
                setProtocol01Style({ width: "100%", height: "calc(100vh - 80px)", position: "fixed", left: -1 * distanceScrolled, top: 80, background: "pink", zIndex: -1 })
                setCitcuitParentStyle({ position: "fixed", top: 80, left: -1 * distanceScrolled, right: "0", width: "100%", height: "calc(100vh - 80px)" })

                setdataStyle({ position: "fixed", background: "yellow", top: 80, left: windowWidth + (-1 * distanceScrolled), right: "0", width: "100%", height: "calc(100vh - 80px)" })
            } else {
                setProtocol01Style({ width: "100%", height: "calc(100vh - 80px)", position: "fixed", left: - 1 * windowWidth, top: 80, background: "pink", zIndex: -1 })
                setCitcuitParentStyle({ position: "fixed", top: 80, left: -1 * windowWidth, right: "0", width: "100%", height: "calc(100vh - 80px)" })
                setdataStyle({ position: "fixed", background: "yellow", top: 80, left: 0, right: "0", width: "100%", height: "calc(100vh - 80px)" })
            }
            // }


        }




    };

    // useEffect(() => {
    //     setCircuitStyle({ background: "purple", width: circuitFieldWidth + "vw", height: "calc(" + circuitFieldWidth + "vh - 80px)" })
    // }, [circuitFieldWidth]);


    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);




    return (<div style={{ overflowX: "hidden" }}>
        <div className="uk-position-relative uk-container">
            <div className="uk-position-relative uk-container">
                <h1 className="uk-heading-large">ProFyziky</h1>
                <h3>Jedinná stránka, kterou správný fyzik potřebuje</h3>

                <div className="uk-childer-width-1-3@s uk-grid" uk-grid="">
                    <div className="uk-margin uk-padding">
                        <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-margin">
                            <img src="/nazorny_obvod.png" alt="s" />
                            <h2>Elektrická schémata</h2>
                        </div>
                    </div>
                    <div className="uk-margin uk-padding">
                        <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-margin">
                            <img src="/nazorny_obvod.png" alt="s" />
                            <h2>Protokoly</h2>
                        </div>
                    </div>
                    <div className="uk-margin uk-padding">
                        <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-margin">
                            <img src="/nazorny_obvod.png" alt="s" />
                            <h2>Data</h2>
                        </div>
                    </div>


                </div>
            </div>


            <h1 style={{ paddingBottom: "25px" }}>Taková menší ukázka
                {/* {["<3", ":)"][Math.round(Math.random())]} */}
                {" <3"}
                {/* {":)"} */}

            </h1>



        </div>

        <div className="homepage-start-y" ref={startX}></div>

        <div className="center" style={CitcuitParentStyle} >
            <div ref={circuitField} className="homepage-circuits" style={CircuitStyle} >
                <h1>Ahhiashdio</h1>
                <h1>Circuit</h1>
            </div>
        </div>



        <div className="homepage-protocol-01" ref={protocol01Field} style={protocol01Style}>
            assad
        </div>

        <div className="homepage-data" style={dataStyle}  >
            <h1>Dataa</h1>
            <div className="homepage-data-tile" style={dataTileStyle}>

            </div>

        </div>

        {/* </div>
        <div className="homepage-protocol-02" ref={protocol01Field} style={{ width: "100%", height: "calc(100vh - 80px)", background: "green", zIndex: -999 }} uk-sticky=" offset: 80" > </div> */}


        <div style={{ height: "100vh" }}></div>
        <div style={{ height: "100vh" }}></div>
        <div style={{ height: "100vh" }}></div>
        <div style={{ height: "100vh" }}></div>
        <div style={{ height: "100vh" }}></div>
        <div style={{ height: "100vh" }}></div>



        <Helmet>
            <title>ProFyziky</title>
        </Helmet>
    </div >);
}

export default Homepage;