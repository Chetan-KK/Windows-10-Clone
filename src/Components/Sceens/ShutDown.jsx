import React, { useContext, useEffect } from 'react'
import Loading from '../Loading'
import "../css/ShutDown.css"
import { AppContext } from '../../context/AppContext'

function ShutDown() {
    const { setPowerOnScreen, setShutDown } = useContext(AppContext)
    useEffect(() => {
        setTimeout(() => {
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