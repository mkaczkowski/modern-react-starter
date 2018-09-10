export type Property = {
  owner: string,
  address: {
    line1: string,
    line2: string,
    line4: string,
    postCode: string,
    city: string,
    country: string,
  },
  airbnbId: number,
  numberOfBedrooms: number,
  numberOfBathrooms: number,
  incomeGenerated: number,
  location: number[],
};
