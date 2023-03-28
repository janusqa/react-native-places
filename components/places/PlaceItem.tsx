import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import type Place from '../../models/place';
import { Colors } from '../../constants/colors';

type Props = {
    place: Place;
    onSelect: () => void;
};

const PlaceItem = ({ place, onSelect }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.item,
                pressed ? styles.pressed : null,
            ]}
            onPress={onSelect}
        >
            <Image style={styles.image} source={{ uri: place.imageUri }} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    );
};
export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevatoin: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.9,
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100,
    },
    info: {
        flex: 2,
        padding: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700,
    },
    address: {
        fontSize: 12,
        color: Colors.gray700,
    },
});
