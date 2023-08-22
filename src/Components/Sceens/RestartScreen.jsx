import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading'
import { AppContext } from '../../context/AppContext'
import "../css/Restart.css"

function RestartScreen() {
    const [simulatePowerOff, setSimulatePowerOff] = useState(false)
    const { setShowApp, setShowRestartingScreen } = useContext(AppContext)

    useEffect(() => {
        // const timer = ms => new Promise(res => setTimeout(res, ms))
        // console.log("useEffect running")

        // (async () => {
        //         console.log("async function running")
        //         await timer(2300)
        //         setSimulatePowerOff(true)
        //         console.log("after first timer")

        //         await timer(1000)
        //         console.log("after second timer")
        //         setShowRestartingScreen(prev => !prev)
        //         setShowApp(prev => !prev)
        //         setSimulatePowerOff(false)

        //     })()

        setTimeout(() => {
            setSimulatePowerOff(true)
            setTimeout(() => {
                setShowRestartingScreen(false)
                setShowApp(true)
                setSimulatePowerOff(false)
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