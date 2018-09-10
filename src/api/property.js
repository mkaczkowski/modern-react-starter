//@flow
import type { Property } from '../model/Property';

const DEFAULT_DATA: Property[] = [
  {
    owner: 'carlos',
    address: {
      line1: 'Flat 5',
      line4: '7 Westbourne Terrace',
      postCode: 'W2 3UL',
      city: 'London',
      country: 'U.K.',
    },
    airbnbId: 3512500,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    incomeGenerated: 2000.34,
    location: [51.5073835, -0.1279801],
  },
  {
    owner: 'ankur',
    address: {
      line1: '4',
      line2: 'Tower Mansions',
      line3: 'Off Station road',
      line4: '86-87 Grange Road',
      postCode: 'SE1 3BW',
      city: 'London',
      country: 'U.K.',
    },
    airbnbId: 1334159,
    numberOfBedrooms: 3,
    numberOfBathrooms: 1,
    incomeGenerated: 10000,
    location: [51.413213, -0.1219801],
  },
  {
    owner: 'elaine',
    address: {
      line1: '4',
      line2: '332b',
      line4: 'Goswell Road',
      postCode: 'EC1V 7LQ',
      city: 'London',
      country: 'U.K.',
    },
    airbnbId: 12220057,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    incomeGenerated: 1200,
    location: [51.5033835, -0.1279991],
  },
];
/**
 * Fetch all properties with optional coordinates search query
 * @param property object
 * @returns {Promise<*|void>}
 */
export type GetPropertiesAPI = {
  latitude?: string,
  longitude?: string,
};

export async function getProperties({ latitude, longitude }: GetPropertiesAPI = {}): Object {
  const url = process.env.API_URL;

  const query: any = {
    latitude,
    longitude,
  };

  const options = {
    method: 'GET',
  };

  if (latitude) {
    return [DEFAULT_DATA[0]];
  } else {
    return DEFAULT_DATA;
  }

  // return fetch(getUrlWithParams(url, query), options);
}

/**
 * Update existing property
 * @param property object
 * @returns {Promise<*|void>}
 */
export type UpdatePropertyAPI = {
  property: Property,
};

export async function updateProperty({ property }: UpdatePropertyAPI): Object {
  const url = `${process.env.API_URL}/${property.airbnbId}`;

  const options = {
    method: 'POST',
    body: JSON.stringify(property),
  };

  return { ...property, owner: 'dsadasdas' };

  // return fetch(url, options);
}
