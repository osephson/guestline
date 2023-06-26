import { render, screen } from "@testing-library/react";

import Room from "../Room";
import { IRoom } from "../../interfaces/hotels";

const mock: IRoom = {
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

test("render Room info", () => {
  render(<Room data={mock} />);

  expect(screen.getByText(mock.name)).toBeInTheDocument();
  expect(screen.getByText(mock.longDescription)).toBeInTheDocument();
  expect(
    screen.getByText("Adults: " + mock.occupancy.maxAdults)
  ).toBeInTheDocument();
  expect(
    screen.getByText("Children: " + mock.occupancy.maxChildren)
  ).toBeInTheDocument();
});
