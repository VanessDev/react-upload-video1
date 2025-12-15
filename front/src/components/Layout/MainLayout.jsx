import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router";
import "../../assets/style/Layout.css";

function MainLayout() {
    return (
        <>
            <Header/>
            <main>
                < Outlet />
            </main>
            <Footer/>
        </>        
    )
}

export default MainLayout