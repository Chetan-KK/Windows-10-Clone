import React, { useContext, useState } from 'react'
import "../Components/css/Wifi.css"
import { AppContext } from "../context/AppContext";
export default function Wifi ()  {

    
    const {wifi} = useContext(AppContext)
    
    
  return (
    
    <div style={{  display: wifi ?  "block" : "none" }} class="global-box">
            <div className='wifiConnect'>
                <div  class= "headWifi">
                    <i className="fa-solid fa-wifi"></i>
                    <div style={{ marginLeft:"13px" }}>
                      <h5>AndroidAP345</h5>
                      <p style={{ color:"#c99679" }}>Connected, secured</p><br></br>
                      <a href='#'>Properties</a>
                    </div>
                </div>
                <button class= "disConnectBtn" >Disconnect</button>
            </div>

            
    </div>
  )
}
