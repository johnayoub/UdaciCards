import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, Platform } from 'react-native';
import { addCardToDeck } from '../api/deckApi';
import { NavigationActions } from 'react-navigation';
import * as colors from "../utils/colors";

export default class AddCardView extends Component {
    state = {
        question: '',
        answer: ''
    };

    handleOnSubmit = () => {
        const { params } = this.props.navigation.state;
        const { deckTitle } = params;

        const card = {
            question: this.state.question,
            answer: this.state.answer
        };

        addCardToDeck(deckTitle, card).then(() => {
            const resetAction = NavigationActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home'}),
                    NavigationActions.navigate({ routeName: 'Deck', params: { deckTitle }})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        });
    };

    render() {
        const canSubmit = this.state.question && this.state.answer;

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           value={this.state.question}
                           placeholder='Question'
                           onChangeText={(text) => this.setState({question: text})}
                           onSubmitEditing={this.handleOnSubmit}/>
                <TextInput style={styles.input}
                           value={this.state.answer}
                           placeholder='Answer'
                           onChangeText={(text) => this.setState({answer: text})}
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
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        padding: 10,
        borderColor: colors.red,
        margin: 20,
        borderBottomWidth: Platform.OS === 'ios' ? 2 : 0
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