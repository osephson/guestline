import { useState, useEffect, useMemo } from "react";
import { Container, Stack, Grid, Typography } from "@mui/material";

import { IHotelList, IFilter } from "../interfaces/hotels";
import { fetchHotels, fetchRooms } from "../api";

import HotelItem from "./HotelItem";
import { Filter } from "../components";
import config from "../config";

const cf = config();

const HotelList = () => {
  const [hotels, setHotels] = useState<IHotelList>([]);
  const [filter, setFilter] = useState<IFilter>({
    rating: 1,
    maxAdults: 0,
    maxChildren: 0,
  });
  const [loading, setLoading] = useState(false);

  const filteredHotels = useMemo(() => {
    const filtered: IHotelList = [];
    hotels.forEach((h) => {
      if (h.starRating < filter.rating) return;
      const rooms = h.rooms?.filter(
        (r) =>
          r.occupancy.maxAdults >= filter.maxAdults &&
          r.occupancy.maxChildren >= filter.maxChildren
      );
      filtered.push({
        ...h,
        rooms,
      });
    });
    return filtered;
  }, [hotels, filter]);

  useEffect(() => {
    setLoading(true);

    (async function () {
      const response = await fetchHotels(cf.collectionId);
      const hotels = response.data;

      const fetchRoomsPromises = hotels.map((h) =>
        fetchRooms(cf.collectionId, h.id)
      );
      const roomsResponse = await Promise.all(fetchRoomsPromises);

      hotels.forEach((h, index) => {
        h.rooms = roomsResponse[index].data.rooms;
      });

      setHotels(hotels);
      setLoading(false);
    })();
  }, []);

  return (
    <Stack marginTop={-4}>
      <Filter data={filter} onChange={setFilter} />
      <Container maxWidth="md" sx={{ my: 3 }}>
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <Grid container rowSpacing={2}>
            {!!filteredHotels.length &&
              filteredHotels.map((h, index) => (
                <Grid key={index} item xs={12}>
                  <HotelItem data={h} />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </Stack>
  );
};

export default HotelList;
