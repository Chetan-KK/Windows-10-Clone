import React, { useContext, useEffect, useState } from "react";
import './css/Taskbar.css'

import Icon from "./Icon";
import StartMenu from "./StartMenu";
import { AppContext } from "../context/AppContext";

export default function Taskbar(props) {

    const date = new Date();
    const { taskbarHeight, startMenu, ifBlurByStartMenuPress, handleStartMenu, setIfBlurByStartMenuPress } = useContext(AppContext)

    useEffect(() => {
        if (ifBlurByStartMenuPress === true) {
            setIfBlurByStartMenuPress(false)
        }
    }, [ifBlurByStartMenuPress])

    return (
        <div
            className="flex Taskbar"
            style={{ height: taskbarHeight }}
        >
            <div className="left">
                <StartMenu active={startMenu == true ? "active" : ""} />
                <div data-testid="startButton" className="flex icon startButton" onMouseDown={() => setIfBlurByStartMenuPress(true)} onClick={handleStartMenu}>
                    <i className="fa-brands fa-windows"></i>
                </div>
                {props.totalApps.map(runningApp => (
                    runningApp.running == true && <Icon key={runningApp.name} appName={runningApp.name} appIcon={runningApp.icon} activeStatus={runningApp.active} />
                ))
                }
            </div>
            <div className="flex right">
                <div className="icon flex arrow">
                    <i className="fa-solid fa-chevron-up"></i>
                </div>
                <div className="icon flex battry">
                    <i className="fa-sharp fa-solid fa-battery-three-quarters"></i>
                </div>
                <div className="icon flex network">
                    <i className="fa-solid fa-wifi"></i>
                </div>
                <div className="icon flex volume">
                    <i className="fa-solid fa-volume-high"></i>
                </div>
                <div className="icon flex language">
                    ENG
                </div>
                <div className="icon flex date">
                    <p>
                        {date.getHours() + ":" + date.getMinutes()}
                    </p>
                    <p>
                        {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}
                    </p>
                </div>
                <div className="icon flex notification">
                    <i className="fa-solid fa-message"></i>
                </div>
                <div className="icon flex show-desktop"></div>
            </div>
        </div>
    )
}