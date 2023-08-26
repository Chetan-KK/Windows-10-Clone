import React from "react";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Quit from "./Components/Quit";
import App from "./Components/App";
import { AppContext } from "./context/AppContext";
import SleepScreen from "./Components/Sceens/SleepScreen";


describe("Sleep functionality", () => {
    test("Sleep Function renders Properly", () => {
        const setShowApp = jest.fn()
        const setShowSleepScreen = jest.fn()

        render(
            <AppContext.Provider value={{ setShowApp, setShowSleepScreen }}>
                <Quit />
            </AppContext.Provider>
        )
        const sleepButton = screen.getByText(/sleep/i)
        expect(sleepButton).toBeInTheDocument()
    })

    test("Sleep function works as expected using a mouse", async () => {
        render(<App />)

        waitFor(async () => {
            const sleepButton = screen.getByText(/sleep/i)
            expect(sleepButton).toBeInTheDocument()
            await userEvent.click(sleepButton)
            expect(sleepButton).not.toBeInTheDocument()
            expect(screen.getByText(/sleep screen/i)).toBeInTheDocument()

            //mouse movement
            const targetEL = screen.getByText(/sleep screen/i)
            await userEvent.pointer({ target: targetEL })
            expect(targetEL).not.toBeInTheDocument()
            expect(screen.getByText(/sleep/i)).toBeInTheDocument()

        }, { timeout: 4000 })

    })



    test("Sleep function works as expected using a keyBoard", async () => {
        render(<App />)

        waitFor(async () => {
            const sleepButton = screen.getByText(/sleep/i)
            await userEvent.click(sleepButton)
            //Key Press
            const targetEL = screen.getByText(/sleep screen/i)
            fireEvent.keyDown(targetEL, { key: "A" })
            expect(targetEL).not.toBeInTheDocument()
            expect(screen.getByText(/eng/i)).toBeInTheDocument()

        }, { timeout: 4000 })

    })

    test("key press function is getting called in Sleep Screen component", async () => {
        const setShowApp = jest.fn()
        const setShowSleepScreen = jest.fn()
        // const keypressMock = jest.fn()
        render(
            <AppContext.Provider value={{ setShowApp, setShowSleepScreen }}>
                <SleepScreen />
            </AppContext.Provider>
        )
        // const sleepScreen = screen.getByText(/sleep screen/i)
        waitFor(() => {
            fireEvent.keyDown(document, { key: "a" })
            expect(setShowApp).toHaveBeenCalledTimes(1)
            expect(setShowSleepScreen).toHaveBeenCalledTimes(1)
        })

    })



})