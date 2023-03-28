import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';

class Place {
    #id: string;
    #title: string;
    #imageUri: string;
    #address: string;
    #location: { lat: number; lng: number };

    constructor(
        title: string,
        imageUri: string,
        address: string,
        location: { lat: number; lng: number }
    ) {
        this.#id = nanoid();
        this.#title = title;
        this.#imageUri = imageUri;
        this.#address = address;
        this.#location = location;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get imageUri() {
        return this.#imageUri;
    }

    get address() {
        return this.#address;
    }

    get location() {
        return this.#location;
    }
}

export default Place;
