import { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";

import { IHotelList } from "../interfaces/hotels";
import { fetchHotels, fetchRooms } from "../api";

import HotelItem from "./HotelItem";
import { Filter } from "../components";

const COLLECTION_ID = "OBMNG";

const HotelList = () => {
  const [hotels, setHotels] = useState<IHotelList>([]);

  useEffect(() => {
    (async function () {
      const response = await fetchHotels(COLLECTION_ID);
      const hotels = response.data;

      const fetchRoomsPromises = hotels.map((h) =>
        fetchRooms(COLLECTION_ID, h.id)
      );
      const roomsResponse = await Promise.all(fetchRoomsPromises);

      hotels.forEach((h, index) => {
        h.rooms = roomsResponse[index].data.rooms;
      });

      setHotels(hotels);
    })();
  }, []);

  return (
    <Container maxWidth="md">
      <Filter />
      <Grid container rowSpacing={2}>
        {!!hotels.length &&
          hotels.map((h, index) => (
            <Grid key={index} item xs={12}>
              <HotelItem data={h} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HotelList;
