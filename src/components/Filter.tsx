import { Rating, Container } from "@mui/material";
import UpDown from "./UpDown";

import { IFilter, Occupancy } from "../interfaces/hotels";

export interface IFilterProps {
  data: IFilter;
  onChange: (filter: IFilter) => void;
}

const Filter = ({ data, onChange }: IFilterProps) => {
  const onChangeRating = (
    _: React.SyntheticEvent<Element, Event>,
    v: number | null
  ) => {
    onChange({
      ...data,
      rating: v ?? data.rating,
    });
  };

  const onChangeOccupancy = (type: Occupancy) => (v: number) => {
    onChange({
      ...data,
      [type === "adults" ? "maxAdults" : "maxChildren"]: v,
    });
  };

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
        backgroundColor: "#eafcff",
      }}
    >
      <Rating value={data.rating} onChange={onChangeRating} size="large" />
      <UpDown
        label="Adults: "
        lowerLimit={0}
        value={data.maxAdults}
        onChange={onChangeOccupancy("adults")}
      />
      <UpDown
        label="Children: "
        lowerLimit={0}
        value={data.maxChildren}
        onChange={onChangeOccupancy("children")}
      />
    </Container>
  );
};

export default Filter;
