import React from "react";
import logo from "./logo.svg";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import HotelList from "./containers/HotelList";

function App() {
  return (
    <div>
      <HotelList />
    </div>
  );
}

export default App;
