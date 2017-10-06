import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Constants } from 'expo'
import * as colors from '../utils/colors';

export default function AppStatusBar() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={styles.container.backgroundColor}
                       barStyle="light-content"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        height: Constants.statusBarHeight
    }
});