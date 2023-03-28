import { StyleSheet, View, Alert, Image, Text } from 'react-native';
import { useState } from 'react';
import produce from 'immer';
import {
    launchCameraAsync,
    MediaTypeOptions,
    useCameraPermissions,
    PermissionStatus,
} from 'expo-image-picker';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

type Props = {
    onTakeImage: (imageUri: string) => void;
};

const ImagePicker = ({ onTakeImage }: Props) => {
    const [imageUri, setImageUri] = useState<string>('');
    const [cameraPermission, requestPermission] = useCameraPermissions();

    const verifyPermission = async () => {
        if (
            cameraPermission &&
            cameraPermission.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (
            cameraPermission &&
            cameraPermission.status === PermissionStatus.DENIED
        ) {
            Alert.alert(
                'Insufficient permission!',
                'You need to grant camera access to use this app'
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();

        if (hasPermission) {
            try {
                const image = await launchCameraAsync({
                    mediaTypes: MediaTypeOptions.Images,
                    allowsEditing: true,
                    base64: true,
                    aspect: [16, 9],
                    quality: 0.5,
                });
                if (!image.canceled) {
                    setImageUri((prevestate) => {
                        const nextState = produce(prevestate, (draft) => {
                            draft = image.assets[0].uri;
                            return draft;
                        });
                        return nextState;
                    });
                    onTakeImage(image.assets[0].uri);
                }
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong';
                Alert.alert('Camera Error', message);
            }
        }
    };

    const imagePreview = imageUri ? (
        <Image style={styles.image} source={{ uri: imageUri }} />
    ) : (
        <Text>No image</Text>
    );

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>
                Take Image
            </OutlinedButton>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
