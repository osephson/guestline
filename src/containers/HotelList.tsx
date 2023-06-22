import { useState, useEffect } from "react";

import { HotelList as Hotels } from "../interfaces/hotels";
import { fetchHotels } from "../api";

const COLLECTION_ID = "OBMNG";

const HotelList = () => {
  const [hotels, setHotels] = useState<Hotels>([]);

  useEffect(() => {
    (async function () {
      const response = await fetchHotels(COLLECTION_ID);
      setHotels(response.data);
    })();
  }, []);

  return <h1>Hotel List</h1>;
};

export default HotelList;
