import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import produce from 'immer';

import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';
import { type PlaceNativeStackScreenProps } from '../types/navigation';
import { getPlace } from '../helper/database';
import type Place from '../models/place';

const PlaceDetails = ({
    navigation,
    route,
}: PlaceNativeStackScreenProps<'PlaceDetails'>) => {
    const placeId = route.params.placeId;

    const [place, setPlace] = useState<Place>();

    useEffect(
        function () {
            let ignore = false;
            const fetchPlace = async () => {
                const place = await getPlace(placeId);

                if (!ignore) {
                    navigation.setOptions({
                        title: place.title,
                    });
                    setPlace((prevState) => {
                        const nextState = produce(prevState, (draft) => {
                            draft = place;
                            return draft;
                        });
                        return nextState;
                    });
                }
            };

            void fetchPlace();

            return () => {
                ignore = true;
            };
        },
        [placeId, navigation]
    );

    const showOnMapHandler = () => {
        if (place?.location.lat && place?.location.lng) {
            navigation.navigate('Map', {
                location: { lat: place.location.lat, lng: place.location.lng },
            });
        }
    };

    if (!place) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image source={{ uri: place?.imageUri }} style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place?.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    );
};

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
