import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import "../css/sleep.css"


function SleepScreen() {
    const { setShowApp, setShowSleepScreen } = useContext(AppContext)

    function handleMouseOrKeyboardAction() {
        setShowApp(prev => !prev)
        setShowSleepScreen(prev => !prev)
    }

    return (
        <div onKeyDown={handleMouseOrKeyboardAction} onMouseMoveCapture={handleMouseOrKeyboardAction} className="SleepScreen">Sleep Screen</div>
    )
}

export default SleepScreen