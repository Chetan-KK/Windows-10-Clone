import React, { useContext, useState, useRef, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import "../css/MainApp.css"
import Taskbar from '../Taskbar'

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
                                        left: subMenuBeOnRight ? null : "-110%",
                                        right: subMenuBeOnRight ? "-110%" : 0,
                                    }}
                                >
                                    <div style={{ marginLeft: "-12%" }}><p>Large Icons</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Medium Icons</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Small Icons</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>List</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Details</p></div>
                                </div>
                            )}


                        </div>

                        {/* Sort By */}
                        <div
                            className='divWithSubMenu'
                            onMouseOver={handleSortBySubMenu}
                            onMouseOut={hideSortBySubMenu}
                        >
                            <div
                                style={{
                                    marginLeft: "0%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    padding: 0,
                                    width: "60%"
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: "20%", height: "20%" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>

                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingLeft: 10
                                }}>
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
                                        left: subMenuBeOnRight ? null : "-115%",
                                        right: subMenuBeOnRight ? "-115%" : 0,
                                    }}
                                >
                                    <div style={{ marginLeft: "-12%" }}><p>Name</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Size</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Item Type</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Date Modified</p></div>
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
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: "18%"
                            }}>
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
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: "18%"
                            }}>
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
                                        left: subMenuBeOnRight ? null : "-115%",
                                        right: subMenuBeOnRight ? "-115%" : 0,
                                        top: newSubMenuBeOnTop ? "-500%" : null
                                    }}
                                    ref={newSubMenuRef}
                                >
                                    <div style={{ marginLeft: "-12%" }}><p>Folder</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Shortcut</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Bitmap Image</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Text Document</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Microsoft Word Document</p></div>
                                    <div style={{ marginLeft: "-12%" }}><p>Microsoft Excel Spreadsheet</p></div>
                                </div>
                            )}

                        </div>

                        {/* Display  */}
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: "18%"
                            }}>
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