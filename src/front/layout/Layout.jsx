import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
  return (
    <>
      {/* <Navbar/> */}

      <main className="d-flex flex-column">
        <Outlet />
      </main>

      {/* <Sidebar/> */}
    </>
  );
};