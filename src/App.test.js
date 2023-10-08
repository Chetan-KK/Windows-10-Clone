import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import App from "./Components/App";
import userEvent from "@testing-library/user-event";
import Quit from "./Components/Quit";


test("Initial test", () => {
    render(<App />)
    expect(true).toBe(true)
})

test("the loading screen is loading properly", async () => {
    render(<App />)
    let loadingScreen = screen.getByText(/please wait/i)
    expect(loadingScreen).toBeInTheDocument()

    await waitFor(() => {
        expect(screen.getByText(/eng/i)).toBeInTheDocument()
        expect(loadingScreen).not.toBeInTheDocument()
    }, { timeout: 3000 })
})

test("The Start button is functioning properly", async () => {
    render(<App />)

    await waitFor(async () => {
        const startButton = screen.getByTestId("startButton")
        expect(startButton).toBeInTheDocument()

        // const user = userEvent.setup()
        const startDiv = screen.getByTestId("startMenuDiv")
        expect(startDiv).not.toHaveFocus()
        await userEvent.click(startButton)
        const chrome = screen.getByText(/chrome/i)
        const vsCode = screen.getByText(/vs code/i)
        expect(chrome).toBeVisible()
        expect(vsCode).toBeVisible()

        expect(startDiv).toHaveFocus()

    }, { timeout: 5000 })

})

test("Start button closing and losing focus when other areas are clicke", async () => {
    render(<App />)
    await waitFor(async () => {
        const startButton = screen.getByTestId("startButton")

        const startDiv = screen.getByTestId("startMenuDiv")

        await userEvent.click(startButton)
        expect(startDiv).toHaveFocus()

        await userEvent.click(backgroundImage)

        expect(startDiv).not.toHaveFocus()

    }, { timeout: 5000 })
})


