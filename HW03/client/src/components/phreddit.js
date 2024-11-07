import React, { useState } from "react";
import Banner from "./wireframe/Banner";
import NavBar from "./wireframe/NavBar";
import HomePage from "./pages/HomePage";
import { RoutingContext } from "../contexts/contexts";
import "../stylesheets/phreddit.css";

export default function Phreddit() {
  const [route, setRoute] = useState(<HomePage />);
  return (
    <RoutingContext.Provider value={{ route, setRoute }}>
      <Banner />
      <section className="body">
        <NavBar />
        <main className="page">{route}</main>
      </section>
    </RoutingContext.Provider>
  );
}
