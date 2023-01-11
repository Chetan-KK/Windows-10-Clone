import React from "react";
import './css/Quit.css'

export default function Quit(props){
    return(
        <div className={"Quit QuitMenu"+props.active}>
            <div className="quitButtons"><i className="fa-regular fa-moon"></i><span>Sleep</span></div>
            <div className="quitButtons"><i className="fa fa-power-off"></i><span>Shut down</span></div>
            <div className="quitButtons"><i className="fa-solid fa-rotate-right"></i><span>Restart</span></div>
        </div>
    )
}