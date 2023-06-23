import { Paper, Stack, Divider, Typography, Link } from "@mui/material";

import { Hotel, Room } from "../components";
import { IHotel } from "../interfaces/hotels";
import { useState } from "react";

const LIMIT_SHOW = 3;

const HotelItem = ({ data }: { data: IHotel }) => {
  const { rooms } = data;
  const roomCount = rooms?.length ?? 0;

  const [showMore, setShowMore] = useState<"none" | true | false>(
    roomCount > LIMIT_SHOW ? true : "none"
  );
  const showingRooms = rooms?.slice(
    0,
    showMore === true ? LIMIT_SHOW : roomCount
  );

  const onShowMoreToggle = () => {
    if (showMore === "none") return;
    setShowMore(!showMore);
  };

  return (
    <Paper elevation={3}>
      <Hotel data={data} />
      <Stack>
        {!!roomCount ? (
          <>
            {showingRooms?.map((r, index) => (
              <>
                <Divider />
                <Room key={index} data={r} />
              </>
            ))}
            {showMore !== "none" && (
              <Link
                component={"button"}
                variant="subtitle1"
                onClick={onShowMoreToggle}
              >
                {showMore
                  ? `Show more (${roomCount - LIMIT_SHOW})`
                  : "Show less"}
              </Link>
            )}
          </>
        ) : (
          <Typography
            variant="h6"
            textAlign={"center"}
          >{`No room that meets the filter`}</Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default HotelItem;
