import { StyleSheet, FlatList, View, Text } from 'react-native';

import type Place from '../../models/place';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';

type Props = {
    places: Place[];
};

const PlacesList = ({ places }: Props) => {
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
            keyExtractor={(place) => place.id}
            renderItem={({ item }) => (
                <PlaceItem place={item} onSelect={() => null} />
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
