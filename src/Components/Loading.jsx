import React from 'react'
import { Oval } from 'react-loader-spinner'
import "./css/Loading.css"

function Loading({ message }) {
    return (
        <div className='loadingCircle'>
            <Oval
                height={80}
                width={80}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#6b7280"
                strokeWidth={2}
                strokeWidthSecondary={3}
            />
            {/* <TestLoading /> */}
            <div
                style={{
                    textTransform: " capitalize",
                    color: "white",
                    marginTop: 10,
                    fontSize: 22
                }}
            >
                <p>{message}</p>
            </div>
        </div>
    )
}

function TestLoading() {
    return (
        <div style={{ "--size": "64px", "--dot-size ": "6px", "--dot-count": 6, "--color": "#fff", "--speed": "1s", "--spread": "60deg" }} className="dots">
            <div style={{ "--i": 0 }} className="dot"></div>
            <div style={{ "--i": 1 }} className="dot"></div>
            <div style={{ "--i": 2 }} className="dot"></div>
            <div style={{ "--i": 3 }} className="dot"></div>
            <div style={{ "--i": 4 }} className="dot"></div>
            <div style={{ "--i": 5 }} className="dot"></div>
        </div>
    )
}



export default Loading