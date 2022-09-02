import { useEffect, useState } from "react";

function Average({ values, createData, deleteTile, setTiles, tiles, tileContent, tileID, setFullscreenID, fullscreenID, setIsSaved }) {
    // Tady je tileContent jenom string s hodnotou valueID


    const [valueID, setValueID] = useState();
    const [hodnoty, setHodnoty] = useState();

    const [title, setTitle] = useState();

    const [isOK, setIsOK] = useState(false);

    const [prvniRadek, setPrvniRadek] = useState();
    const [druhyRadek, setDruhyRadek] = useState();
    const [tretiRadek, setTretiRadek] = useState();
    const [ctvrtyRadek, setCtvrtyRadek] = useState();

    const [htmlData, sethtmlData] = useState('<p>Hello World</p>');

    useEffect(() => {
        // Convert all values to numbers
        let output = [];

        for (let i = 0; i < values.length; i++) {
            output[i] = values[i]
            let cisla = []

            for (let j = 0; j < values[i].values.length; j++) {
                cisla.push(Number(values[i].values[j]))
            }
            output[i].values = cisla
        }
        values = output;
    }, [values]);


    useEffect(() => {
        if (tileContent) {
            setValueID(tileContent.valueID)
            setTitle(tileContent.title)
        }
    }, []);

    function naJednoPlatne(cislo) {

        try {
            cislo = parseFloat(cislo)
            if (Math.floor(cislo) != 0) {
                let last = undefined
                let cisloReversedString = ("" + cislo.toFixed(0)).split("").reverse().join("")
                for (let i = 0; i < ("" + cislo.toFixed(0)).length; i++) {
                    const cislice = cisloReversedString[i];
                    if (cislice != 0) {
                        last = [cislice, i, "cele"]
                    }
                }
                return last
            } else {
                let desetiny = ("" + cislo).split('.')[1]
                for (let i = 0; i < desetiny.length; i++) {
                    const cislice = desetiny[i];
                    if (cislice != 0) {
                        return ["0." + "0".repeat(i) + cislice, i, "desetine"]
                    }

                }

            }
        } catch (e) {
            console.log(e)
            return [0, 0, "cele"]
        }
    }


    function zaokrouhli(cislo, position, type) {
        if (type == "cele") {
            return Math.round(cislo / 10 ** position) * 10 ** position
        } else {
            return cislo.toFixed(position + 1)
        }
    }




    useEffect(() => {
        try {

            for (let value of values) {
                if (value.id == valueID) {

                    console.log(value.values)



                    let prumer = value.values.reduce((a, b) => a + b, 0) / value.values.length.toFixed(5)
                    let odchylka = getStandardDeviation(value.values).toFixed(5)




                    let vysledekZaokrouhleni = naJednoPlatne(odchylka)
                    let odchylkaZaokr = vysledekZaokrouhleni[0]
                    let prumerZaokr = zaokrouhli(prumer, vysledekZaokrouhleni[1], vysledekZaokrouhleni[2])






                    setHodnoty({
                        symbol: value.symbol,
                        jednotka: value.jednotka,
                        prumer: prumer,
                        prumerZaokrouhleno: prumerZaokr,
                        odchylka: odchylka,
                        odchylkaZaokrouhleno: odchylkaZaokr,
                        toPosledniVProcentech: (odchylkaZaokr / prumerZaokr * 100).toFixed(2)
                    })
                    setIsOK(true)


                }

            }
        } catch (e) {
            console.log(e)
            setIsOK(false)
        }

    }, [valueID]);


    useEffect(() => {
        // Něco jako save function
        setIsSaved(false)
        let tilesCopy = tiles
        for (let i = 0; i < tilesCopy.length; i++) {
            if (tilesCopy[i].id == tileID) {
                tilesCopy[i].content = {
                    title: title,
                    valueID: valueID,
                    // data: htmlData
                }

                tilesCopy[i].data = htmlData

                setTiles(tilesCopy)
                break
            }
        }

    }, [valueID, htmlData, title]);


    // Funkce ze stackOverflow
    function getStandardDeviation(array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }

    useEffect(() => {
        if (hodnoty) {

            setPrvniRadek(`<p><span class="ql-formula" data-value="\\overline{` + hodnoty.symbol + `}\\ =\\ ` + hodnoty.prumer + `\\ ` + hodnoty.jednotka + `\\ \\doteq\\ ` + hodnoty.prumerZaokrouhleno + `\\ ` + hodnoty.jednotka + `">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"> <semantics> <mrow> <mover accent="true"> <mrow> <mi>x</mi> <mi>x</mi> <mi>x</mi> </mrow> <mo stretchy="true">‾</mo> </mover> <mtext>&nbsp;</mtext> <mo>=</mo> <mtext>&nbsp;</mtext> <mn>` + hodnoty.prumerZaokrouhleno + `</mn> <mtext>&nbsp;</mtext> <mi>j</mi> <mi>j</mi> <mi>j</mi> <mtext>&nbsp;</mtext> <mo>≐</mo> <mtext>&nbsp;</mtext> <mn>` + hodnoty.prumerZaokrouhleno + `</mn> <mtext>&nbsp;</mtext> <mi>j</mi> <mi>j</mi> <mi>j</mi> </mrow> <annotation encoding="application/x-tex">\\overline{` + hodnoty.symbol + `}\\ =\\ ` + hodnoty.prumer + `\\ ` + hodnoty.jednotka + `\\ \\doteq\\ ` + hodnoty.prumerZaokrouhleno + `\\ ` + hodnoty.jednotka + ` </annotation> </semantics> </math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6306em;"></span><span class="mord overline"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.6306em;"><span class="" style="top: -3em;"><span class="pstrut" style="height: 3em;"></span><span class="mord"><span class="mord mathnormal">` + hodnoty.symbol + `</span></span></span><span class="" style="top: -3.5506em;"><span class="pstrut" style="height: 3em;"></span><span class="overline-line" style="border-bottom-width: 0.04em;"></span></span></span></span></span></span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8674em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.prumer + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">≐</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.854em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.prumerZaokrouhleno + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span></span></span></span></span>﻿</span> </p> `)
            setDruhyRadek(`<p><span class="ql-formula" data-value="\\Delta ` + hodnoty.symbol + `\\ =\\ ` + hodnoty.odchylka + `\\ ` + hodnoty.jednotka + `\\ \\doteq\\ ` + hodnoty.odchylkaZaokrouhleno + `\\ ` + hodnoty.jednotka + `">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Δ</mi><mi>x</mi><mi>x</mi><mi>x</mi><mtext>&nbsp;</mtext><mo>=</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.odchylka + `</mn><mtext>&nbsp;</mtext><mi>j</mi><mi>j</mi><mi>j</mi><mtext>&nbsp;</mtext><mo>≐</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.odchylka + `</mn><mtext>&nbsp;</mtext><mi>j</mi><mi>j</mi><mi>j</mi></mrow><annotation encoding="application/x-tex">\\Delta ` + hodnoty.symbol + `\\ =\\ ` + hodnoty.odchylka + `\\ ` + hodnoty.jednotka + `\\ \\doteq\\ ` + hodnoty.odchylka + `\\ ` + hodnoty.jednotka + `</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord">Δ</span><span class="mord mathnormal">` + hodnoty.symbol + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8674em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.odchylka + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">≐</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.854em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.odchylkaZaokrouhleno + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span></span></span></span></span>﻿</span> </p>`)
            setTretiRadek(`<p><span class="ql-formula" data-value="` + hodnoty.symbol + `\\ =\\ \\left(` + hodnoty.prumerZaokrouhleno + `\\ \\pm` + hodnoty.prumerZaokrouhleno + `\\right)` + hodnoty.jednotka + `">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi><mi>x</mi><mi>x</mi><mtext>&nbsp;</mtext><mo>=</mo><mtext>&nbsp;</mtext><mrow><mo fence="true">(</mo><mn>` + hodnoty.prumerZaokrouhleno + `</mn><mtext>&nbsp;</mtext><mo>±</mo><mn>` + hodnoty.prumerZaokrouhleno + `</mn><mo fence="true">)</mo></mrow><mi>j</mi><mi>j</mi><mi>j</mi></mrow><annotation encoding="application/x-tex">` + hodnoty.symbol + `\\ =\\ \\left(` + hodnoty.prumerZaokrouhleno + `\\ \\pm` + hodnoty.prumerZaokrouhleno + `\\right)` + hodnoty.jednotka + `</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.4306em;"></span><span class="mord mathnormal">` + hodnoty.symbol + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="minner"><span class="mopen delimcenter" style="top: 0em;">(</span><span class="mord">` + hodnoty.prumerZaokrouhleno + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right: 0.2222em;"></span><span class="mord">` + hodnoty.odchylkaZaokrouhleno + `</span><span class="mclose delimcenter" style="top: 0em;">)</span></span><span class="mspace" style="margin-right: 0.1667em;"></span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span></span></span></span></span>﻿</span> </p>`)
            setCtvrtyRadek(`<p><span class="ql-formula" data-value="\\delta ` + hodnoty.symbol + `\\ =\\ ` + hodnoty.toPosledniVProcentech + `\\%">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>δ</mi><mi>x</mi><mi>x</mi><mi>x</mi><mtext>&nbsp;</mtext><mo>=</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.toPosledniVProcentech + `</mn><mi mathvariant="normal">%</mi></mrow><annotation encoding="application/x-tex">\\delta ` + hodnoty.symbol + `\\ =\\ ` + hodnoty.toPosledniVProcentech + `\\%</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6944em;"></span><span class="mord mathnormal" style="margin-right: 0.0379em;">δ</span><span class="mord mathnormal">` + hodnoty.symbol + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8056em; vertical-align: -0.0556em;"></span><span class="mord">` + hodnoty.toPosledniVProcentech + `%</span></span></span></span></span>﻿</span> </p>`)
            setIsOK(true)
        } else {
            setIsOK(false)
        }
    }, [hodnoty]);

    console.log(hodnoty);




    useEffect(() => {
        setTimeout(() => {
            sethtmlData(prvniRadek + druhyRadek + tretiRadek + ctvrtyRadek)
        }, 50);
    }, [createData]);




    return (<div className="uk-padding-small ">
        <div className="uk-card uk-card-default  ">
            <div className="uk-card-header-footer uk-flex" style={{ justifyContent: "space-between", padding: "5px" }}>


                <input className="uk-input uk-form-blank uk-form-width-medium" type="text" placeholder="Kachlička" value={title} onChange={(e) => setTitle(e.target.value)} />

                <select name="" className="uk-select" value={valueID} onChange={e => setValueID(e.target.value)} style={{ width: "fit-content" }} id="">
                    {values &&
                        values.map(obj =>
                            <option key={obj.id} value={obj.id}>{obj.symbol}</option>
                        )
                    }
                </select>

                <div className="center">

                    {(fullscreenID == tileID) &&
                        <span uk-icon="shrink" onClick={() => setFullscreenID(false)} ></span>
                    }
                    {fullscreenID != tileID &&
                        <span uk-icon="expand" onClick={() => { setFullscreenID(tileID) }}></span>
                    }

                    <span uk-icon="more-vertical"></span>

                    <div uk-dropdown="mode: click">

                        <a onClick={() => deleteTile(tileID)}><span uk-icon="trash"></span>Odstranit kachličku</a>

                    </div>

                </div>


            </div>
            <hr style={{ marginTop: 0 }} />
            <div className="uk-card-body">

                {isOK &&
                    <>
                        <div dangerouslySetInnerHTML={{ __html: prvniRadek }}></div>
                        <div dangerouslySetInnerHTML={{ __html: druhyRadek }}></div>
                        <div dangerouslySetInnerHTML={{ __html: tretiRadek }}></div>
                        <div dangerouslySetInnerHTML={{ __html: ctvrtyRadek }}></div>
                    </>
                }
                {!isOK &&
                    <p>Nejsou dostupné data</p>}

            </div>

        </div>


    </div >);
}

export default Average;