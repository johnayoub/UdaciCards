import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Platform } from 'react-native';
import { saveDeckTitle } from '../api/deckApi';
import * as errorKeys from '../utils/errorKeys';
import { NavigationActions } from 'react-navigation';
import * as colors from "../utils/colors";

export default class AddDeckView extends Component {
    state = {
        deckName: ''
    };

    handleOnSubmit = () => {
        saveDeckTitle(this.state.deckName)
            .then(() => {
                const resetAction = NavigationActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home'}),
                        NavigationActions.navigate({
                            routeName: 'Deck',
                            params: { deckTitle: this.state.deckName
                        }})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch(errorMessage => {
               if (errorMessage === errorKeys.DUPLICATE_DECK_NAME) {
                   alert('Duplicate deck name!');
               }
            });
    };

    handleOnChange = text => {
        this.setState({ deckName: text });
    };

    render() {
        const canSubmit = !!this.state.deckName;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>What is the title of your new deck?</Text>
                <TextInput style={styles.input}
                           placeholder='Deck Title'
                           value={this.state.deckName}
                           onChangeText={this.handleOnChange}
                           onSubmitEditing={this.handleOnSubmit}/>
                <View style={styles.submitContainer}>
                    <Button disabled={!canSubmit}
                            title='Submit'
                            style={styles.submit}
                            onPress={this.handleOnSubmit}>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15
    },
    input: {
        height: 40,
        padding: 10,
        borderColor: colors.red,
        borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
        margin: 20
    },
    submitContainer: {
      flex: 1,
      alignItems: 'center'
    },
    submit: {
        textAlign: 'center',
        padding: 10
    }
});