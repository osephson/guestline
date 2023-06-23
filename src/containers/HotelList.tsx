import { useState, useEffect } from "react";
import { Container, Stack, Grid } from "@mui/material";

import { IHotelList, IFilter } from "../interfaces/hotels";
import { fetchHotels, fetchRooms } from "../api";

import HotelItem from "./HotelItem";
import { Filter } from "../components";

const COLLECTION_ID = "OBMNG";

const HotelList = () => {
  const [hotels, setHotels] = useState<IHotelList>([]);
  const [filter, setFilter] = useState<IFilter>({
    rating: 1,
    maxAdults: 0,
    maxChildren: 0,
  });

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
    <Stack marginTop={-4}>
      <Filter data={filter} onChange={setFilter} />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Grid container rowSpacing={2}>
          {!!hotels.length &&
            hotels.map((h, index) => (
              <Grid key={index} item xs={12}>
                <HotelItem data={h} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default HotelList;
