import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading'
import { AppContext } from '../../context/AppContext'
import "../css/Restart.css"

function RestartScreen() {
    const [simulatePowerOff, setSimulatePowerOff] = useState(false)
    const { setShowRightClickMenu, setSubMenus, setShowApp, setShowRestartingScreen, setShowLoadingScreen } = useContext(AppContext)

    useEffect(() => {
        setTimeout(() => {
            setSimulatePowerOff(true)
            setTimeout(() => {
                setShowRestartingScreen(false)
                setSimulatePowerOff(false)
                setShowLoadingScreen(true)

                setTimeout(() => {
                    setShowLoadingScreen(false)
                    //to set the context menu div off the screen so that MainApp.jsx could get their heights
                    setShowRightClickMenu(true)
                    setSubMenus(prev => ({ ...prev, New: true }))

                    setShowApp(true)
                }, 2500)

            }, 1000)

        }, 2300)




    }, [])

    return (
        <div className="RestartScreen">
            {simulatePowerOff ? (
                <div style={{ height: "100vh", color: "black" }}>.</div>
            ) : (
                <Loading message="Restarting" />
            )}
        </div>

    )
}

export default RestartScreen