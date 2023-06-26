import { renderHook, act } from "@testing-library/react";
import axios from "axios";

import { IHotel, IRoom } from "../../interfaces/hotels";
import useHotels from "../hotels";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const fiveRatingHotel: IHotel = {
  id: "fiveRatingHotel",
  name: "fiveRatingHotelName",
  address1: "sampleAddress1",
  address2: "sampleAddress2",
  description: "sampleDescription",
  starRating: 5,
  images: [{ url: "https://example-image.com/1.jpeg" }],
};

const twoRatingHotel: IHotel = {
  id: "twoRatingHotel",
  name: "twoRatingHotelName",
  starRating: 2,
  address1: "sampleAddress1",
  address2: "sampleAddress2",
  description: "sampleDescription",
  images: [{ url: "https://example-image.com/1.jpeg" }],
};

const mockHotels: IHotel[] = [fiveRatingHotel, twoRatingHotel];

const mockRooms: IRoom[] = [
  {
    id: "sampleRoomIdOne",
    name: "sampleRoomNameOne",
    longDescription: "long description of the room",
    occupancy: {
      maxAdults: 3,
      maxChildren: 0,
      maxOverall: 3,
    },
    shortDescription: "short description of the room",
    images: [{ url: "https://example-image.com/1.jpeg" }],
  },
  {
    id: "sampleRoomIdTwo",
    name: "sampleRoomNameTwo",
    longDescription: "long description of the room",
    occupancy: {
      maxAdults: 0,
      maxChildren: 1,
      maxOverall: 2,
    },
    shortDescription: "short description of the room",
    images: [{ url: "https://example-image.com/1.jpeg" }],
  },
];

const mockAPIs = () => {
  mockedAxios.get.mockImplementation((url: string) => {
    if (url.includes("hotels")) {
      return Promise.resolve({
        data: mockHotels,
      });
    } else if (url.includes("roomRates")) {
      if (url.includes(mockHotels[0].id))
        return Promise.resolve({
          data: {
            rooms: [mockRooms[0]],
          },
        });
      else
        return Promise.resolve({
          data: {
            rooms: [mockRooms[1]],
          },
        });
    } else {
      return Promise.resolve({ data: [] });
    }
  });
};

test("fetch hotels and their rooms", async () => {
  mockAPIs();
  const { result } = renderHook(useHotels);

  await act(async () => {
    result.current.getHotelsAndRooms("randomCollectionId");
  });

  expect(result.current.errorMessage).toBe("");
  expect(result.current.hotels).toEqual([
    {
      ...fiveRatingHotel,
      rooms: [mockRooms[0]],
    },
    {
      ...twoRatingHotel,
      rooms: [mockRooms[1]],
    },
  ]);
});

test("return error if the fetch request failed", async () => {
  mockedAxios.get.mockRejectedValueOnce({
    message: "unable to load",
  });

  const { result } = renderHook(useHotels);
  await act(async () => {
    result.current.getHotelsAndRooms("randomCollectionId");
  });

  expect(result.current.errorMessage).not.toBe("");
  expect(result.current.hotels).toEqual([]);
});
