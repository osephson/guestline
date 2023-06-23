import axios from "axios";

import { IHotelList, IRoomsResponse } from "../interfaces/hotels";

const API_BASE_URL = "https://obmng.dbm.guestline.net/api/";

axios.interceptors.request.use((config) => ({
  ...config,
  baseURL: API_BASE_URL,
}));

const fetchHotels = (collectionId: string) =>
  axios.get<IHotelList>("hotels", {
    params: {
      "collection-id": collectionId,
    },
  });

const fetchRooms = (collectionId: string, hotelId: string) =>
  axios.get<IRoomsResponse>(`roomRates/${collectionId}/${hotelId}`);

export { fetchHotels, fetchRooms };
