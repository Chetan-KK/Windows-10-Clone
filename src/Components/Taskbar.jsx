import React, { useContext, useEffect, useState } from "react";
import "./css/Taskbar.css";
import Icon from "./Icon";
import StartMenu from "./StartMenu";
import { AppContext } from "../context/AppContext";
import NotificationCenter from "./NotificationCenter";
import Calandar from "./Calandar";

export default function Taskbar(props) {
  const date = new Date();
  const {
    startMenu,
    ifBlurByStartMenuPress,
    handleStartMenu,
    setIfBlurByStartMenuPress,
  } = useContext(AppContext);

  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarAnimationClass, setCalendarAnimationClass] = useState('');
  const [notificationAnimationClass, setNotificationAnimationClass] = useState('');

  useEffect(() => {
    if (ifBlurByStartMenuPress === true) {
      setIfBlurByStartMenuPress(false);
    }
  }, [ifBlurByStartMenuPress]);

  const toggleActionCenter = () => {
    if (showCalendar) {
      setCalendarAnimationClass('slide-out');
      setTimeout(() => setShowCalendar(false), 300); // Delay hiding the component after animation
    } else {
      setCalendarAnimationClass('slide-in');
      setShowCalendar(true);
    }

    if (showNotificationCenter) {
      setNotificationAnimationClass('slide-out');
      setTimeout(() => setShowNotificationCenter(false), 300);
    } else {
      setNotificationAnimationClass('slide-in');
      setShowNotificationCenter(true);
    }
  };

  return (
    <div className="flex Taskbar">
      <div className="left">
        <StartMenu active={startMenu ? "active" : ""} />
        <div
          data-testid="startButton"
          className="flex icon startButton"
          onMouseDown={() => setIfBlurByStartMenuPress(true)}
          onClick={handleStartMenu}
        >
          <i className="fa-brands fa-windows"></i>
        </div>
        {props.totalApps.map(
          (runningApp) =>
            runningApp.running && (
              <Icon
                key={runningApp.name}
                appName={runningApp.name}
                appIcon={runningApp.icon}
                activeStatus={runningApp.active}
              />
            )
        )}
      </div>
      <div className="flex right">
        <div className="icon flex arrow">
          <i className="fa-solid fa-chevron-up"></i>
        </div>
        <div className="icon flex battery">
          <i className="fa-sharp fa-solid fa-battery-three-quarters"></i>
        </div>
        <div className="icon flex network">
          <i className="fa-solid fa-wifi"></i>
        </div>
        <div className="icon flex volume">
          <i className="fa-solid fa-volume-high"></i>
        </div>
        <div className="icon flex language">ENG</div>
        <div className="action-center" onClick={toggleActionCenter}>
          <div className="icon flex date">
            <p>{date.getHours() + ":" + date.getMinutes()}</p>
            <p>
              {date.getDate() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getFullYear()}
            </p>
          </div>
          <div className="icon flex notification">
            <i className="fa-solid fa-message"></i>
          </div>
        </div>
        <div className="icon flex show-desktop"></div>
      </div>

      {/* Conditionally render Notification Center and Calendar with animations */}
      {showCalendar && (
        <div
          className={calendarAnimationClass}
          style={{
            position: "absolute",
            right:"20px", 
            top: "calc(-400px)", 
            zIndex: 1000, 
            backgroundColor: "white", 
            borderRadius: "10px", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          }}
        >
          <Calandar />
        </div>
      )}
      {showNotificationCenter && (
        <div
          className={notificationAnimationClass}
          style={{
            position: "absolute",
            right: "10px", 
            top: "calc(-355px)", 
            zIndex: 1000, 
            backgroundColor: "white", 
            borderRadius: "8px", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          }}
        >
          <NotificationCenter />
        </div>
      )}
    </div>
  );
}
