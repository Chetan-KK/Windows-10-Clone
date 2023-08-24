import React, { useContext, useEffect, useRef, useState } from "react"
import './css/StartMenu.css'
import Quit from "./Quit";
import Settings from "./Settings";
import { AppContext } from "../context/AppContext";

export default function StartMenu(props) {
    const [apps, setApps] = useState([
        {
            name: 'Chrome',
            logo: 'chromeIcon.svg'
        },
        {
            name: "File explorer",
            logo: "fileExplorer.png",
        },
        {
            name: "VS Code",
            logo: "vsCode.png",
        }
    ])

    const [QuitMenu, setQuitMenu] = useState(false)
    const [SettingsMenu, setSettingsMenu] = useState(false)
    const { setIfBlurByStartMenuPress, ifBlurByStartMenuPress, startMenu, setStartMenu, isStartButtonActive } = useContext(AppContext)

    /*To get the reference to the main Div of StartMenu so that 
    start menu can be closed if clicked anywhere outside by providing focus in useEffect*/
    const startMenuDiv = useRef()

    useEffect(() => {
        if (isStartButtonActive) {
            // console.log("focus on")
            startMenuDiv.current.focus()
        }

    }, [isStartButtonActive])


    function handlePowerOffButton() {
        setQuitMenu(!QuitMenu)
    }

    function handleSettingsButton() {
        setSettingsMenu(!SettingsMenu)
    }


    if (QuitMenu === true && SettingsMenu === true) {
        setQuitMenu(!QuitMenu)
    }

    /**Based on the implementations the OnBlur function gets called before the onClick of Start
     * Button and even if you click the start button the onBlur still gets called, so have dealt 
     * with some of the logics for displaying the start menu on clicks here, and the rest in the 
     * useeffect of App.jsx and StartMenu.jsx Taskbar.jsx
    */
    function handleBlur() {
        if (!ifBlurByStartMenuPress) {
            if (isStartButtonActive) {
                setStartMenu(prev => !prev)

            }
        }
        //close the power tab if it was opened
        setQuitMenu(false)
    }

    return (

        <div data-testid="startMenuDiv" ref={startMenuDiv} onBlur={handleBlur} tabIndex="0" className={"StartMenu StartMenu" + props.active}>
            <div className="flex options">
                <div className="opt"><i className="fa fa-bars"></i><span><b>Start</b></span></div>
                <div className="bottom">

                    <div className="opt"><i className="fa-regular fa-user"></i><span>Chetan Khulage</span></div>
                    <div className="opt"><i className="fa-regular fa-file"></i><span>Documents</span></div>
                    <div className="opt"><i className="fa-regular fa-image"></i><span>Pictures</span></div>
                    <div className="opt" onClick={handleSettingsButton}><i className="fa fa-gear"></i><span>Settings</span></div>
                    <div className="opt" onClick={handlePowerOffButton} ><i className="fa fa-power-off"><span>Power</span></i>
                    </div>
                    <Quit active={QuitMenu == true ? "active" : ""} />
                    <Settings active={SettingsMenu == true ? "active" : ""} />
                </div>
            </div>
            <div className="flex list">
                {apps.map(app => (
                    <div key={app.name} className="flex app">
                        <img src={app.logo} alt="" /><span>{app.name}</span>
                    </div>
                ))}
            </div>
            <div className="apps">

            </div>
        </div>

    )
}