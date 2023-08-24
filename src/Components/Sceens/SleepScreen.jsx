import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../../context/AppContext'
import "../css/sleep.css"



function SleepScreen() {
    const { setShowApp, setShowSleepScreen } = useContext(AppContext)

    const divRef = useRef()
    useEffect(() => {
        document.addEventListener("keydown", handleMouseOrKeyboardAction)
    }, [])

    function handleMouseOrKeyboardAction() {
        setShowApp(true)
        setShowSleepScreen(false)
    }

    return (
        <div onMouseMoveCapture={handleMouseOrKeyboardAction} className="SleepScreen">Sleep Screen</div>
    )
}

export default SleepScreen