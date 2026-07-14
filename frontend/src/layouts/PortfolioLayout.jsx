import { Outlet } from "react-router-dom";

function PortfolioLayout() {
    return (
        <div>
            <p>Portfolio Layout</p>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default PortfolioLayout;