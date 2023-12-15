import React, { useContext, useEffect } from 'react'
import Loading from '../Loading'
import "../css/ShutDown.css"
import { AppContext } from '../../context/AppContext'

function ShutDown() {
    const { setShowRightClickMenu, setSubMenus, setPowerOnScreen, setShutDown } = useContext(AppContext)
    useEffect(() => {
        setTimeout(() => {
            //to set the context menu div off the screen so that MainApp.jsx could get their heights
            setShowRightClickMenu(true)
            setSubMenus(prev => ({ ...prev, New: true }))

            setShutDown(prev => !prev)
            setPowerOnScreen(prev => !prev)

        }, 2500)
    },)

    return (
        <div className="ShutDownScreen">
            <Loading message="Windows is Shutting Down" />
        </div>
    )
}

export default ShutDown