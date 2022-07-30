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


        <div className="uk-navbar-right uk-visible@s">




            <ul className="uk-navbar-nav">
                <li className="" onClick={() => changeTheme()}> <a>12</a> </li>
                <li className=""><Link to="/settings">34</Link></li>
            </ul>



        </div>





    </nav >);
}

export default NavBar;