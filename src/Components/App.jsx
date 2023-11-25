import { useEffect, useState } from 'react'
import './css/App.css'
import Taskbar from './Taskbar'
import Loading from './Loading';
import { AppContext } from '../context/AppContext';
import SleepScreen from './Sceens/SleepScreen';
import RestartScreen from './Sceens/RestartScreen';
import ShutDown from './Sceens/ShutDown';
import PowerOnScreen from './Sceens/PowerOnScreen';
import MainApp from './Sceens/MainApp';

// import defaultWallpaper from './assets/default-wallpaper.jpg'

function constructor() {
  // console.log(document.documentElement.requestFullscreen)
}
constructor();



function App() {
  //used by TaskBar.jsx
  const taskbarHeight = 40

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
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [startMenu, setStartMenu] = useState(false)
  const [isStartButtonActive, setIsStartButtonActive] = useState(false)
  const [ifBlurByStartMenuPress, setIfBlurByStartMenuPress] = useState(false)
  const [showApp, setShowApp] = useState(false)
  const [showSleepScreen, setShowSleepScreen] = useState(false)
  const [ShowRestartingScreen, setShowRestartingScreen] = useState(false)
  const [shutDown, setShutDown] = useState(false)
  const [powerOnScreen, setPowerOnScreen] = useState(false)

  /**States used by MainApp.jsx */
  const [subMenus, setSubMenus] = useState({
    view: false,
    SortBy: false,
    New: true // to get the height of sub menu of option "new" when the app renders
  })
  const [showRightClickMenu, setShowRightClickMenu] = useState(true)  //setting it initially to true to get its height in useEffect below
  /**END for MainApp.jsx*/

  useEffect(() => {
    initiatePowerOnSequence()
  }, [])

  useEffect(() => {
    if (startMenu === false && isStartButtonActive === true) {
      setIsStartButtonActive(false)
    }
  }, [startMenu, isStartButtonActive])


  function initiatePowerOnSequence() {
    setTimeout(() => {
      setShowLoadingScreen(false)
      setShowApp(true)
    }, 2500);
  }


  function handleStartMenu() {
    changeStartMenuStatus()

    //closing the context menu if it was open
    if (showRightClickMenu) {
      setShowRightClickMenu(false)
      setSubMenus(prev => ({
        view: false,
        SortBy: false,
        New: false
      })
      )
    }

  }



  // Check docs on handleBlur in StartMenu.jsx to understand how this with combination of that function works
  function changeStartMenuStatus() {
    if (startMenu === isStartButtonActive) {
      setStartMenu(prevState => !prevState)
      setIsStartButtonActive(prev => !prev)
    }
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
      setShowLoadingScreen,
      setShutDown,
      setPowerOnScreen,
      initiatePowerOnSequence,
      totalApps,
      taskbarHeight,
      subMenus,
      setSubMenus,
      showRightClickMenu,
      setShowRightClickMenu
    }}
    >
      {showLoadingScreen && (
        <div className="loadingScreen">
          <Loading message="please wait" />
        </div>)
      }
      {showApp && (
        <MainApp />
      )}

      {/* Sleep Screen */}
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

      {/* Shut Down Screen */}
      {shutDown && (
        <ShutDown />
      )}

      {/* Power On Screen */}
      {
        powerOnScreen && (
          <PowerOnScreen />
        )
      }


    </AppContext.Provider>
  )
}

export default App
