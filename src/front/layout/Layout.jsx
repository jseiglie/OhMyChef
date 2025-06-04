import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar"



export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};