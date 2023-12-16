import React, { useContext, useState } from 'react'
import "../Components/css/Wifi.css"
import { AppContext } from "../context/AppContext";
export default function Wifi ()  {

    
    const {wifi} = useContext(AppContext)
    
    
  return (
    
    <div style={{  display: wifi ?  "block" : "none" }} class="global-box">
            <div class='wifiConnect'>
                <div  class= "headWifi">
                    <i class="fa-solid fa-wifi"></i>
                    <div style={{ marginLeft:"13px" }}>
                      <h5>AndroidAP345</h5>
                      <p style={{ color:"#c99679" }}>Connected, secured</p><br></br>
                      <a href='#'>Properties</a>
                    </div>
                </div>
                <button class= "disConnectBtn" >Disconnect</button>
            </div>

            <div class="Network">
                <h5 style={{ marginLeft: "10px" }} >Network & Internt settings</h5>
                <p  style={{ color:"gray", marginLeft: "10px" }}>Change setting sush as making a connection metered</p><br></br>
                <div class= "box-newtork">
                    <div>
                        <i class="fa-solid fa-wifi"></i>
                        <p>Wifi</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-plane"></i>
                        <p>Airplane mode</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-wifi"></i>
                        <p>Mobile htosspot</p>

                    </div>
                </div>
            </div>
    </div>
  )
}
