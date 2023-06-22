export interface Hotel {
  id: String;
  name: String;
  description: String;
  address1: String;
  address2: String;
  images: Array<String>;
  starRating: Number;
}

export type HotelList = Array<Hotel>;
