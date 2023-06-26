import { useState, useCallback } from "react";

import { IHotelList } from "../interfaces/hotels";
import { fetchHotels, fetchRooms } from "../api";

const useHotels = () => {
  const [hotels, setHotels] = useState<IHotelList>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getHotelsAndRooms = useCallback(async (collectionId: string) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetchHotels(collectionId);
      const hotels = response.data;

      const fetchRoomsPromises = hotels.map((h) =>
        fetchRooms(collectionId, h.id)
      );
      const roomsResponse = await Promise.all(fetchRoomsPromises);

      hotels.forEach((h, index) => {
        h.rooms = roomsResponse[index].data.rooms;
      });

      setHotels(hotels);
      setErrorMessage("");
    } catch (e) {
      setErrorMessage("Sorry but unable to load hotels and their rooms!");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    hotels,
    loading,
    errorMessage,
    getHotelsAndRooms,
  };
};

export default useHotels;
