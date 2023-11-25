import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './Components/App';
import userEvent from '@testing-library/user-event';

describe("right clcik functionality tests", () => {
    test("the component with the backgroud image is rendering", () => {
        render(<App />)
        waitFor(() => {
            expect(screen.getByAltText("windowsBackGroundImage")).toBeInTheDocument()
        }, { timeout: 3500 })

    })

    test("right click showing a menu div", async () => {
        render(<App />)

        waitFor(async () => {
            expect(screen.getByAltText("windowsBackGroundImage")).toBeInTheDocument()
            const menuText = "View"
            expect(screen.queryByText(menuText)).not.toBeInTheDocument()
            fireEvent.contextMenu(imageDiv)

            await waitFor(() => {
                const menuDiv = screen.getByText(/view/i)
                expect(menuDiv).toBeInTheDocument()
            })
        }, { timeout: 3500 })
    })

    test("submenus are displaying and hiding", () => {
        const user = userEvent.setup()
        render(<App />)

        waitFor(async () => {
            expect(screen.getByAltText("windowsBackGroundImage")).toBeInTheDocument()
            const imageDiv = screen.getByAltText("windowsBackGroundImage")

            fireEvent.contextMenu(imageDiv)

            const menuOptionView = screen.getByText(/view/i)
            const menuOptionSortBy = screen.getByText(/sort by/i)
            const menuOptionNew = screen.getByText(/new/i)

            const viewSubMenuText = "Large Icons"
            const sortBySubMenuText = "Name"
            const newSubMenuText = "Folder"

            const viewTab = screen.queryByText(viewSubMenuText)
            const sortByTab = screen.queryByText(sortBySubMenuText)
            const newTab = screen.queryByText(newSubMenuText)

            expect(viewTab).not.toBeInTheDocument()
            expect(sortByTab).not.toBeInTheDocument()
            expect(newTab).not.toBeInTheDocument()

            //hovering over elements
            await user.hover(menuOptionView)
            let divEl = screen.getByText(viewSubMenuText)
            expect(divEl).toBeInTheDocument()
            await user.unhover(menuOptionNew)
            expect(divEl).not.toBeInTheDocument()

            await user.hover(menuOptionSortBy)
            divEl = screen.getByText(sortBySubMenuText)
            expect(divEl).toBeInTheDocument()
            await user.unhover(menuOptionSortBy)
            expect(divEl).not.toBeInTheDocument()

            await user.hover(menuOptionNew)
            divEl = screen.getByText(newSubMenuText)
            expect(divEl).toBeInTheDocument()
            await user.unhover(menuOptionNew)
            expect(divEl).not.toBeInTheDocument()

            //check that the menu disappears on leftclick
            await user.click(imageDiv)
            expect(menuOptionView).not.toBeInTheDocument()
        })
    })

    test("context menu closes when the start menu is clicked", () => {
        const user = userEvent.setup()
        render(<App />)

        waitFor(async () => {
            expect(screen.getByAltText("windowsBackGroundImage")).toBeInTheDocument()
            const mainScreen = screen.getByAltText("clickableScreen")
            const startButton = screen.getByTestId("startButton")

            // expect(screen.getByText(/view/i)).toBeVisible()
            await user.contextMenu(mainScreen)
            const viewDiv = screen.getByText(/view/i)
            expect(viewDiv).toBeInTheDocument()

            //click the start button
            await user.click(startButton)
            expect(screen.getByText(/vs code/i)).toBeInTheDocument()

            //the context menu should disappear
            expect(screen.getByText(/view/i)).not.toBeInTheDocument()
        }, { timeout: 3500 })
    })
})