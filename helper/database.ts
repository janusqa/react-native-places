import * as SQLite from 'expo-sqlite';
import Place from '../models/place';

const database = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise<void>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
                )`,
                [],
                () => resolve(),
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });

    return promise;
};

export const addPlace = (place: Place) => {
    const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                [
                    place.title,
                    place.imageUri,
                    place.address,
                    place.location.lat,
                    place.location.lng,
                ],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });

    return promise;
};

export const getPlaces = () => {
    const promise = new Promise<Place[]>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    const places = result.rows._array.map(
                        (row: {
                            id: number;
                            title: string;
                            imageUri: string;
                            address: string;
                            lat: number;
                            lng: number;
                        }) =>
                            new Place(
                                row.id,
                                row.title,
                                row.imageUri,
                                row.address,
                                {
                                    lat: row.lat,
                                    lng: row.lng,
                                }
                            )
                    );
                    resolve(places);
                },
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });

    return promise;
};

export const getPlace = (placeId: number) => {
    const promise = new Promise<Place>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ?`,
                [placeId],
                (_, result) => {
                    const placeData = result.rows._array[0] as {
                        id: number;
                        title: string;
                        imageUri: string;
                        address: string;
                        lat: number;
                        lng: number;
                    };
                    const place = new Place(
                        placeData.id,
                        placeData.title,
                        placeData.imageUri,
                        placeData.address,
                        { lat: placeData.lat, lng: placeData.lng }
                    );
                    resolve(place);
                },
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });

    return promise;
};
