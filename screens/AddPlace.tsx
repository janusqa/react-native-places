import PlaceForm from '../components/places/PlaceForm';

import { type PlaceNativeStackScreenProps } from '../types/navigation';
import type Place from '../models/place';

const AddPlace = ({ navigation }: PlaceNativeStackScreenProps<'AddPlace'>) => {
    const createPlaceHandler = (place: Place) => {
        navigation.navigate('AllPlaces', { place });
    };

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
