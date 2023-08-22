import React from "react"
import { screen, render, waitFor } from "@testing-library/react"
import RestartScreen from "./Components/Sceens/RestartScreen"
import App from "./Components/App"
import { AppContext } from "./context/AppContext"
import Quit from "./Components/Quit"
import userEvent from "@testing-library/user-event"

describe("Restarting Functionality", () => {
    test("Restarting Screen Renders Properly", () => {
        const setShowApp = jest.fn()
        const setShowRestartingScreen = jest.fn()

        render(
            <AppContext.Provider value={{ setShowApp, setShowRestartingScreen }}>
                <RestartScreen />
            </AppContext.Provider>
        )

        expect(screen.getByText(/restarting/i)).toBeInTheDocument()
    })

    test("restart button is getting pressed", async () => {
        const setShowRestartingScreenMock = jest.fn()
        const setShowSleepScreen = jest.fn()
        const setShowApp = jest.fn()
        const setStartMenu = jest.fn()

        render(
            <AppContext.Provider value={{
                setShowRestartingScreen: setShowRestartingScreenMock,
                setShowSleepScreen, setShowApp, setStartMenu
            }}>
                <Quit />
            </AppContext.Provider>
        )

        const restartButton = screen.getByText(/restart/i)
        expect(restartButton).toBeInTheDocument()
        await userEvent.click(restartButton)
        expect(setShowRestartingScreenMock).toHaveBeenCalledTimes(1)

    })


    test("App renders Back after restarting", async () => {
        render(<App />)
        await waitFor(async () => {
            const restartButton = screen.getByText(/restart/i)
            await userEvent.click(restartButton)

        }, { timeout: 3000 })

        await waitFor(() => {
            expect(screen.getByText(/please wait/i)).toBeInTheDocument()
        }, { timeout: 3000 })

        await waitFor(() => {
            expect(screen.getByText(/eng/i)).toBeInTheDocument()
        }, { timeout: 5000 })
    })
})