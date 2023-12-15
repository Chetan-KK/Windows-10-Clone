import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import "../css/sleep.css"



function SleepScreen() {
    const [flagForDelay, setFlagForDelay] = useState(false)
    const { setShowRightClickMenu, setSubMenus, setShowApp, setShowSleepScreen } = useContext(AppContext)

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("keydown", handleMouseOrKeyboardAction)
            setFlagForDelay(true)
        }, 2500)

        return () => document.removeEventListener("keydown", handleMouseOrKeyboardAction)

    }, [])

    function handleMouseOrKeyboardAction() {
        //to set the context menu div off the screen so that MainApp.jsx could get their heights
        setShowRightClickMenu(true)
        setSubMenus(prev => ({ ...prev, New: true }))

        setShowApp(true)
        setShowSleepScreen(false)
    }

    return (
        <div {...flagForDelay && ({ "onMouseMoveCapture": handleMouseOrKeyboardAction })} className="SleepScreen">Sleep Screen</div>
    )
}

export default SleepScreen