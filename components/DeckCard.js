import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as colors from '../utils/colors';

export default class DeckCard extends Component {
    render() {
        const { deck } = this.props;

        return (
            <TouchableOpacity onPress={() => this.props.onClick(deck)}>
                <View style={styles.deckCard}>
                    <Text style={styles.deckCardName}>{deck.title}</Text>
                    <Text style={styles.deckCardCount}>
                        {deck.questions.length} card(s)
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    deckCard: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.125)',
        borderWidth: 2
    },
    deckCardName: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 20
    },
    deckCardCount: {
        color: colors.black,
        fontSize: 14,
        marginTop: 10
    }
});