import { useParams, useNavigate, } from "react-router-dom";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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


// React quill
import ReactQuill, { Quill } from 'react-quill';
// Quill styles
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// (React) Quill extentions
import QuillBetterTable from "quill-better-table";
import ImageResize from 'quill-image-resize-module-react';


// Logo into the head of the protocol a4 page
import gymzlLogo from "../Imgs/Logos/gymzl.jpg"


import alienFont from "../Fonts/AlienFont.ttf"

import myFont from "../Fonts/Lora.ttf"

// Pak vymaz
import testingImage from "../Imgs/nazorny_obvod.png"


const mathCSS = ` 
  @font-face{font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(fonts/KaTeX_AMS-Regular.woff2) format("woff2"),url(fonts/KaTeX_AMS-Regular.woff) format("woff"),url(fonts/KaTeX_AMS-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Bold.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Caligraphic-Regular.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Regular.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Fraktur-Bold.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Bold.woff) format("woff"),url(fonts/KaTeX_Fraktur-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Fraktur-Regular.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Regular.woff) format("woff"),url(fonts/KaTeX_Fraktur-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Main-Bold.woff2) format("woff2"),url(fonts/KaTeX_Main-Bold.woff) format("woff"),url(fonts/KaTeX_Main-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Main-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Main-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Main-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Main-Italic.woff2) format("woff2"),url(fonts/KaTeX_Main-Italic.woff) format("woff"),url(fonts/KaTeX_Main-Italic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Main-Regular.woff2) format("woff2"),url(fonts/KaTeX_Main-Regular.woff) format("woff"),url(fonts/KaTeX_Main-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Math-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Math-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Math-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Math-Italic.woff2) format("woff2"),url(fonts/KaTeX_Math-Italic.woff) format("woff"),url(fonts/KaTeX_Math-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:700;src:url(fonts/KaTeX_SansSerif-Bold.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Bold.woff) format("woff"),url(fonts/KaTeX_SansSerif-Bold.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:italic;font-weight:400;src:url(fonts/KaTeX_SansSerif-Italic.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Italic.woff) format("woff"),url(fonts/KaTeX_SansSerif-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:400;src:url(fonts/KaTeX_SansSerif-Regular.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Regular.woff) format("woff"),url(fonts/KaTeX_SansSerif-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Script-Regular.woff2) format("woff2"),url(fonts/KaTeX_Script-Regular.woff) format("woff"),url(fonts/KaTeX_Script-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size1-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size1-Regular.woff) format("woff"),url(fonts/KaTeX_Size1-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size2-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size2-Regular.woff) format("woff"),url(fonts/KaTeX_Size2-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size3-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size3-Regular.woff) format("woff"),url(fonts/KaTeX_Size3-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size4-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size4-Regular.woff) format("woff"),url(fonts/KaTeX_Size4-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Typewriter-Regular.woff2) format("woff2"),url(fonts/KaTeX_Typewriter-Regular.woff) format("woff"),url(fonts/KaTeX_Typewriter-Regular.ttf) format("truetype")}.katex{text-rendering:auto;font:normal 1.21em KaTeX_Main,Times New Roman,serif;line-height:1.2;text-indent:0}.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}.katex .katex-version:after{content:"0.16.0"}.katex .katex-mathml{clip:rect(1px,1px,1px,1px);border:0;height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.katex .katex-html>.newline{display:block}.katex .base{position:relative;white-space:nowrap;width:-webkit-min-content;width:-moz-min-content;width:min-content}.katex .base,.katex .strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}.katex .vbox{align-items:baseline;display:inline-flex;flex-direction:column}.katex .hbox{width:100%}.katex .hbox,.katex .thinbox{display:inline-flex;flex-direction:row}.katex .thinbox{max-width:0;width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .hdashline,.katex .hline,.katex .mfrac .frac-line,.katex .overline .overline-line,.katex .rule,.katex .underline .underline-line{min-height:1px}.katex .mspace{display:inline-block}.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}.katex .clap>.inner,.katex .llap>.inner,.katex .rlap>.inner{position:absolute}.katex .clap>.fix,.katex .llap>.fix,.katex .rlap>.fix{display:inline-block}.katex .llap>.inner{right:0}.katex .clap>.inner,.katex .rlap>.inner{left:0}.katex .clap>.inner>span{margin-left:-50%;margin-right:50%}.katex .rule{border:0 solid;display:inline-block;position:relative}.katex .hline,.katex .overline .overline-line,.katex .underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .hdashline{border-bottom-style:dashed;display:inline-block;width:100%}.katex .sqrt>.root{margin-left:.27777778em;margin-right:-.55555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .sizing.reset-size2.size1{font-size:.83333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .sizing.reset-size2.size3{font-size:1.16666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .sizing.reset-size2.size4{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .sizing.reset-size2.size6{font-size:1.66666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .sizing.reset-size2.size10{font-size:3.45666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .sizing.reset-size2.size11{font-size:4.14666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .sizing.reset-size3.size1{font-size:.71428571em}.katex .fontsize-ensurer.reset-size3.size2,.katex .sizing.reset-size3.size2{font-size:.85714286em}.katex .fontsize-ensurer.reset-size3.size3,.katex .sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .sizing.reset-size3.size4{font-size:1.14285714em}.katex .fontsize-ensurer.reset-size3.size5,.katex .sizing.reset-size3.size5{font-size:1.28571429em}.katex .fontsize-ensurer.reset-size3.size6,.katex .sizing.reset-size3.size6{font-size:1.42857143em}.katex .fontsize-ensurer.reset-size3.size7,.katex .sizing.reset-size3.size7{font-size:1.71428571em}.katex .fontsize-ensurer.reset-size3.size8,.katex .sizing.reset-size3.size8{font-size:2.05714286em}.katex .fontsize-ensurer.reset-size3.size9,.katex .sizing.reset-size3.size9{font-size:2.46857143em}.katex .fontsize-ensurer.reset-size3.size10,.katex .sizing.reset-size3.size10{font-size:2.96285714em}.katex .fontsize-ensurer.reset-size3.size11,.katex .sizing.reset-size3.size11{font-size:3.55428571em}.katex .fontsize-ensurer.reset-size4.size1,.katex .sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .sizing.reset-size5.size1{font-size:.55555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .sizing.reset-size5.size2{font-size:.66666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .sizing.reset-size5.size3{font-size:.77777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .sizing.reset-size5.size4{font-size:.88888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .sizing.reset-size5.size6{font-size:1.11111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .sizing.reset-size5.size7{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .sizing.reset-size5.size10{font-size:2.30444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .sizing.reset-size5.size11{font-size:2.76444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .sizing.reset-size7.size1{font-size:.41666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .sizing.reset-size7.size3{font-size:.58333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .sizing.reset-size7.size4{font-size:.66666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .sizing.reset-size7.size6{font-size:.83333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .sizing.reset-size7.size10{font-size:1.72833333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .sizing.reset-size7.size11{font-size:2.07333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .sizing.reset-size8.size1{font-size:.34722222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .sizing.reset-size8.size2{font-size:.41666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .sizing.reset-size8.size3{font-size:.48611111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .sizing.reset-size8.size4{font-size:.55555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .sizing.reset-size8.size6{font-size:.69444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .sizing.reset-size8.size7{font-size:.83333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .sizing.reset-size8.size10{font-size:1.44027778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .sizing.reset-size8.size11{font-size:1.72777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .sizing.reset-size9.size1{font-size:.28935185em}.katex .fontsize-ensurer.reset-size9.size2,.katex .sizing.reset-size9.size2{font-size:.34722222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .sizing.reset-size9.size3{font-size:.40509259em}.katex .fontsize-ensurer.reset-size9.size4,.katex .sizing.reset-size9.size4{font-size:.46296296em}.katex .fontsize-ensurer.reset-size9.size5,.katex .sizing.reset-size9.size5{font-size:.52083333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .sizing.reset-size9.size6{font-size:.5787037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .sizing.reset-size9.size7{font-size:.69444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .sizing.reset-size9.size8{font-size:.83333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .sizing.reset-size9.size10{font-size:1.20023148em}.katex .fontsize-ensurer.reset-size9.size11,.katex .sizing.reset-size9.size11{font-size:1.43981481em}.katex .fontsize-ensurer.reset-size10.size1,.katex .sizing.reset-size10.size1{font-size:.24108004em}.katex .fontsize-ensurer.reset-size10.size2,.katex .sizing.reset-size10.size2{font-size:.28929605em}.katex .fontsize-ensurer.reset-size10.size3,.katex .sizing.reset-size10.size3{font-size:.33751205em}.katex .fontsize-ensurer.reset-size10.size4,.katex .sizing.reset-size10.size4{font-size:.38572806em}.katex .fontsize-ensurer.reset-size10.size5,.katex .sizing.reset-size10.size5{font-size:.43394407em}.katex .fontsize-ensurer.reset-size10.size6,.katex .sizing.reset-size10.size6{font-size:.48216008em}.katex .fontsize-ensurer.reset-size10.size7,.katex .sizing.reset-size10.size7{font-size:.57859209em}.katex .fontsize-ensurer.reset-size10.size8,.katex .sizing.reset-size10.size8{font-size:.69431051em}.katex .fontsize-ensurer.reset-size10.size9,.katex .sizing.reset-size10.size9{font-size:.83317261em}.katex .fontsize-ensurer.reset-size10.size10,.katex .sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .sizing.reset-size10.size11{font-size:1.19961427em}.katex .fontsize-ensurer.reset-size11.size1,.katex .sizing.reset-size11.size1{font-size:.20096463em}.katex .fontsize-ensurer.reset-size11.size2,.katex .sizing.reset-size11.size2{font-size:.24115756em}.katex .fontsize-ensurer.reset-size11.size3,.katex .sizing.reset-size11.size3{font-size:.28135048em}.katex .fontsize-ensurer.reset-size11.size4,.katex .sizing.reset-size11.size4{font-size:.32154341em}.katex .fontsize-ensurer.reset-size11.size5,.katex .sizing.reset-size11.size5{font-size:.36173633em}.katex .fontsize-ensurer.reset-size11.size6,.katex .sizing.reset-size11.size6{font-size:.40192926em}.katex .fontsize-ensurer.reset-size11.size7,.katex .sizing.reset-size11.size7{font-size:.48231511em}.katex .fontsize-ensurer.reset-size11.size8,.katex .sizing.reset-size11.size8{font-size:.57877814em}.katex .fontsize-ensurer.reset-size11.size9,.katex .sizing.reset-size11.size9{font-size:.69453376em}.katex .fontsize-ensurer.reset-size11.size10,.katex .sizing.reset-size11.size10{font-size:.83360129em}.katex .fontsize-ensurer.reset-size11.size11,.katex .sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}.katex .accent .accent-body{position:relative}.katex .accent .accent-body:not(.accent-full){width:0}.katex .overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;display:block;height:inherit;position:absolute;width:100%}.katex svg path{stroke:none}.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}.katex .stretchy{display:block;overflow:hidden;position:relative;width:100%}.katex .stretchy:after,.katex .stretchy:before{content:""}.katex .hide-tail{overflow:hidden;position:relative;width:100%}.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}.katex .x-arrow-pad{padding:0 .5em}.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .sout{border-bottom-style:solid;border-bottom-width:.08em}.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}.katex .anglpad{padding:0 .03889em}.katex .eqn-num:before{content:"(" counter(katexEqnNo) ")";counter-increment:katexEqnNo}.katex .mml-eqn-num:before{content:"(" counter(mmlEqnNo) ")";counter-increment:mmlEqnNo}.katex .mtr-glue{width:50%}.katex .cd-vert-arrow{display:inline-block;position:relative}.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.tag{left:0;right:auto}.katex-display.fleqn>.katex{padding-left:2em;text-align:left}body{counter-reset:katexEqnNo mmlEqnNo}
  `



