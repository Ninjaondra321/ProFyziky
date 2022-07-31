import { Link } from "react-router-dom";


function NavBar({ changeTheme }) {
    return (<nav className="uk-navbar-container tm-navbar-container uk-sticky  uk-sticky-fixed uk-active uk-sticky-below uk-flex"
        style={{ "position": "fixed", "top": "0px", "width": "100vw" }}
        uk-navbar="" >



        <div className="uk-navbar-left">

            <Link className="uk-navbar-item uk-logo" to="/" >ProFyziky</Link>


            <ul className="uk-navbar-nav uk-visible@s">
                <li className="uk-navbar-togle"><Link to="/circuits">El. Obvody</Link></li>
                <li className=""  ><Link to="/protocols">Protokoly</Link></li>
                <li className=""  ><Link to="/data">Data</Link></li>
                <li className="uk-active"><Link to="/docs">Dokumentace</Link></li>
                <li className=""><Link to="/about">O projektu</Link></li>
            </ul>

        </div>


        <div className="uk-navbar-right ">
            <div className="uk-hidden@s">

                <a uk-toggle="target: #offcanvas-overlay" style={{ paddingRight: "15px" }}><span uk-icon="icon: menu"></span></a>

            </div>

            <div className="uk-visible@s">

                <ul className="uk-navbar-nav">
                    <li className="" onClick={() => changeTheme()}> <a>12</a> </li>
                    <li className=""><Link to="/settings"><span uk-icon="icon: cog"></span></Link></li>
                </ul>



            </div>
        </div>

        <div id="offcanvas-overlay" uk-offcanvas="overlay: true">
            <div className="uk-offcanvas-bar">

                <button className="uk-offcanvas-close" type="button" uk-close=""></button>

                <p><Link to="/circuits">El. Obvody</Link></p>
                <p><Link to="/protocols">Protokoly</Link></p>
                <p><Link to="/data">Data</Link></p>
                <p><Link to="/docs">Dokumentace</Link></p>
                <p><Link to="/about">O projektu</Link></p>



            </div>
        </div>







    </nav >);
}

export default NavBar;