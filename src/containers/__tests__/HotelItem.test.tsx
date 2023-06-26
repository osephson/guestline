import { render, screen } from "@testing-library/react";

import HotelItem from "../HotelItem";
import { IHotel, IRoom } from "../../interfaces/hotels";

const mockRoom: IRoom = {
  id: "sampleRoomId",
  name: "sampleRoomName",
  longDescription: "long description of the room",
  occupancy: {
    maxAdults: 3,
    maxChildren: 3,
    maxOverall: 6,
  },
  shortDescription: "short description of the room",
  images: [
    {
      url: "https://example-image.com/1.jpeg",
    },
    {
      url: "https://example-image.com/2.jpeg",
    },
  ],
};

const mockHotel: IHotel = {
  id: "sampelHotelId",
  name: "sampleHotelName",
  address1: "sampleAddress1",
  address2: "sampleAddress2",
  description: "sampleDescription",
  starRating: 5,
  images: [
    {
      url: "https://example-image.com/1.jpeg",
    },
    {
      url: "https://example-image.com/2.jpeg",
    },
  ],
};

test("render Hotel info & its rooms", () => {
  const data: IHotel = {
    ...mockHotel,
    rooms: [mockRoom],
  };
  render(<HotelItem data={data} />);

  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(screen.getByText(mockRoom.name)).toBeInTheDocument();
  expect(screen.queryByRole("no-room-claim")).not.toBeInTheDocument();
});

test("render a user-friendly message if there is no room", () => {
  const data: IHotel = {
    ...mockHotel,
    rooms: [],
  };
  render(<HotelItem data={data} />);

  expect(screen.getByRole("no-room-claim")).toBeInTheDocument();
});

describe("'Show more' toggle component", () => {
  test("render 'Show more' component if there are more than 3 rooms", () => {
    const data: IHotel = {
      ...mockHotel,
      rooms: Array(5).fill(mockRoom),
    };
    render(<HotelItem data={data} />);
    expect(screen.getByRole("show-more")).toBeInTheDocument();
  });

  test("not render 'Show more' component if there are less than 3 rooms", () => {
    const data: IHotel = {
      ...mockHotel,
      rooms: [mockRoom],
    };
    render(<HotelItem data={data} />);
    expect(screen.queryByRole("show-more")).not.toBeInTheDocument();
  });
});
