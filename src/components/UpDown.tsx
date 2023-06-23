import { Link, Typography, Box } from "@mui/material";
import { useMemo } from "react";

interface IUpDownProps {
  label: string;
  value: number;
  upperLimit?: number;
  lowerLimit?: number;
  onChange: (value: number) => void;
}

const UpDown = ({
  label = "",
  value = 0,
  upperLimit = undefined,
  lowerLimit = undefined,
  onChange,
}: IUpDownProps) => {
  const reachedUpperLimit = useMemo(
    () => (upperLimit !== undefined ? value >= upperLimit : false),
    [value, upperLimit]
  );
  const reachedLowerLimit = useMemo(
    () => (lowerLimit !== undefined ? value <= lowerLimit : false),
    [value, lowerLimit]
  );

  const onAction = (direction: "up" | "down") => () => {
    onChange(value + (direction === "up" ? 1 : -1));
  };

  return (
    <Box display={"flex"} alignItems={"baseline"}>
      {!!label && <Typography component={"span"}>{label}</Typography>}
      <Link
        component={"button"}
        sx={{ mx: "3px", fontWeight: "bold" }}
        underline="none"
        onClick={onAction("up")}
        disabled={reachedUpperLimit}
      >
        {"+"}
      </Link>
      <Typography component={"span"}>{value}</Typography>
      <Link
        component={"button"}
        sx={{ mx: "3px", fontWeight: "bold" }}
        underline="none"
        onClick={onAction("down")}
        disabled={reachedLowerLimit}
      >
        {"-"}
      </Link>
    </Box>
  );
};

export default UpDown;
