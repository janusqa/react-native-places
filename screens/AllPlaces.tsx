import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import produce from 'immer';

import PlacesList from '../components/places/PlacesList';
import type Place from '../models/place';
import { getPlaces } from '../helper/database';

const AllPlaces = () => {
    const isFocused = useIsFocused();
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(
        function () {
            const fetchPlaces = async () => {
                const places = await getPlaces();
                setPlaces((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = places;
                        return draft;
                    });
                    return nextState;
                });
            };

            if (isFocused) {
                void fetchPlaces();
            }
        },
        [isFocused]
    );
    return <PlacesList places={places} />;
};

export default AllPlaces;
