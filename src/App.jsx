import { useEffect, useState, useLayoutEffect, useReducer } from "react";
import "./App.css";
import Navigation from './components/Navigation.jsx';
import Home from "./pages/Main.jsx";
import ConnectDevice from "./pages/ConnectDevice.jsx";
import Apps from "./pages/Apps.jsx";
import DeviceInfo from "./pages/DeviceInfo.jsx";
import { Outlet, Route, Routes, useLocation } from "react-router";
import MobileNavBar from "./components/MobileNavBar.jsx";

function App() {
  const [opened, setOpened] = useState(false);
  const isMobile = window.innerWidth < 1024;
  return (
    <>
      <Navigation opened={opened} setOpened={setOpened} />
      {isMobile && <MobileNavBar setOpened={setOpened} />}
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<Home />} />
          <Route path="add" element={<ConnectDevice />} />
          <Route path="apps" element={<Apps />} />
          <Route path="info" element={<DeviceInfo />} />
        </Route>
      </Routes>
    </>
  );
}

function Content() {
  let element = document.getElementById("drawer-navigation");
  const location = useLocation();
  let MobileNavBar = document.getElementById("mobile-navbar");
  let content = document.getElementById("content");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [isMobile, setMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    element = document.getElementById("drawer-navigation");
    MobileNavBar = document.getElementById("mobile-navbar");
    content = document.getElementById("content");
    MobileNavBar ? content.style.height = `calc(100vh - ${MobileNavBar.clientHeight}px)` : null;
    MobileNavBar ? content.style.marginTop = `${MobileNavBar.clientHeight}px` : null;
    forceUpdate();
  }, [element, MobileNavBar, content, location.pathname]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setMobile(window.innerWidth < 1024);
      forceUpdate();
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return (
    <div style={{ marginLeft: isMobile ? '0' : `${element?.clientWidth}px`, width: `calc(100vw - ${!isMobile ? element?.clientWidth : '0'}px )`, height: `${isMobile ? `calc(100vh - ${MobileNavBar?.clientHeight}px)` : '100vh'}` }}>
      <Outlet />
    </div>
  )
}

export default App;