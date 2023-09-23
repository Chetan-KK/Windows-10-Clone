import React, { useContext } from 'react'
import "../css/PowerOn.css"
import { AppContext } from '../../context/AppContext'

function PowerOnScreen() {
    const { initiatePowerOnSequence, setPowerOnScreen, setShowLoadingScreen } = useContext(AppContext)

    function powerOn() {
        setPowerOnScreen(false)
        setShowLoadingScreen(true)
        initiatePowerOnSequence()
    }

    return (
        <div className="powerOn">
            <div
                style={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}
                onClick={powerOn}>
                <><i className="fa-solid fa-power-off fa-2xl" style={{ color: "#ffffff" }}></i></>
                <div style={{ color: "#ffffff", marginTop: 20 }}>Power On</div>
            </div>

        </div>
    )
}

export default PowerOnScreen