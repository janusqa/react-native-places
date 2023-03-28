import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    size: number;
    color?: string;
    onPress: () => void;
};

const IconButton = ({ icon, size, color, onPress }: Props) => {
    return (
        <Pressable
            style={(pressed) => [
                styles.button,
                pressed ? styles.pressed : null,
            ]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={size}
                color={color ? color : '#f1f1f1'}
            />
        </Pressable>
    );
};
export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: { opacity: 0.7 },
});
