import { Helmet } from "react-helmet";

function Analytics() {
    console.log('Anylytics připnuty')
    return (<>
        <Helmet>
            {/*  Google Anal 4*/}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-G2B8SKCH53"></script>
            <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-G2B8SKCH53');
                `}
            </script>

            {/* MS Clarity */}
            <script type="text/javascript">
                {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "dm16atwk2j");
    `}

            </script>


        </Helmet>
    </>
    )
}

export default Analytics;