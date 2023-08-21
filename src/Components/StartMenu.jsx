import React, { useState } from "react"
import './css/StartMenu.css'
import Quit from "./Quit";
import Settings from "./Settings";

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

    function handlePowerOffButton() {
        setQuitMenu(!QuitMenu)
    }

    function handleSettingsButton() {
        setSettingsMenu(!SettingsMenu)
    }


    if (QuitMenu === true && SettingsMenu === true) {
        setQuitMenu(!QuitMenu)
    }

    return (
        <div className={"StartMenu StartMenu" + props.active}>
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