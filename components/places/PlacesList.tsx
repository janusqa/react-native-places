import { StyleSheet, FlatList, View, Text } from 'react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
import { useNavigation } from '@react-navigation/native';

import type Place from '../../models/place';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { type PlaceNativeStackScreenProps } from '../../types/navigation';

type Props = {
    places: Place[];
};

const PlacesList = ({ places }: Props) => {
    const navigation =
        useNavigation<PlaceNativeStackScreenProps<'AllPlaces'>['navigation']>();

    const onSelectPlaceHandler = (placeId: number) => {
        navigation.navigate('PlaceDetails', { placeId });
    };

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet</Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(place) => place.id?.toString() ?? nanoid()}
            renderItem={({ item }) => (
                <PlaceItem place={item} onSelect={onSelectPlaceHandler} />
            )}
        />
    );
};

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
});
