import { Paper, Stack, Divider, Typography, Link, Box } from "@mui/material";

import { Hotel, Room } from "../components";
import { IHotel } from "../interfaces/hotels";
import { useState } from "react";

const LIMIT_SHOW = 3;

const HotelItem = ({ data }: { data: IHotel }) => {
  const { rooms } = data;
  const roomCount = rooms?.length ?? 0;
  const canToggleShowMore = roomCount > LIMIT_SHOW;

  const [showMore, setShowMore] = useState(roomCount > LIMIT_SHOW);

  const showingRooms = rooms?.slice(
    0,
    showMore === true ? LIMIT_SHOW : roomCount
  );

  const onShowMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <Paper elevation={3}>
      <Hotel data={data} />
      <Stack>
        {!!roomCount ? (
          <>
            {showingRooms?.map((r, index) => (
              <Box key={index}>
                <Divider />
                <Room data={r} />
              </Box>
            ))}
            {canToggleShowMore && (
              <Link
                role="show-more"
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
            role="no-room-claim"
            variant="h6"
            textAlign={"center"}
            pb={2}
          >{`No room that meets the filter`}</Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default HotelItem;
