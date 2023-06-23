import { Rating, Container } from "@mui/material";
import UpDown from "./UpDown";
import { useState } from "react";

const Filter = () => {
  const [rating, setRating] = useState(0);
  const [maxAdults, setMaxAdults] = useState(0);
  const [maxChildren, setMaxChildren] = useState(0);

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        border: "2px solid black",
        py: 1,
      }}
    >
      <Rating
        value={rating}
        onChange={(e, v) => setRating(v ?? 0)}
        size="large"
      />
      <UpDown
        label="Adults: "
        lowerLimit={0}
        value={maxAdults}
        onChange={setMaxAdults}
      />
      <UpDown
        label="Children: "
        lowerLimit={0}
        value={maxChildren}
        onChange={setMaxChildren}
      />
    </Container>
  );
};

export default Filter;
