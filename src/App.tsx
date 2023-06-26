import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import HotelList from "./containers/HotelList";
import Header from "./containers/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <HotelList />
    </div>
  );
}

export default App;
