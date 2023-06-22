export interface IHotel {
  id: string;
  name: string;
  description: string;
  address1: string;
  address2: string;
  images: Array<{
    url: string;
  }>;
  starRating: number;
}

export interface IHotelList extends Array<IHotel> {}
