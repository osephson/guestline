import axios from "axios";

import { IHotelList } from "../interfaces/hotels";

const API_BASE_URL = "https://obmng.dbm.guestline.net/api/";

axios.interceptors.request.use((config) => ({
  ...config,
  baseURL: API_BASE_URL,
}));

const fetchHotels = (collectionId: String) =>
  axios.get<IHotelList>("hotels", {
    params: {
      "collection-id": collectionId,
    },
  });

export { fetchHotels };
