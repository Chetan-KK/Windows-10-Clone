import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import App from "./Components/App";

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