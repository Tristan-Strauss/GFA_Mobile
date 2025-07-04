import { View, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: "Oops! Not Found"}} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    Go back to the home page.
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
    }
})