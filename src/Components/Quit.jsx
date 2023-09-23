import React, { useContext } from "react";
import './css/Quit.css'
import SleepScreen from "./Sceens/SleepScreen";
import { AppContext } from "../context/AppContext";




export default function Quit(props) {
    const { setShowSleepScreen, setShowApp, setStartMenu, setShowRestartingScreen, setShutDown } = useContext(AppContext)
    function handleSleep() {
        setStartMenu(prev => !prev)
        setShowApp(prev => !prev)
        setShowSleepScreen(prev => !prev)
    }

    function handleRestart() {
        setStartMenu(prev => !prev)
        setShowApp(prev => !prev)
        setShowRestartingScreen(prev => !prev)
    }

    function handleShutDown() {
        setStartMenu(prev => !prev)
        setShowApp(prev => !prev)
        setShutDown(prev => !prev)
    }

    return (
        <div className={"Quit QuitMenu" + props.active}>
            <div onClick={handleSleep} className="quitButtons"><i className="fa-regular fa-moon"></i><span>Sleep</span></div>
            <div onClick={handleShutDown} className="quitButtons"><i className="fa fa-power-off"></i><span>Shut down</span></div>
            <div onClick={handleRestart} className="quitButtons"><i className="fa-solid fa-rotate-right"></i><span>Restart</span></div>
        </div>
    )
}