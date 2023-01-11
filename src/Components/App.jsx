import { useState } from 'react'
import './css/App.css'
import Taskbar from './Taskbar'

// import defaultWallpaper from './assets/default-wallpaper.jpg'

function constructor(){
  // console.log(document.documentElement.requestFullscreen)
}
constructor();



function App() {

  const [totalApps,setTotalApps] = useState([
    {
        name:"chrome",
        icon:"chromeIcon.svg",
        running:"true",
        active:"false"

    },
    {
        name:"explorer",
        icon:"fileExplorer.png",
        running:"false",
        active:"false"
    },
    {
        name:"visual studio code",
        icon:"vsCode.png",
        running:"false",
        active:"false"
    }
  ])

  return (
    <div className="App">
      <img className='mainWallpaper' src="defaultWallpaper.jpg" alt="" />
      <Taskbar totalApps={totalApps} />

    </div>
  )
}

export default App
