import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import produce from 'immer';

import PlacesList from '../components/places/PlacesList';
import { type PlaceNativeStackScreenProps } from '../types/navigation';
import type Place from '../models/place';

const AllPlaces = ({ route }: PlaceNativeStackScreenProps<'AllPlaces'>) => {
    const isFocused = useIsFocused();
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(
        function () {
            if (isFocused && route.params?.place) {
                setPlaces((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft.push(route.params.place);
                    });
                    return nextState;
                });
            }
        },
        [isFocused, route.params?.place]
    );
    return <PlacesList places={places} />;
};

export default AllPlaces;
