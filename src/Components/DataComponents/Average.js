import { useEffect, useState } from "react";

function Average({ values, editTiles, tileContent }) {
    // Tady je tileContent jenom string s hodnotou valueID


    const [valueID, setValueID] = useState(0);
    const [hodnoty, setHodnoty] = useState();

    useEffect(() => {
        if (tileContent) {
            setValueID(tileContent)
        } else {

        }
    }, []);

    useEffect(() => {
        for (let value in values) {
            if (value.id == valueID) {
                console.log(value)
                setHodnoty({
                    symbol: value.symbol,
                    jednotka: value.jedontka,
                    prumerZaokrouhleno: value.values.reduce((a, b) => a + b, 0) / value.values.length,
                    odchylka: getStandardDeviation(value.values),
                    odchylkaZaokrouhleno: 123465,
                })
            }
        }

    }, [valueID]);


    // const symbol = velicina.symbol
    // const prumer = velicina.values.reduce((a, b) => a + b, 0) / velicina.values.length
    // const prumerZaokrouhleno = 1111
    // const odchylka = getStandardDeviation(velicina.values)
    // const odchylkaZaokrouhleno = 3356
    // const jednotka = velicina.jednotka


    // Funkce ze stackOverflow
    function getStandardDeviation(array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }


    // const aaaa = `<p><span class="ql-formula" data-value="\overline{` + hodnoty.symbol+ `}\ =\ 15x">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi>` + hodnoty.symbol+ `</mi><mo stretchy="true">‾</mo></mover><mtext>&nbsp;</mtext><mo>=</mo><mtext>&nbsp;</mtext><mn>15</mn><mi>x</mi></mrow><annotation encoding="application/x-tex">\overline{` + hodnoty.symbol+ `}\ =\ 15x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6306em;"></span><span class="mord overline"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.6306em;"><span class="" style="top: -3em;"><span class="pstrut" style="height: 3em;"></span><span class="mord"><span class="mord mathnormal">a</span></span></span><span class="" style="top: -3.5506em;"><span class="pstrut" style="height: 3em;"></span><span class="overline-line" style="border-bottom-width: 0.04em;"></span></span></span></span></span></span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.6444em;"></span><span class="mord">15</span><span class="mord mathnormal">` + hodnoty.jednotka + `</span></span></span></span></span>﻿</span> </p>`

    // const prvniRadek = `<p><span class="ql-formula" data-value="\overline{` + hodnoty.symbol + `}\ =\ ` + hodnoty.prumer + `\ ` + hodnoty.jednotka + `\\doteq\ ` + hodnoty.prumerZaokrouhleno + `\ ` + hodnoty.jednotka + `">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mrow><mi>x</mi><mi>x</mi><mi>x</mi></mrow><mo stretchy="true">‾</mo></mover><mtext>&nbsp;</mtext><mo>=</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.prumer + `</mn><mtext>&nbsp;</mtext><mi>j</mi><mi>j</mi><mi>j</mi><mtext>&nbsp;</mtext><mo>≐</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.prumer + `</mn><mtext>&nbsp;</mtext><mi>j</mi><mi>j</mi><mi>j</mi></mrow><annotation encoding="application/x-tex">\overline{` + hodnoty.symbol + `}\ =\ ` + hodnoty.prumer + `\ ` + hodnoty.jednotka + `\ \doteq\ ` + hodnoty.prumerZaokrouhleno + `\ ` + hodnoty.jednotka + `</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6306em;"></span><span class="mord overline"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.6306em;"><span class="" style="top: -3em;"><span class="pstrut" style="height: 3em;"></span><span class="mord"><span class="mord mathnormal">` + hodnoty.symbol + `</span></span></span><span class="" style="top: -3.5506em;"><span class="pstrut" style="height: 3em;"></span><span class="overline-line" style="border-bottom-width: 0.04em;"></span></span></span></span></span></span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8674em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.prumer + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">≐</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.854em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.prumerZaokrouhleno + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span></span></span></span></span>﻿</span> </p>`
    // const druhyRadek = `<p><span class="ql-formula" data-value="\Delta ` + hodnoty.symbol + `\ =\ ` + hodnoty.odchylka + `\ ` + hodnoty.jednotka + `\ \doteq\ ` + hodnoty.odchylka + `\ ` + hodnoty.jednotka + `">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Δ</mi><mi>x</mi><mi>x</mi><mi>x</mi><mtext>&nbsp;</mtext><mo>=</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.odchylka + `</mn><mtext>&nbsp;</mtext><mi>j</mi><mi>j</mi><mi>j</mi><mtext>&nbsp;</mtext><mo>≐</mo><mtext>&nbsp;</mtext><mn>` + hodnoty.odchylka + `</mn><mtext>&nbsp;</mtext><mi>j</mi><mi>j</mi><mi>j</mi></mrow><annotation encoding="application/x-tex">\Delta ` + hodnoty.symbol + `\ =\ ` + hodnoty.odchylka + `\ ` + hodnoty.jednotka + `\ \doteq\ ` + hodnoty.odchylka + `\ ` + hodnoty.jednotka + `</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord">Δ</span><span class="mord mathnormal">` + hodnoty.symbol + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8674em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.odchylka + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">≐</span><span class="mspace">&nbsp;</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.854em; vertical-align: -0.1944em;"></span><span class="mord">` + hodnoty.odchylkaZaokrouhleno + `</span><span class="mspace">&nbsp;</span><span class="mord mathnormal" style="margin-right: 0.0572em;">` + hodnoty.jednotka + `</span></span></span></span></span>﻿</span> </p>`



    return (<div className="uk-padding-small ">
        <div className="uk-card uk-card-default uk-card-body">
            <div>
                <input class="uk-input uk-form-blank uk-form-width-medium" type="text" placeholder="Form blank" />

                <select name="" className="uk-select" style={{ width: "fit-content" }} id="">
                    <option value="">t1</option>
                    <option value="">t2</option>
                    <option value="">h</option>
                    <option value="">V</option>
                </select>

            </div>
            <hr style={{ marginTop: 0 }} />
            {/* <div className="content" dangerouslySetInnerHTML={{ __html: prvniRadek }}></div>
            <div className="content" dangerouslySetInnerHTML={{ __html: druhyRadek }}></div> */}

        </div>


    </div>);
}

export default Average;