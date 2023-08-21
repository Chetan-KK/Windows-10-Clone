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
            <div
                style={{
                    textTransform: " capitalize",
                    color: "white",
                    marginTop: 10,
                    fontSize: 22
                }}
            >
                <p>please wait</p>
            </div>
        </div>
    )
}

export default Loading