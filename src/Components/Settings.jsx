import { useState } from 'react';
import './css/Settings.css'
import Display from './Display';
function Settings(props){
    
    const[DisplayMenu , setDisplayMenu] = useState(false)

    function DiplayHandler(){
        setDisplayMenu(!DisplayMenu)
    }
    

    return(
        <div className={"Settings SettingsMenu" + props.active}>
            <div className="SettingsButtons" onClick={DiplayHandler}><i className="fa-solid fa-display"></i><span>Display</span></div>
            <div className="SettingsButtons"><i className="fa-solid fa-volume-high"></i><span>Sound</span></div>
            <div className="SettingsButtons"><i className="fa-solid fa-database"></i><span>Storage</span></div>
            <div className="SettingsButtons"><i className="fa-solid fa-circle-info"></i><span>About</span></div>
            <Display active={DisplayMenu===true ? "active" : ""}/>
        </div>
    )
}

export default Settings;