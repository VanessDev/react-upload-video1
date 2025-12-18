import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router";
import "../../assets/style/Layout.css";

function MainLayout() {
  const [filters, setFilters] = useState({
    title: "",
    theme: "",
    note: "",
    date: "",
  });

  return (
    <>
      <Header filters={filters} setFilters={setFilters} />

      <main>
        <Outlet context={{ filters }} />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