window.katex = katex;


Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/better-table", QuillBetterTable);






function ProtocolBuilder() {
    let { projectName } = useParams()

    const [isSaved, setIsSaved] = useState(true);

    // Metadata
    const [cisloCviceni, setCisloCviceni] = useState();
    const [fileName, setfileName] = useState();
    const [sources, setSources] = useState([]);

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
    const [ConvertedValue, setConvertedValue] = useState();


    const A4page = useRef()

    // Section: Závěr
    const [zaver, setZaver] = useState("");

    const [styleName, setStyleName] = useState("vychozi");
    const [styleCSS, setStyleCSS] = useState();

    const [ActiveSection, setActiveSection] = useState("hlavni-cast");

    const [updateSources, setUpdateSources] = useState(Math.random());

    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });

    useEffect(() => {
        // var styleToUse = "<style>"
        var styleToUse = ""
        for (let thisStyle of styles) {
            if (thisStyle.value == styleName) {
                styleToUse = styleToUse + thisStyle.css
                console.log(thisStyle)
                break
            }
        }
        // styleToUse = styleToUse + "</style>"
        setStyleCSS(styleToUse)
    }, [styleName]);


    const styles = [
        {
            title: "Alien", id: 0, value: "alien", displayStyle: { fontSize: 15, font: alienFont },
            css: ` .A4 p { color:#1166aa !important }         
                @font-face { font-family: 'Alien'; src: url('/ProFyziky/static/media/AlienFont.91cd02c9cf3feee05711.ttf'); }
                .A4 * { font-family: "Alien" !important; } 
                p {padding-left:50px}
                
                `
        },
        {
            title: "Times", id: 0, value: "time", displayStyle: { textDecoration: "underline " },
            css: ` .A4 p { color:#1166aa !important }         
        @font-face { font-family: 'Alien'; src: url('/ProFyziky/static/media/Merriweather-Regular.da67ca8c38ef44c4773d.ttf'); }
        .A4 * { font-family: "Alien" !important; width:auto !important} 
        p {padding-left:150px}
        `},
        {
            title: "Výchozí", id: 0, value: "vychozi", displayStyle: { fontSize: 15 },
            css: ` .A4 p { color:#1166aa !important }         
        @font-face { font-family: 'Alien'; src: url('/ProFyziky/static/media/Lora.f07b670404a41430084a.ttf'); }
        .A4 * { font-family: "Alien" !important; } `},
    ]

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

                    setSources(protocol.sources)

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

            console.log(userInfo.Class)
            console.log(userInfo.Class[userInfo.Class.length - 1])

            let trida = userInfo.Class[0] + userInfo.Class[1]

            let date = new Date;
            protocols.push({
                id: projectName,
                dateOfCreation: "" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear(),
                fileName: userInfo.LastName.toUpperCase() + "_" + trida + "_LP" + n + userInfo.Class[userInfo.Class.length - 1],
                name: userInfo.FirstName + " " + userInfo.LastName,
                coleague: userInfo.Coworker,
                class: userInfo.Class,
                date: null,
                nadNadpis: null,
                nadpis: null,
                pomucky: null,
                hlavniCast: null,
                zaver: null,
                sources: [],
            })

            console.log(userInfo.Class)
            console.log(userInfo.Class[userInfo.Class.length - 1])
            console.log(userInfo.LastName.toUpperCase() + "_" + trida + "_LP" + n + userInfo.Class[userInfo.Class.length - 1])

            let fileNameAhoj = userInfo.LastName.toUpperCase() + "_" + trida + "_LP" + n + userInfo.Class[userInfo.Class.length - 1]
            console.log(fileNameAhoj)

            setfileName(fileNameAhoj)
            setUserName(userInfo.FirstName + " " + userInfo.LastName)
            setUserColeague(userInfo.Coworker)
            setUserClass(userInfo.Class)
            setUserDate("")

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
                sources: [],
            })

            localStorage.setItem('ProFyziky-Protocols', JSON.stringify(protocols))

        }

    }, []);

    useEffect(() => {
        try {
            enableMathQuillFormulaAuthoring(
                hlavniCastQuill.current.editor,
                { operators: CUSTOM_OPERATORS }
            );
        } catch (e) {
            console.debug(e)
        }
    }, [hlavniCastQuill]);

    function askForProtocolNumber() {
        const protocolNumber = prompt('Kolikátá je to laboratorní práce? (Cvičení č.___)')
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
            sources: sources,
        })
        localStorage.setItem('ProFyziky-Protocols', JSON.stringify(protocols))
        setIsSaved(true)
        return



    }

    useEffect(() => {
        setIsSaved(false)
    }, [fileName, userName, userColeague, userClass, userDate, nadpis, nadNadpis, pomucky, hlavniCast, zaver, sources]);

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


        // Get content of the page
        let html = A4page.current.innerHTML


        // Load the selected style to attatch to the print page
        var styleToUse = "<style>"
        for (let thisStyle of styles) {
            if (thisStyle.value == styleName) {
                styleToUse = styleToUse + thisStyle.css
                console.log(thisStyle)
                break
            }
        }
        styleToUse = styleToUse + "</style>"

        console.log(html)

        // The new window
        var printWindow = window.open('', '', 'popup=true');
        printWindow.document.write('<html><head><title>' + fileName + '</title></head>');
        printWindow.document.write(styleToUse)
        printWindow.document.write("<style>" + mathCSS + "</style>")
        printWindow.document.write("<div class='A4'>" + html + "</div>");



        // printWindow.document.write(`<style > 

        // @font-face {
        //     font-family: 'Alien';
        //     src: url('/ProFyziky/static/media/AlienFont.91cd02c9cf3feee05711.ttf');
        // }


        // * {
        //     font-family: "Alien" !important;
        // } 



        // </style>`);



        printWindow.print();
        printWindow.document.close();


    }

    // window.onbeforeunload = function () {
    //     if (!isSaved) {
    //         return "Opravdu chcete opustit stránku? Všechny neuložené změny budou ztraceny."
    //     }
    // }

    function convertText() {
        let parser = new DOMParser();
        let doc = parser.parseFromString("" + hlavniCast, 'text/html');

        let pTags = doc.body.getElementsByTagName("p")
        for (let pTag of pTags) {
            console.log(pTag.classList)
            console.warn('Hallooooooo')
            let content
            try {
                for (let source of sources) {
                    if (source.name == pTag.innerText) {
                        content = source.data
                        break
                    }
                }
            } catch (error) {
            }
            if (content) {
                pTag.innerHTML = content
            }
        }

        return doc.body.innerHTML
    }

    useEffect(() => {
        setConvertedValue(convertText())
    }, [hlavniCast, sources, updateSources]);

    useEffect(() => {
        hlavniCastQuill.current.editor.root.innerHTML = hlavniCast
    }, [ActiveSection]);



    // useEffect(() => {

    //     setSources([
    //         { name: "Zdroj 01", type: "circuits", soubor: 0, data: '<img src="https://images.unsplash.com/photo-1606115915090-be18fea23ec7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80" />' },
    //         { name: "Zdroj 02", type: "data", soubor: 1, tile: 1, data: "<h1>Nasrat</h1>" },
    //     ]
    //     )
    // }, []);

    function editSource(index, type, data) {
        let newSources = sources
        newSources[index][type] = data

        let content
        try {
            if (newSources[index].type == "data") {
                let data = JSON.parse(localStorage.getItem('ProFyziky-Data'))
                let tile = data[newSources[index].soubor].tiles[newSources[index].tile]
                console.log(data[newSources[index].soubor].tiles[newSources[index].tile])
                // console.log(data[newSources[index].soubor].tiles)
                // console.log(data[newSources[index].soubor])
                // console.log(newSources[index].tile)
                content = tile.data
            }
            // content = "<p>Zdroj ještě není načtený... - Pokud se nic neděje, zkuste kliknout na tlačítko aktualizovat ve výběru zdrojů</p>"
        } catch (error) {
            content = "<p>Zdroj ještě není načtený... - Pokud se nic neděje, zkuste kliknout na tlačítko aktualizovat ve výběru zdrojů</p>"
        }
        newSources[index].data = content
        console.debug(content)


        setSources(newSources)
        setUpdateSources(Math.random())
    }

    console.log(sources)

    function addSource(type) {
        let newSources = sources
        newSources.push({ name: "Zdroj " + (sources.length + 1), type: type, soubor: 0, data: "<p>Zdroj ještě není načtený... - Pokud se nic neděje, zkuste kliknout na tlačítko aktualizovat ve výběru zdrojů</p>" })
        setSources(newSources)
        setUpdateSources(Math.random())

    }



    return (<div>
        {/* SubNavBar */}
        <style>

        </style>
        <div className="subnavbar">

            <div className="left">
                <style>{styleCSS}</style>

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

                                <ReactQuill id="moje-react-quill" ref={hlavniCastQuill} theme="snow"
                                    onChange={e => setHlavniCast(e)}
                                    modules={{

                                        imageResize: {
                                            parchment: Quill.import('parchment'),
                                            modules: ['Resize', 'DisplaySize', 'Toolbar']
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
                                    }
                                    }

                                />
                                {/* <div className="uk-padding">
                                    <input type="text" value={pasteValue} onChange={e => setPasteValue(e.target.value)} />
                                    <button onClick={() => {
                                        console.log(hlavniCastQuill)
                                        console.log(hlavniCastQuill.current)
                                        console.log(hlavniCastQuill.current.editor.root)
                                        hlavniCastQuill.current.editor.root.innerHTML = "" + hlavniCast + pasteValue + "<p></p>";
                                    }}>
                                        Vložit
                                    </button>
                                </div> */}

                                <div className="uk-padding">
                                    <h2>Zdroje</h2>
                                    {
                                        sources &&
                                        <div className="">

                                            {updateSources &&
                                                sources.map((source, index) => <div key={source.id}>
                                                    {source.type == "circuits" ?
                                                        <div className="uk-flex uk-flex-between">
                                                            <input type="text" className="uk-input" value={source.name} onChange={e => editSource(index, "name", e.target.value)} />

                                                            <label className="uk-form-label">Soubor</label>
                                                            <select className="uk-select" value={source.soubor} onChange={e => editSource(index, "soubor", e.target.value)}>
                                                                {JSON.parse(localStorage.getItem('ProFyziky-Circuits')).map(circuit => <option key={circuit.id} value={circuit.id}>{circuit.title}</option>)}
                                                            </select>

                                                        </div>
                                                        :
                                                        <div className="uk-flex uk-flex-between">
                                                            <input type="text" className="uk-input" value={source.name} onChange={e => editSource(index, "name", e.target.value)} />

                                                            <label className="uk-form-label">Soubor</label>
                                                            <select className="uk-select" value={source.soubor} onChange={e => editSource(index, "soubor", e.target.value)}>
                                                                {JSON.parse(localStorage.getItem('ProFyziky-Data')).map(file => <option key={file.id} value={file.id}>{file.fileName}</option>)}
                                                            </select>
                                                            <label className="uk-form-label">Dlaždice</label>
                                                            <select className="uk-select" value={source.tile} onChange={e => editSource(index, "tile", e.target.value)}>
                                                                {JSON.parse(localStorage.getItem('ProFyziky-Data'))[source.soubor].tiles.map(tile => <option key={tile.id} value={tile.id}>{"" + tile.type + "-" + tile.content.title}</option>)}
                                                            </select>


                                                            <span uk-icon="icon: refresh"></span>
                                                            <Link to="/404">
                                                                <span uk-icon="icon:  file-edit"></span>
                                                            </Link>


                                                        </div>
                                                    }
                                                    <hr />
                                                </div>)}

                                        </div>
                                    }

                                </div>


                                <div className="uk-padding">

                                    <div className="uk-child-width-1-2 uk-grid-match" uk-grid="">
                                        <div className="uk-card-default uk-card-body">
                                            <a onClick={() => addSource("circuits")}>
                                                <h3>+ El. obvod</h3>
                                            </a>
                                        </div>
                                        <div className="uk-card-default uk-card-body">
                                            <a onClick={() => addSource("data")}>

                                                <h3>+ Data</h3>
                                            </a>
                                        </div>
                                    </div>
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


                        <div className="uk-hidden@m">

                            <div className="A4 uk-box-shadow-xlarge mobilni-protokol" >
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
                                </div>
                                <div className="okno-parent">
                                    {hlavniCast ?
                                        // <div className="content" dangerouslySetInnerHTML={{ __html: hlavniCast }}></div>
                                        <div className="content" dangerouslySetInnerHTML={{ __html: ConvertedValue }}></div>
                                        :
                                        <div style={{ color: "#999999" }}>
                                            <h2>Nadpis</h2>
                                            <p>Text</p>
                                        </div>
                                    }
                                </div>
                                <div className="okno-parent">
                                    <div>
                                        <h2>Závěr</h2>
                                        <p>{zaver}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div style={{ paddingLeft: "50px", }} >

                            {
                                !["vlastni", "vlastni-slozity"].includes(styleName) &&
                                <div className="uk-grid uk-child-width-1-2 vyber-stylu-protokolu" uk-grid="" >
                                    {styles && styles.map(obj =>
                                        <div style={{ cursor: "pointer" }} className={obj.value == styleName ? "uk-card uk-card-body uk-card-primary " : "uk-card uk-card-body uk-card-default"} onClick={() => setStyleName(obj.value)} >
                                            <h2 style={obj.displayStyle}>{obj.title}</h2>
                                            <p>{obj.subtitle}</p>


                                        </div>
                                    )}

                                    <div style={{ cursor: "pointer" }} className="uk-card uk-card-body uk-card-default center" onClick={() => setStyleName("vlastni")} >
                                        <h2>Vlastní</h2>
                                    </div>
                                    <div style={{ cursor: "pointer" }} className="uk-card uk-card-body uk-card-default center" onClick={() => setStyleName("vlastni-slozity")} >
                                        <h2>Vlastní: Složitý</h2>
                                    </div>
                                </div>
                            }
                            {
                                (styleName == "vlastni") &&
                                <div>
                                    <select name="" id="" onChange={(e) => setStyleName(e.target.value)} className="uk-select" >
                                        <option value="vlastni" >Vlastní </option>
                                        {styles && styles.map(obj =>
                                            <option value={obj.value} >{obj.title}</option>
                                        )}
                                    </select>
                                    <h1>aAHIOSAHDUIUGS</h1>
                                </div>
                            }
                            {
                                (styleName == "vlastni-slozity") &&
                                <div>
                                    <select name="" id="" onChange={(e) => setStyleName(e.target.value)} className="uk-select" >
                                        <option value="vlastni-slozity" >Vlastní složitý</option>
                                        {styles && styles.map(obj =>
                                            <option value={obj.value} >{obj.title}</option>
                                        )}
                                    </select>
                                    <h1>aAHIOSAHDUIUGS</h1>

                                </div>
                            }




                            {/* <div className="uk-margin uk-flex">
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





                            </div> */}




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
                            // <div className="content" dangerouslySetInnerHTML={{ __html: hlavniCast }}></div>
                            <div className="content" dangerouslySetInnerHTML={{ __html: ConvertedValue }}></div>
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

        </div >
        {/* END Workspace */}





        <Helmet>
            {nadpis &&
                <title>ProFyziky | {nadpis}</title>
            }
            {!nadpis &&
                <title>ProFyziky | Editor protokolů</title>
            }
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>

    </div >);
}

export default ProtocolBuilder;