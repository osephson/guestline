import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import axios from "axios";

import HotelList from "../HotelList";
import { IHotel, IRoom } from "../../interfaces/hotels";

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
  mockedAxios.get.mockImplementation((url) => {
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

test("render Hotel List", async () => {
  mockAPIs();
  render(<HotelList />);
  await waitFor(() => {
    // expect(axios.get).toHaveBeenCalledTimes(3);

    // Expect all hotel names are displayed
    mockHotels.forEach((h) => {
      expect(screen.getByText(h.name)).toBeInTheDocument();
    });

    // Expect all room names are displayed
    mockRooms.forEach((r) => {
      expect(screen.getByText(r.name)).toBeInTheDocument();
    });
  });
});

test("display error message if unable to fetch hotels", async () => {
  mockedAxios.get.mockRejectedValueOnce({
    message: "unable to load",
  });
  render(<HotelList />);

  await waitFor(() => {
    expect(screen.getByRole("error-alert")).toBeInTheDocument();
  });
});

describe("filter Hotel list", () => {
  beforeEach(() => {
    mockAPIs();
  });

  test("filter by Rating", async () => {
    render(<HotelList />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(3);
    });

    fireEvent.click(screen.getByText("5 Stars"));

    expect(screen.getByText(fiveRatingHotel.name)).toBeInTheDocument();
    expect(screen.queryByText(twoRatingHotel.name)).not.toBeInTheDocument();
  });

  test("filter by number of max adults", async () => {
    render(<HotelList />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(3);
    });

    // Click the "up" button of maxAdults' UpDown controller
    fireEvent.click(screen.queryAllByRole("up")[0]);

    expect(screen.getByText(mockRooms[0].name)).toBeInTheDocument();
    expect(screen.queryByText(mockRooms[1].name)).not.toBeInTheDocument();
  });

  test("filter by number of max children", async () => {
    render(<HotelList />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(3);
    });

    // Click the "up" button of maxAdults' UpDown controller
    fireEvent.click(screen.queryAllByRole("up")[1]);

    expect(screen.getByText(mockRooms[1].name)).toBeInTheDocument();
    expect(screen.queryByText(mockRooms[0].name)).not.toBeInTheDocument();
  });
});
