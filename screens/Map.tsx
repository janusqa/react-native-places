import { StyleSheet, Alert } from 'react-native';
import MapView, { type MapPressEvent, Marker } from 'react-native-maps';
import { useState, useLayoutEffect, useCallback } from 'react';
import produce from 'immer';

import { type PlaceNativeStackScreenProps } from '../types/navigation';
import IconButton from '../components/ui/IconButton';

const Map = ({ route, navigation }: PlaceNativeStackScreenProps<'Map'>) => {
    const [pinnedLocation, setPinnedLocation] = useState<{
        lat: number;
        lng: number;
    }>();

    const region = {
        latitude: route.params.location.lat,
        longitude: route.params.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = (event: MapPressEvent) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setPinnedLocation((prevState) => {
            const nextState = produce(prevState, (draft) => {
                if (!draft) {
                    draft = { lat, lng };
                    return draft;
                }
                draft.lat = lat;
                draft.lng = lng;
            });
            return nextState;
        });
    };

    const savePinnedLocation = useCallback(() => {
        if (!(pinnedLocation?.lat && pinnedLocation?.lng)) {
            Alert.alert(
                'Select a location!',
                'You need to select a by tapping on the map'
            );
            return;
        }
        navigation.navigate('AddPlace', {
            location: { lat: pinnedLocation.lat, lng: pinnedLocation.lng },
        });
    }, [navigation, pinnedLocation?.lat, pinnedLocation?.lng]);

    useLayoutEffect(
        function () {
            navigation.setOptions({
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="save"
                        size={24}
                        color={tintColor}
                        onPress={savePinnedLocation}
                    />
                ),
            });
        },
        [navigation, savePinnedLocation]
    );

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            {pinnedLocation && (
                <Marker
                    title="Picked Location"
                    coordinate={{
                        latitude: pinnedLocation.lat,
                        longitude: pinnedLocation.lng,
                    }}
                />
            )}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});
