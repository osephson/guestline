import { Typography, Grid, Stack } from "@mui/material";
import { IRoom } from "../interfaces/hotels";

const Room = ({ data }: { data: IRoom }) => {
  const { name, longDescription, occupancy } = data;

  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item xs={3}>
        <Stack>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body1">
            {"Adults: " + occupancy.maxAdults}
          </Typography>
          <Typography variant="body1">
            {"Children: " + occupancy.maxChildren}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle2">{longDescription}</Typography>
      </Grid>
    </Grid>
  );
};

export default Room;
