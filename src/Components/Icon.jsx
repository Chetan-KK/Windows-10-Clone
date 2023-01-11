import React,{useState} from "react";

export default function Icon(props){

    const [activeApp,setActiveApp] = useState('');

    function handleActiveApp(){
        activeApp === ' active'?setActiveApp(''):setActiveApp(' active')
    }
    
    return(
        <div className={"flex icon icon-1"+activeApp} onClick={handleActiveApp}>
            <img src={props.appIcon} alt="" title={props.appName} />
        </div>
    )
}