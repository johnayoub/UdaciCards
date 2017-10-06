import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import DeckCardList from './DeckCardList';
import { getDecks } from "../api/deckApi";
import * as colors from '../utils/colors';
import { Entypo } from '@expo/vector-icons';

export default class HomeView extends Component {
    state = {
        decks: []
    };

    componentDidMount() {
        getDecks()
            .then(decks => {
                var decksList = Object.keys(decks).reduce((list, deck) => {
                    list.push(decks[deck]);

                    return list;
                }, []);

                decksList.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });

                this.setState(() => ({
                    decks: decksList
                }));
            });
    };

    navigateToDeckView = (deck) => {
        this.props.navigation.navigate('Deck', { deckTitle: deck.title });
    };

    navigateToAddDeckView = () => {
        this.props.navigation.navigate('AddDeck');
    };

    render() {
        const { decks } = this.state;

        return (
            <View style={styles.container}>
                <DeckCardList decks={decks} onClick={this.navigateToDeckView}/>
                <TouchableOpacity style={styles.createButton}
                                  onPress={this.navigateToAddDeckView}>
                    <Entypo
                        name={'plus'}
                        size={30}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    createButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        width: 60,
        height: 60,
        padding: 10,
        borderRadius: 30,
        alignSelf: 'flex-end',
        margin: 15
    }
});