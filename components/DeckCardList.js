import React, { Component } from 'react';
import DeckCard from './DeckCard';
import { View, StyleSheet, ScrollView } from 'react-native';

export default class DeckCardList extends Component{
    render() {
        const { decks } = this.props;

        return (
            <ScrollView >
                <View style={styles.container}>
                    {decks.map(deck => (
                        <DeckCard key={deck.title} deck={deck} onClick={this.props.onClick}/>
                    ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }
});
