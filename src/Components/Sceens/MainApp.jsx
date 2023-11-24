import React, { useContext, useState, useRef, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import "../css/MainApp.css"
import Taskbar from '../Taskbar'
import wordIcon from "../../assets/wordIcon.png";
import excelIcon from "../../assets/excelIcon.png";

//widths and heights of viewpport
const Width = window.innerWidth
const Height = window.innerHeight

function MainApp() {
    const { totalApps, taskbarHeight } = useContext(AppContext)

    const [showRightClickMenu, setShowRightClickMenu] = useState(false)
    const [menuWidth, setMenuWidth] = useState(200)
    const [menuHeight, setMenuHeight] = useState(null)
    const [NewSubMenuHeight, setNewSubMenuHeight] = useState(null)
    const [menuTopPosition, setMenuTopPosition] = useState(0)
    const [menuLeftPostion, setMenuLeftPosition] = useState(0)
    const menuRef = useRef(null)
    const newSubMenuRef = useRef(null)
    const [subMenuBeOnRight, setSubMenuBeOnRight] = useState(true)
    const [newSubMenuBeOnTop, setNewSubMenuBeOnTop] = useState(false)
    const [subMenus, setSubMenus] = useState({
        view: false,
        SortBy: false,
        New: false
    })

    useEffect(() => {
        //setting the height of the menu div
        if (menuHeight == null && menuRef.current) {
            setMenuHeight(menuRef.current.offsetHeight)
        }
    }, [showRightClickMenu, menuHeight])

    useEffect(() => {
        if (NewSubMenuHeight == null && newSubMenuRef.current) {
            setNewSubMenuHeight(newSubMenuRef.current.offsetHeight)
            console.log("submenu of news's height is", newSubMenuRef.current.offsetHeight)
        }
    }, [subMenus.New, NewSubMenuHeight])

    /**Start of Submenus Functions */
    function handleViewSubMenu() {
        setSubMenus(prev => ({ ...prev, view: true }))
    }

    function hideViewSubMenu() {
        setSubMenus(prev => ({ ...prev, view: false }))
    }

    function handleSortBySubMenu() {
        setSubMenus(prev => ({ ...prev, SortBy: true }))
    }

    function hideSortBySubMenu() {
        setSubMenus(prev => ({ ...prev, SortBy: false }))
    }

    function handleNewSubMenu() {
        setSubMenus(prev => ({ ...prev, New: true }))
    }

    function hideNewSubMenu() {
        setSubMenus(prev => ({ ...prev, New: false }))
    }
    /**End of SubMenus Functions */

    function handleRightClick(e) {
        e.preventDefault()
        console.log("right clicked")
        contextMenuInitializer(e)
        setShowRightClickMenu(true)
    }

    function handleLeftClick() {
        if (showRightClickMenu) {
            setShowRightClickMenu(false)
            //close all open submenus
            setSubMenus(prev => ({
                view: false,
                SortBy: false,
                New: false
            }))
        }
    }

    /**Helper to initialize where and in what orientation the menu div should appear */
    function contextMenuInitializer(e) {
        //setting the direction of submenus to be always on right unless it goes beyond the screen
        setSubMenuBeOnRight(true)
        //setting the new submenu to not be moved to top unless it goes beyond the bottom of the screen
        setNewSubMenuBeOnTop(false)

        let y = e.clientY + 2 //just moved a bit to avoid hover effect
        let x = e.clientX

        //checks if menuDiv goes beyond right of the screen and adjust x
        if (x + menuWidth > Width) {
            x -= (x + menuWidth) - Width
            setSubMenuBeOnRight(false)
        }

        //checks if menuDiv goes beyond the bottom of the screen
        if (y + menuHeight > (Height - taskbarHeight)) {
            y -= (y + menuHeight) - (Height - taskbarHeight)
            setNewSubMenuBeOnTop(true)
        }

        //case if the submenu goes beyond right of the screen
        if (x + menuWidth + menuWidth > Width) {
            setSubMenuBeOnRight(false)
        }

        //if the New submenu goes below the bottom of the screen
        if (y + menuHeight + NewSubMenuHeight > (Height - taskbarHeight)) {
            setNewSubMenuBeOnTop(true)
        }


        setMenuTopPosition(y - 5)
        setMenuLeftPosition(x)
    }

    return (
        <div className="App">
            <div
                className='outerDiv'
                onContextMenu={handleRightClick}
                onClick={handleLeftClick}
            >
                <img
                    src="defaultWallpaper.jpg"
                    alt="windowsBackGroundImage"
                    style={{ height: "100%", width: "100%" }}
                />

                {showRightClickMenu && (
                    <div
                        className="menuDiv"
                        style={{
                            width: menuWidth,
                            top: menuTopPosition,
                            left: menuLeftPostion
                        }}
                        ref={menuRef}
                    >
                        <div
                            className="divWithSubMenu"
                            onMouseOver={handleViewSubMenu}
                            onMouseOut={hideViewSubMenu}
                        >

                            <div style={{
                                backgroundColor: "red",
                                marginLeft: "0%",
                                display: "flex", alignItems: "center", justifyContent: "flex-start",
                                padding: 0,
                                width: "60%"
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{
                                        height: "20%",
                                        width: "20%",
                                        backgroundColor: "green"
                                    }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "yellow",
                                        paddingLeft: 10
                                    }}>
                                    <p>View</p>
                                </div>

                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ height: "10%", width: "10%", paddingRight: "1%" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                            {subMenus.view && (
                                <div
                                    className='subMenuDiv'
                                    style={{
                                        width: menuWidth,
                                        left: subMenuBeOnRight ? null : "-103%",
                                        right: subMenuBeOnRight ? "-103%" : 0,
                                        top: "1%"
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "10%", height: "10%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                        </svg>

                                        <p style={{ marginLeft: "2% " }}>Large Icons</p>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                        </svg>
                                        <p style={{ marginLeft: "2% " }}>Medium Icons</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "6%", height: "6%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                        </svg>
                                        <p style={{ marginLeft: "2% " }}>Small Icons</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>

                                        <p style={{ marginLeft: "2% " }}>List</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                        </svg>

                                        <p style={{ marginLeft: "2% " }}>Details</p>
                                    </div>
                                </div>
                            )}


                        </div>

                        {/* Sort By */}
                        <div
                            className='divWithSubMenu'
                            onMouseOver={handleSortBySubMenu}
                            onMouseOut={hideSortBySubMenu}
                        >
                            <div className='menuDivWithASubMenu'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: "20%", height: "20%" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>

                                <div>
                                    <p>Sort By</p>
                                </div>
                            </div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ height: "10%", width: "10%", paddingRight: "1%" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                            {subMenus.SortBy && (
                                <div
                                    className='subMenuDiv'
                                    style={{
                                        width: menuWidth,
                                        left: subMenuBeOnRight ? null : "-103%",
                                        right: subMenuBeOnRight ? "-103%" : 0,
                                        top: "1%"
                                    }}
                                >
                                    <div style={{ paddingLeft: "2%" }}><p>Name</p></div>
                                    <div style={{ paddingLeft: "2%" }}><p>Size</p></div>
                                    <div style={{ paddingLeft: "2%" }}><p>Item Type</p></div>
                                    <div style={{ paddingLeft: "2%" }}><p>Date Modified</p></div>
                                </div>
                            )}

                        </div>

                        {/* Refresh */}
                        <div style={{ display: "flex", justifyContent: "flex-start", backgroundColor: "red", alignItems: "center" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                backgroundColor: "purple",
                                width: "18%"
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: "52%", height: "52%" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                            </div>
                            <div style={{ backgroundColor: "yellow" }}><p>Refresh</p></div>
                        </div>

                        <div className='menuSeparator'></div>

                        {/* Paste */}
                        <div className='menuDivWithNoSubMenu'>
                            <div className='divWithIconInMenuDivWithNoSubMenu'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: "52%", height: "52%" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>


                            </div>
                            <div><p>Paste</p></div>
                        </div>


                        {/* personalize */}
                        <div className="menuDivWithNoSubMenu">
                            <div className='divWithIconInMenuDivWithNoSubMenu'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: "52%", height: "52%" }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                            </div>
                            <div><p>Personailze</p></div>
                        </div>

                        <div className='menuSeparator'></div>

                        {/* NEW */}

                        <div
                            className='divWithSubMenu'
                            onMouseOver={handleNewSubMenu}
                            onMouseOut={hideNewSubMenu}
                        >
                            <div style={{ marginLeft: "18%" }}><p>New</p></div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ height: "10%", width: "10%", paddingRight: "1%" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                            {subMenus.New && (
                                <div
                                    className='subMenuDiv'
                                    style={{
                                        width: menuWidth,
                                        left: subMenuBeOnRight ? null : "-103%",
                                        right: subMenuBeOnRight ? "-103%" : 0,
                                        top: newSubMenuBeOnTop ? "-500%" : "1%"
                                    }}
                                    ref={newSubMenuRef}
                                >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                        </svg>

                                        <p style={{ marginLeft: "2%" }}>Folder</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>

                                        <p style={{ marginLeft: "2%" }}>Shortcut</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                        </svg>

                                        <p style={{ marginLeft: "2%" }}>Bitmap Image</p>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{ width: "8%", height: "8%" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>

                                        <p style={{ marginLeft: "2%" }}>Text Document</p></div>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={wordIcon} alt="microsoft word icon" style={{ width: "8%", height: "8%" }} />
                                        <p style={{ marginLeft: "2%" }}>Microsoft Word Document</p>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={excelIcon} alt="microsoft excel icon" style={{ width: "8%", height: "8%" }} />
                                        <p style={{ marginLeft: "2%" }}>Microsoft Excel Spreadsheet</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Display  */}
                        <div className='menuDivWithNoSubMenu'>
                            <div className='divWithIconInMenuDivWithNoSubMenu'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: "52%", height: "52%" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                </svg>


                            </div>
                            <div><p>Display</p></div>
                        </div>

                    </div>
                )}

            </div>


            <Taskbar totalApps={totalApps} />
        </div>
    )
}

export default MainApp