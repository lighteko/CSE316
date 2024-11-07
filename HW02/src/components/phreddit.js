import React, { useState, useRef } from "react";
import Model from "../models/model";
import Banner from "./wireframe/Banner";
import NavBar from "./wireframe/NavBar";
import HomePage from "./pages/HomePage";
import { ServiceContext, RoutingContext } from "../contexts/contexts";
import ModelService from "../modules/services/ModelService";
import "../stylesheets/phreddit.css";

export default function Phreddit() {
  const model = useRef(new Model());
  const service = useRef(new ModelService(model.current));
  const [route, setRoute] = useState(<HomePage />);
  return (
    <RoutingContext.Provider value={{ route, setRoute }}>
      <ServiceContext.Provider value={service.current}>
        <Banner />
        <section className="body">
          <NavBar />
          <main className="page">{route}</main>
        </section>
      </ServiceContext.Provider>
    </RoutingContext.Provider>
  );
}
