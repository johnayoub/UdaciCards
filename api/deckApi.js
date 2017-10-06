import { AsyncStorage } from 'react-native';
import * as errorKeys from '../utils/errorKeys';

const KEY = 'UdaciCards:deck';

export function getDecks(){
    return AsyncStorage.getItem(KEY)
        .then(decks => {
            return decks ? JSON.parse(decks) : {};
        });
}

export function getDeck(deckName) {
    return getDecks()
        .then(decks => decks[deckName]);
}

export function saveDeckTitle(deckName) {
    return getDecks()
        .then(decks => {
           const deck = decks[deckName];

           if (deck) {
               return Promise.reject(errorKeys.DUPLICATE_DECK_NAME);
           }

            decks[deckName] = {
               title: deckName,
               questions: []
           };

           return AsyncStorage.setItem(KEY, JSON.stringify(decks));
        });
}

export function addCardToDeck(deckName, card) {
    return getDecks()
        .then(decks => {
            decks[deckName].questions.push(card);

            return AsyncStorage.setItem(KEY, JSON.stringify(decks));
        });
}