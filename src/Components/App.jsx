import { useEffect, useState } from 'react'
import './css/App.css'
import Taskbar from './Taskbar'
import Loading from './Loading';
import { AppContext } from '../context/AppContext';
import SleepScreen from './Sceens/SleepScreen';
import RestartScreen from './Sceens/RestartScreen';

// import defaultWallpaper from './assets/default-wallpaper.jpg'

function constructor() {
  // console.log(document.documentElement.requestFullscreen)
}
constructor();



function App() {

  const [totalApps, setTotalApps] = useState([
    {
      name: "chrome",
      icon: "chromeIcon.svg",
      running: "true",
      active: "false"

    },
    {
      name: "explorer",
      icon: "fileExplorer.png",
      running: "false",
      active: "false"
    },
    {
      name: "visual studio code",
      icon: "vsCode.png",
      running: "false",
      active: "false"
    }
  ])
  const [showLoadingScreen, setshowLoadingScreen] = useState(true)
  const [startMenu, setStartMenu] = useState(false)
  const [isStartButtonActive, setIsStartButtonActive] = useState(false)
  const [ifBlurByStartMenuPress, setIfBlurByStartMenuPress] = useState(false)
  const [showApp, setShowApp] = useState(false)
  const [showSleepScreen, setShowSleepScreen] = useState(false)
  const [ShowRestartingScreen, setShowRestartingScreen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setshowLoadingScreen(false)
      setShowApp(true)
    }, 2500);
  }, [])


  function handleStartMenu() {
    // console.log("Clicked Furrukh")
    // setStartMenu(prevState => !prevState)
    changeStartMenuStatus()
  }

  useEffect(() => {
    if (startMenu === false && isStartButtonActive === true) {
      setIsStartButtonActive(false)
    }
  }, [startMenu, isStartButtonActive])


  function changeStartMenuStatus() {
    // console.log("StartMenu in App.js : ", startMenu, "isStartButton : ", isStartButtonActive)
    if (startMenu === isStartButtonActive) {
      setStartMenu(prevState => !prevState)
      setIsStartButtonActive(prev => !prev)
    }
    // else {
    //   if (startMenu === false) {
    //     setIsStartButtonActive(false)
    //   }
    //   else {
    //     console.log("ELSE :: StartMenu in Else : ", startMenu, "isStartButton : ", isStartButtonActive)
    //   }
    // }
    // else if (startMenu === false && isStartButtonActive === true) {
    //   setIsStartButtonActive(false)
    // }
    // console.log("After CHange : StartMenu in App.js : ", startMenu, "isStartButton : ", isStartButtonActive)
  }

  return (
    <AppContext.Provider value={{
      startMenu,
      setStartMenu,
      handleStartMenu,
      isStartButtonActive,
      setIsStartButtonActive,
      ifBlurByStartMenuPress,
      setIfBlurByStartMenuPress,
      setShowSleepScreen,
      setShowApp,
      setShowRestartingScreen,
    }}
    >
      {showLoadingScreen && (
        <div className="loadingScreen">
          <Loading message="please wait" />
        </div>)
      }
      {showApp && (
        <div className="App">
          <img className='mainWallpaper' src="defaultWallpaper.jpg" alt="windowsBackGroundImage" />
          <Taskbar totalApps={totalApps} />

        </div>
      )}

      {
        showSleepScreen && (
          <>
            <SleepScreen />
          </>
        )
      }

      {/* restarting Screen */}
      {
        ShowRestartingScreen && (
          <RestartScreen />
        )
      }


    </AppContext.Provider>
  )
}

export default App
