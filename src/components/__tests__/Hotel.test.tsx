import { render, screen } from "@testing-library/react";

import Hotel from "../Hotel";
import { IHotel } from "../../interfaces/hotels";

const mock: IHotel = {
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

test("render Hotel info", () => {
  render(<Hotel data={mock} />);

  expect(screen.getByText(mock.name)).toBeInTheDocument();
  expect(screen.getByText(mock.address1)).toBeInTheDocument();
  expect(screen.getByText(mock.address2)).toBeInTheDocument();
  expect(screen.getAllByTestId("StarIcon")).toHaveLength(mock.starRating);
});
