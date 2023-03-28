import { GOOGLE_MAP_API_KEY } from '@env';

type GeoCodeFeaturePlaceType =
    | 'country'
    | 'region'
    | 'postcode'
    | 'district'
    | 'place'
    | 'locality'
    | 'neighborhood'
    | 'address'
    | 'poi';

type GeoCodeProperties = {
    accuracy?: string;
    address?: string;
    category?: string;
    maki?: string;
    wikidata?: string;
    short_code?: string;
    landmark: boolean;
    tel: string;
};

type GeoCode = {
    id: string;
    type: string;
    place_type: GeoCodeFeaturePlaceType[];
    relevence: number;
    address?: string;
    properties: GeoCodeProperties;
    text: string;
    place_name: string;
    matching_text?: string;
    matching_place_name?: string;
    language?: string;
    bbox: number[];
    center: number[];
    geometry: {
        coordinates: number[];
        type: string;
        interpolated?: boolean;
        omitted?: boolean;
    };
    context: { [key: string]: string }[];
    routabable_points?: { points: { coordinates: number[] } | null };
};

type GeocodeResponse = {
    type: string;
    query: number[];
    features: GeoCode[];
    attribution: string;
};

export const getMapPreview = (lat: number, lng: number) => {
    const imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ef2929(${lng},${lat})/${lng},${lat},16,0,48/500x500?access_token=${GOOGLE_MAP_API_KEY}`;
    return imagePreviewUrl;
};

export const getAddress = async (lat: number, lng: number) => {
    const geocodeApi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${GOOGLE_MAP_API_KEY}`;
    const response = await fetch(geocodeApi, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Could not retrieve address');
    }

    const data = (await response.json()) as GeocodeResponse;

    return data.features[0].place_name;
};
