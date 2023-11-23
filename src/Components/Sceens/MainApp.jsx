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
    const [menuWidth, setMenuWidth] = useState(180)
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
        if (y + menuHeight > Height) {
            y -= (y + menuHeight) - Height
            setNewSubMenuBeOnTop(true)
        }

        //case if the submenu goes beyond right of the screen
        if (x + menuWidth + menuWidth > Width) {
            setSubMenuBeOnRight(false)
        }

        //if the New submenu goes below the bottom of the screen
        if (y + menuHeight + NewSubMenuHeight > Height) {
            setNewSubMenuBeOnTop(true)
        }


        setMenuTopPosition(y)
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
                            <p>View</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ height: "!0%", width: "10%", paddingRight: "1%" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                            {subMenus.view && (
                                <div
                                    className='subMenuDiv'
                                    style={{
                                        width: menuWidth,
                                        left: subMenuBeOnRight ? null : "-115%",
                                        right: subMenuBeOnRight ? "-115%" : 0,
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

                        <div
                            className='divWithSubMenu'
                            onMouseOver={handleSortBySubMenu}
                            onMouseOut={hideSortBySubMenu}
                        >
                            <p>Sort By</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ height: "!0%", width: "10%", paddingRight: "1%" }}>
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

                        <div><p>Refresh</p></div>

                        <div className='menuSeparator'></div>

                        <div><p>Paste</p></div>
                        <div><p>Personalize</p></div>
                        <div className='menuSeparator'></div>

                        <div
                            className='divWithSubMenu'
                            onMouseOver={handleNewSubMenu}
                            onMouseOut={hideNewSubMenu}
                        >
                            <p>New</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ height: "!0%", width: "10%", paddingRight: "1%" }}>
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

                        <div><p>Display Settings</p></div>

                    </div>
                )}

            </div>


            <Taskbar totalApps={totalApps} />
        </div>
    )
}

export default MainApp