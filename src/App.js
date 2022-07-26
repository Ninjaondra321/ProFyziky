import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Pages
import Page404 from './Pages/404';
import About from './Pages/About';
import CircuitBuilder from './Pages/CircuitBuilder';
import Circuits from './Pages/Circuits';
import Homepage from './Pages/Homepage';
import ProtocolBuilder from './Pages/ProtocolBuilder';
import Protocols from './Pages/Protocols';
import Settings from './Pages/Settings';

// Components
import NavBar from './Components/NavBar';
import "./Styles/ui-kit-z-webu.css"
import InitialSettings from './Components/InitialSettings';
import Analytics from './Analytics/Analytics';

function App() {

  const [theme, setTheme] = useState("");
  const [userAgreedToCookies, setUserAgreedToCookies] = useState();

  useEffect(() => {
    // Set preferences
    try {
      let p = JSON.parse(localStorage.getItem('ProFyziky-Preferences'))
      if (["light", "dark"].includes(p.theme)) {
        setTheme(p.theme)
      } else {
        setTheme("light")
      }

      setUserAgreedToCookies(p.userAgreedToCookies)


    } catch (e) {
      console.debug(e)

      localStorage.setItem('ProFyziky-Preferences', JSON.stringify({ theme: "light", userAgreedToCookies: "unset" }))
      setTheme("light")
      setUserAgreedToCookies("unset")
    }
  }, []);


  useEffect(() => {
    document.documentElement.style.setProperty('--main-color', '#409DEE');
    document.documentElement.style.setProperty('--secondary-color', '#5E77E2');

    // Upravit theme
    if (theme == "light") {
      console.log('Nastavuji theme light')
      document.documentElement.style.setProperty('--text-color', '#222');
      document.documentElement.style.setProperty('--text-secondary-color', '#666');
      document.documentElement.style.setProperty('--background-color', '#fff');
      document.documentElement.style.setProperty('--shadow-color-01', 'rgba(0, 0, 0, 8%)');
      document.documentElement.style.setProperty('--shadow-color-02', 'rgba(0, 0, 0, 16%)');
    } else {
      document.documentElement.style.setProperty('--text-color', '#eee');
      document.documentElement.style.setProperty('--text-secondary-color', '#bbb');
      document.documentElement.style.setProperty('--background-color', '#111');
      document.documentElement.style.setProperty('--shadow-color-01', 'rgba(43, 43, 43, 0.8)');
      document.documentElement.style.setProperty('--shadow-color-02', 'rgba(160, 160, 160, 0.16)');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ProFyziky-Preferences', JSON.stringify({ theme: theme, userAgreedToCookies: userAgreedToCookies }))
  }, [theme, userAgreedToCookies]);


  function changeTheme() {
    if (theme == "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  console.warn(userAgreedToCookies)


  return (
    <div className="App">
      <BrowserRouter basename='/ProFyziky'>

        <div style={{ paddingTop: "80px" }}></div>
        <NavBar changeTheme={changeTheme} />

        {userAgreedToCookies &&
          <Analytics />
        }


        <Routes>

          <Route path="" element={<Homepage />} />
          <Route path="/settings" element={<Settings theme={theme} userAgreedToCookies={userAgreedToCookies} setUserAgreedToCookies={setUserAgreedToCookies} setTheme={setTheme} />} />
          <Route path="/about" element={<About />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/circuits/:projectName" element={<CircuitBuilder />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/protocols/:projectName" element={<ProtocolBuilder />} />


          <Route path="*" element={<Page404 />} />



        </Routes>


        {(userAgreedToCookies == "unset") &&
          <InitialSettings setUserAgreedToCookies={setUserAgreedToCookies} />
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
