import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDeck } from '../api/deckApi';
import * as colors from '../utils/colors';

export default class DeckView extends Component {

    state = {
        deck: null
    };

    componentDidMount () {
        const { params } = this.props.navigation.state;
        const { deckTitle } = params;

        getDeck(deckTitle)
            .then(deck => {
                this.setState({ deck });
            })
    };

    handleOnNavigateToAddCardView = () => {
        this.props.navigation.navigate('AddCard', { deckTitle: this.state.deck.title });
    };

    handleOnNavigateToQuizView = () => {
        this.props.navigation.navigate('Quiz', { deckTitle: this.state.deck.title });
    };

    render() {
        const { deck } = this.state;

        if (!deck) {
            return <View></View>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.deckTextContainer}>
                    <Text style={styles.deckCardName}>{deck.title}</Text>
                    <Text style={styles.deckCardCount}>{deck.questions.length} card(s)</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.actionButton]}
                                      onPress={this.handleOnNavigateToAddCardView}>
                        <Text style={[styles.actionButtonText, styles.addCardText]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.startQuizButton]}
                                      onPress={this.handleOnNavigateToQuizView}>
                        <Text style={[styles.actionButtonText, styles.startQuizText]}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    deckTextContainer: {
      flex: 0,
      alignItems: 'center'
    },
    deckCardName: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 40
    },
    deckCardCount: {
        color: colors.black,
        fontSize: 20,
        marginTop: 10
    },
    buttonsContainer: {
        flex: 0,
        padding: 20
    },
    actionButton: {
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.black
    },
    startQuizButton: {
        backgroundColor: colors.black
    },
    actionButtonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    addCardText: {
        color: colors.black
    },
    startQuizText: {
        color: colors.white
    }
});