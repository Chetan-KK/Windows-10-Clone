import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import "../css/sleep.css"



function SleepScreen() {
    const [flagForDelay, setFlagForDelay] = useState(false)
    const { setShowApp, setShowSleepScreen } = useContext(AppContext)

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("keydown", handleMouseOrKeyboardAction)
            setFlagForDelay(true)
        }, 2500)

        return () => document.removeEventListener("keydown", handleMouseOrKeyboardAction)

    }, [])

    function handleMouseOrKeyboardAction() {
        setShowApp(true)
        setShowSleepScreen(false)
    }

    return (
        <div {...flagForDelay && ({ "onMouseMoveCapture": handleMouseOrKeyboardAction })} className="SleepScreen">Sleep Screen</div>
    )
}

export default SleepScreen