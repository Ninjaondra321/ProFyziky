import { Helmet } from "react-helmet";
import { useEffect, useRef, useState, useMemo } from 'react';

function Homepage() {

    const startX = useRef();
    const circuitField = useRef();
    const protocol01Field = useRef();

    // var circuitFieldWidth = 100 // Number between 0-100 (%)
    const [circuitFieldWidth, setCircuitFieldWidth] = useState(100);

    const scrollHandler = _ => {
        let startPosition = -1 * startX.current.getBoundingClientRect().y + 80

        let windowHeight = window.innerHeight

        console.log(startPosition)

        let offsetOnStart = 150
        setCircuitFieldWidth(100)


        // Před
        if (startPosition < 0 + offsetOnStart) {
            setCircuitFieldWidth(100)
        }
        // Obraz 01 - CIRCUITS
        else if (windowHeight * 0 + offsetOnStart < startPosition && startPosition < windowHeight * 1) {
            // let vysledek = 100 - ((startPosition - offsetOnStart) / (windowHeight) * 100) // Tohle funguje, ale je to linearní, takže nic extra
            let vysledek = 100 - ((startPosition - offsetOnStart) ** 2 / windowHeight ** 2 * 100)
            // let vysledek = 100 - ((startPosition - offsetOnStart) ** 3 / windowHeight ** 3 * 100)

            console.warn(vysledek)
            if (0 < vysledek <= 100) {
                setCircuitFieldWidth(vysledek)
            } else if (100 < vysledek) {
                setCircuitFieldWidth(100)
            }
            console.warn(circuitFieldWidth)
        }
        //  Obraz 02 - PROTOKOLY
        else if (windowHeight * 1 < startPosition < windowHeight * 2) {

            // setCircuitFieldWidth(15)


        }



        // if (circuitFieldY > windowHeight - 100) {
        //     setCircuitFieldWidth("100")

        // } else if (circuitFieldY < windowHeight) {
        //     console.log('setting circuid field width')
        //     console.log(circuitFieldY / window.innerHeight)
        //     setCircuitFieldWidth(circuitFieldY / (window.innerHeight - 100) * 100)
        // }
    };


    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);




    return (<div>
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
                {/* <!-- &lt;3 --> */}
                {":)"}

            </h1>



        </div>

        <div className="homepage-start-y" ref={startX}></div>

        <div className="center" style={{ width: "100vw", height: "calc(100vh - 80px)" }} uk-sticky="end: .homepage-protocol-01 ; offset: 80">
            <div ref={circuitField} className="homepage-circuits" style={{ background: "purple", width: circuitFieldWidth + "vw", height: "calc(" + circuitFieldWidth + "vh - 80px)" }} >
                <h1>Ahhiashdio</h1>
                <h1>Circuit</h1>
            </div>
        </div>


        <div className="homepage-protocol-01" uk-sticky="end: .homepage-protocol-02 ; offset: 80" ref={protocol01Field} style={{ width: "100vw", height: "calc(100vh - 80px)", background: "blue" }}>

        </div>

        <div className="homepage-data" style={{ width: "100vw", height: "calc(100vh - 80px)", background: "yellow" }}>

        </div>
        <div className="homepage-protocol-02" ref={protocol01Field} style={{ width: "100vw", height: "calc(100vh - 80px)", background: "green" }}> </div>


        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>




        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>
        <div className="uk-padding"></div>


        <Helmet>
            <title>ProFyziky</title>
        </Helmet>
    </div >);
}

export default Homepage;