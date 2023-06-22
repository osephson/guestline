import { Typography, Rating, Stack, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { IHotel } from "../interfaces/hotels";

const Hotel = ({ data }: { data: IHotel }) => {
  const { name, address1, address2, images, starRating } = data;

  return (
    <Grid container columnSpacing={2} sx={{ p: 2 }}>
      <Grid item xs={3}>
        <Carousel indicators={false} sx={{ maxWidth: 200 }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              width={200}
              height={150}
              style={{ objectFit: "cover" }}
              alt="Room"
            />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={6}>
        <Stack>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{address1}</Typography>
          <Typography variant="body1">{address2}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={3} sx={{ textAlign: "right" }}>
        <Rating value={starRating} readOnly size="large" />
      </Grid>
    </Grid>
  );
};

export default Hotel;
