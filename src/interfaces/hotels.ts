export interface IHotel {
  id: String;
  name: String;
  description: String;
  address1: String;
  address2: String;
  images: Array<String>;
  starRating: Number;
}

export interface IHotelList extends Array<IHotel> {}
