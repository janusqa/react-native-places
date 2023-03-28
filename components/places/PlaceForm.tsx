import { StyleSheet, ScrollView, View, Text, TextInput } from 'react-native';
import { useState, useCallback } from 'react';
import produce from 'immer';

import ImagePicker from './ImagePicker';
import { Colors } from '../../constants/colors';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import Place from '../../models/place';

type Props = {
    onCreatePlace: (place: Place) => void;
};

const PlaceForm = ({ onCreatePlace }: Props) => {
    const [title, setTitle] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [pickedLocation, setPickedLocation] = useState<{
        lat: number;
        lng: number;
        address: string;
    }>();

    const changeTitleHandler = (enteredText: string) => {
        setTitle((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = enteredText;
                return draft;
            });
            return nextState;
        });
    };

    const savePlaceHandler = () => {
        if (pickedLocation) {
            const place = new Place(
                title,
                selectedImage,
                pickedLocation.address,
                { lat: pickedLocation.lat, lng: pickedLocation.lng }
            );
            onCreatePlace(place);
        }
    };

    const takeImageHandler = (imageUri: string) => {
        setSelectedImage((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = imageUri;
                return draft;
            });
            return nextState;
        });
    };

    const pickeLocationHandler = useCallback(
        (location: { lat: number; lng: number; address: string }) => {
            setPickedLocation((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    if (!draft) {
                        draft = {
                            lat: location.lat,
                            lng: location.lng,
                            address: location.address,
                        };
                        return draft;
                    }
                    draft.lat = location.lat;
                    draft.lng = location.lng;
                    draft.address = location.address;
                });
                return nextState;
            });
        },
        []
    );

    return (
        <ScrollView style={styles.form}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={changeTitleHandler}
                        value={title}
                    />
                </View>
                <ImagePicker onTakeImage={takeImageHandler} />
                <LocationPicker onPickLocation={pickeLocationHandler} />
                <Button onPress={savePlaceHandler}>Add Place</Button>
            </View>
        </ScrollView>
    );
};

export default PlaceForm;

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});
