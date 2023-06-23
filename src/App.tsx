import React from "react";
import logo from "./logo.svg";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import HotelList from "./containers/HotelList";
import Header from "./containers/Header";

function App() {
  return (
    <div>
      <Header />
      <HotelList />
    </div>
  );
}

export default App;
