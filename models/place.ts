class Place {
    #id: string | number | null;
    #title: string;
    #imageUri: string;
    #address: string;
    #location: { lat: number; lng: number };

    constructor(
        id: string | number | null,
        title: string,
        imageUri: string,
        address: string,
        location: { lat: number; lng: number }
    ) {
        this.#id = id;
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
