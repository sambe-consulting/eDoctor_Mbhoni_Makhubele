export class Address {
  id: number = 0;
  country: string = '';
  street_address: string = '';
  suburb: string = '';
  city: string = '';
  postal_code: string = '';

  constructor(
    id: number,
    country: string,
    street_address: string,
    suburb: string,
    city: string,
    postal_code: string
  ) {
    this.id = id;
    this.country = country;
    this.street_address = street_address;
    this.suburb = suburb;
    this.city = city;
    this.postal_code = postal_code;
  }
}
