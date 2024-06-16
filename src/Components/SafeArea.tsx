import { SafeAreaView, StyleSheet } from "react-native"
import { SafeareaType } from "../@types/GlobalTypes";



const SafeArea = ({children , style}:SafeareaType) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
})
export default SafeArea