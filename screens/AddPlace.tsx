import PlaceForm from '../components/places/PlaceForm';
import { type PlaceNativeStackScreenProps } from '../types/navigation';
import type Place from '../models/place';
import { addPlace } from '../helper/database';

const AddPlace = ({ navigation }: PlaceNativeStackScreenProps<'AddPlace'>) => {
    const createPlaceHandler = async (place: Place) => {
        await addPlace(place);
        navigation.navigate('AllPlaces');
    };

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
