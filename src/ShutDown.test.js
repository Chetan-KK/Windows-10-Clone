import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import ShutDown from "./Components/Sceens/ShutDown";
import { AppContext } from "./context/AppContext";
import Quit from "./Components/Quit";
import userEvent from "@testing-library/user-event";
import App from "./Components/App";

describe("ShutDown", () => {
    test("ShutDown screen is rendering", () => {
        const setPowerOnScreen = jest.fn()
        const setShutDown = jest.fn()
        render(
            <AppContext.Provider value={{ setPowerOnScreen, setShutDown }}>
                <ShutDown />
            </AppContext.Provider>
        )
        expect(screen.getByText(/windows is shutting down/i)).toBeInTheDocument()
    })

    test("Shutdown button is working", async () => {
        const setShowSleepScreen = jest.fn()
        const setShowApp = jest.fn()
        const setStartMenu = jest.fn()
        const setShowRestartingScreen = jest.fn()
        const setShutDown = jest.fn()

        render(
            <AppContext.Provider value={{ setShowSleepScreen, setShowApp, setStartMenu, setShowRestartingScreen, setShutDown }}>
                <Quit />
            </AppContext.Provider>
        )
        const shutdownButton = screen.getByText(/shut down/i)
        expect(shutdownButton).toBeInTheDocument()
        await userEvent.click(shutdownButton)
        expect(setShutDown).toHaveBeenCalledTimes(1)
    })

    test("ShutDown screen is displaying in the App", async () => {
        render(<App />)

        waitFor(async () => {
            const shutdownButton = screen.getByText(/shut down/i)
            expect(shutdownButton).toBeInTheDocument()
            await userEvent.click(shutdownButton)
        })

        waitFor(() => {
            expect(screen.getByText(/shut down/i)).not.toBeInTheDocument()
            expect(screen.getByText(/windows is shutting/i)).toBeInTheDocument()
        })

    })
})